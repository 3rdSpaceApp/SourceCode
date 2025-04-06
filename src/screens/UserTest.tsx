import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { supabase } from '../utils/supabaseClient.js';
import React from 'react';

export default function UserTest() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) console.error(error);
      else setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 Mock Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.userItem}>{item.full_name} (@{item.username})</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  userItem: { fontSize: 16, marginBottom: 10 },
});