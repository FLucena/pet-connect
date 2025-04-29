import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const { address, latlng } = event.queryStringParameters;
  
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Google Maps API key not configured' })
    };
  }

  try {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    if (address) {
      url += `address=${encodeURIComponent(address)}`;
    } else if (latlng) {
      url += `latlng=${encodeURIComponent(latlng)}`;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Either address or latlng must be provided' })
      };
    }
    
    url += `&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in geocoding request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error processing geocoding request' })
    };
  }
};

export { handler }; 