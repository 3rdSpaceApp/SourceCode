import numpy as np
from backend.matchmaking_engine.models.user_profile import UserProfile


class ProfileScorer:
    def __init__(self, model, weights:dict):
        self.model = model
        self.weights = weights

    
    def compute_vector(self, profile: UserProfile):
        """
        Compute the vector for a given profile."""

        # placeholder 
        return self.model.embed(profile)
    

    def similarity(sself, vec1, vec2):

        return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

