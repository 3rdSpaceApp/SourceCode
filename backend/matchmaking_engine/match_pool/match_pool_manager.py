class MatchPoolManager:

    def __init__(self, db):
        self.db = db

    def is_elligible(self, user_id):

        return self.db.active_match_count(user_id) < 3
