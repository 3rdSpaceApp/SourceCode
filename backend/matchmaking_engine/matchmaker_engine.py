from backend.matchmaking_engine.scoring.profile_scorer import ProfileScorer
from backend.matchmaking_engine.match_pool.match_pool_manager import MatchPoolManager
from backend.matchmaking_engine.match_pool.waitlist_pool_manager import WaitListManager
from backend.matchmaking_engine.lifecycle.match_lifecylce import MatchLifecycleManager
from backend.matchmaking_engine.models.aggression_strategy import AggressionStrategy

class MatchMakerEngine:
    def __init__(self, db, model):
        self.db = db
        self.scorer = ProfileScorer(model, weights={
            "intentions": .25,
            "lifestyle": .2,
            "interests" : .2,
            "career" : 0.15,
            "personality": .2
        })
        self.pool = MatchPoolManager(db)
        self.waitlist = WaitListManager(db)
        self.lifecycle = MatchLifecycleManager(db)

    def generate_matches(self, user_id):
        """ 
        Generate matches for a given  user
        """
        if not self.pool.is_elligible(user_id):
            return []
        
        user_profile = self.db.fetch_profile(user_id)
        user_vector = self.scorer.compute_vector(user_profile)

        candidates = self.db.fetch_other_profiles(user_id)
        scored = [(c.id, self.scorer.similarity(user_vector, self.scorer.computer_vector(c))) for c in candidates]
        scored.sort(key = lambda x: x[1], reverse = True)

        aggression_level = self.db.get_aggression(user_id)
        strategy = AggressionStrategy(aggression_level)
        return strategy.select_matches(scored)



    
