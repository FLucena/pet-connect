export const searchPlaces = async (query: string) => {
  try {
    const response = await fetch(`/.netlify/functions/google-maps?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
}; 