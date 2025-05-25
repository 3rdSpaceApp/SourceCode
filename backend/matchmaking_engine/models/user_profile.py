

class UserProfile:
    def __init__(self, data: dict):
        self.id = data.get("id")
        self.interests = data.get("interests", [])
        self.lifestyle = data.get("lifestyle", [])
        self.intentions = data.get("dating_intentions", [])
        self.values = data.get("values", [])
        self.vices = data.get("vices", [])
        self.personality = data.get("personality", [])
        self.embedding = data.get("embedding", [])


    