// netlify-build.js
// This script verifies if required environment variables are present before build
import dotenv from 'dotenv';
dotenv.config();

const missingVars = [];
const requiredVars = [
  'GOOGLE_MAPS_API_KEY'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  } else {
    // Mask the value for security (only show first few chars)
    const value = process.env[varName];
    const maskedValue = value.substring(0, 4) + '...' + value.substring(value.length - 4);
  }
});

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`  - ${varName}`);
  });
  console.error('Please set these variables in your Netlify dashboard:');
  console.error('Site settings > Build & deploy > Environment variables');
  process.exit(1);
}