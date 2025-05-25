class WaitListManager:

    def __init__(self, db):
        self.db = db

    def add_to_waitlist(self, seeker_id, target_id,score):

        """
        Add a user to the waitlist for a specific target.
        """
        self.db.insert_waitlist(seeker_id, target_id, score)

    def promote_next(self, user_id):
        """
        Promote the next user in the waitlist for a specific target.
        """
        next_user = self.db.get_top_waitlist_candidate(user_id)
        return next_user
    
    