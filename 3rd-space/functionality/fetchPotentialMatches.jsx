import { supabase } from '../lib/supabase'; // adjust this to your client path

const fetchPotentialMatches = async () => {
  const user = supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase.rpc('filter_potential_matches', {
    user_id: user.data.user.id,
    radius_meters: 5000 // optional, defaults to 5000 in function
  });

  if (error) {
    console.error('Error fetching potential matches:', error);
  } else {
    console.log('Matches:', data);
    return data;
  }
};