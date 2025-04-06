-- Mock Users
INSERT INTO users (email, full_name, username, bio, avatar_url) VALUES
('jordan@example.com', 'Jordan Akande', 'jordan', 'Loves deep convos and great coffee.', 'https://randomuser.me/api/portraits/men/32.jpg'),
('taylor@example.com', 'Taylor Nwosu', 'taylor', 'Museums, music, and meaningful vibes.', 'https://randomuser.me/api/portraits/women/47.jpg'),
('alex@example.com', 'Alex Obi', 'alex', 'Just here to find someone who laughs at my jokes.', 'https://randomuser.me/api/portraits/men/88.jpg');

-- Mock Match
INSERT INTO matches (user_one, user_two, match_status, date_count)
SELECT u1.id, u2.id, 'active', 1
FROM users u1, users u2
WHERE u1.username = 'jordan' AND u2.username = 'taylor';

-- Mock Messages
INSERT INTO messages (match_id, sender_id, message_text, sent_at)
SELECT m.id, u.id, 'Hey Taylor! You free this weekend?', now()
FROM matches m, users u
WHERE m.user_one = u.id AND u.username = 'jordan';

INSERT INTO messages (match_id, sender_id, message_text, sent_at)
SELECT m.id, u.id, 'Hey Jordan! Yeah, Saturday works 🙌', now()
FROM matches m, users u
WHERE m.user_two = u.id AND u.username = 'taylor';

-- Mock Feedback
INSERT INTO date_feedback (match_id, submitted_by, reflection)
SELECT m.id, u.id, 'Great convo, might be something here...', now()
FROM matches m, users u
WHERE m.user_one = u.id AND u.username = 'jordan';