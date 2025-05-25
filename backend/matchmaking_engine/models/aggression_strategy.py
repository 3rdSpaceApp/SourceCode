import random


class AggressionStrategy:
    def __init__(self, level: str):
        self.level = level

    def select_matches(self, scored_matches):
        """
        Select matches based on aggression level.
        """
        if self.level == "low":
            return scored_matches[:3]
        elif self.level == "mixed":
            return [scored_matches[0]]+ random.sample(scored_matches[1:10], 2)
        elif self.level == "wildcard":
            return random.sample(scored_matches, 3)

