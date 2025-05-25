# -*- coding: utf-8 -*-


# Handles match decay, unmatching, and greying out logic.


class MatchLifecycleManager:

    def __init__(self, db):
        self.db = db

    def expire_inactive_matches(self):
        self.db.remove_inactive_matches()

    def unmatch_users(self, user_id_1, user_id_2):
        self.db.remove_match(user_id_1, user_id_2)
        #return self.db.promote_waitlist(user_id0)

        
    