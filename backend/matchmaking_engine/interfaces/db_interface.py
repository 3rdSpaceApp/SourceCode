import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseInterface:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=os.getenv("PG_DB"),
            user=os.getenv("PG_USER"),
            password=os.getenv("PG_PASSWORD"),
            host=os.getenv("PG_HOST")
        )
        self.conn.autocommit = True
        self.cur = self.conn.cursor()

    def fetch_profile(self, user_id):
        self.cur.execute("SELECT * FROM profiles WHERE id = %s", (user_id,))
        return self.cur.fetchone()

    def fetch_other_profiles(self, exclude_user_id):
        self.cur.execute("SELECT * FROM profiles WHERE id != %s", (exclude_user_id,))
        return self.cur.fetchall()

    def active_match_count(self, user_id):
        self.cur.execute("SELECT COUNT(*) FROM matches WHERE (user_a = %s OR user_b = %s) AND status = 'active'", (user_id, user_id))
        return self.cur.fetchone()[0]

    def insert_waitlist(self, seeker_id, target_id, score):
        self.cur.execute("""
            INSERT INTO waitlist (seeker_id, target_id, score, created_at)
            VALUES (%s, %s, %s, NOW())
        """, (seeker_id, target_id, score))

    def get_top_waitlist_candidate(self, target_id):
        self.cur.execute("""
            SELECT seeker_id FROM waitlist
            WHERE target_id = %s
            ORDER BY score DESC, created_at ASC
            LIMIT 1
        """, (target_id,))
        return self.cur.fetchone()

    def get_aggression(self, user_id):
        self.cur.execute("SELECT match_aggression FROM preferences WHERE user_id = %s", (user_id,))
        result = self.cur.fetchone()
        return result[0] if result else "mixed"

    def remove_inactive_matches(self, days_threshold=7):
        self.cur.execute("""
            DELETE FROM matches
            WHERE status = 'active'
              AND NOW() - last_active > INTERVAL '%s days'
        """, (days_threshold,))

    def remove_match(self, user_id, match_id):
        self.cur.execute("""
            DELETE FROM matches
            WHERE (user_a = %s AND user_b = %s) OR (user_a = %s AND user_b = %s)
        """, (user_id, match_id, match_id, user_id))

    def promote_waitlist(self, user_id):
        candidate = self.get_top_waitlist_candidate(user_id)
        if candidate:
            self.cur.execute("""
                DELETE FROM waitlist
                WHERE seeker_id = %s AND target_id = %s
            """, (candidate[0], user_id))
            return candidate[0]
        return None

    def close(self):
        self.cur.close()
        self.conn.close()