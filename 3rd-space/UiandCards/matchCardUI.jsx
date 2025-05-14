import { View, Text, Image, StyleSheet } from 'react-native';

const MatchCard = ({ match }) => {
  const fadedStyle = {
    opacity: 1 - match.fade_progress,
  };

  return (
    <View style={[styles.card, fadedStyle]}>
      <Image source={{ uri: match.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{match.full_name}</Text>
      <Text style={styles.bio}>{match.bio}</Text>
      <Text style={styles.fade}>
        Fade Progress: {(match.fade_progress * 100).toFixed(0)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
  },
  bio: {
    marginTop: 4,
    color: '#555',
  },
  fade: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default MatchCard;