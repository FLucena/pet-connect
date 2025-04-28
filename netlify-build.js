// netlify-build.js
// This script verifies if required environment variables are present before build

console.log('Checking required environment variables...');

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
    console.log(`✓ ${varName} is set (${maskedValue})`);
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
} else {
  console.log('✓ All required environment variables are set!');
} 