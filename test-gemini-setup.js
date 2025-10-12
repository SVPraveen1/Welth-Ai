// Test script to verify Gemini API setup
// Run with: node test-gemini-setup.js

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiSetup() {
  console.log('🔍 Testing Gemini API Setup...\n');

  // Test 1: Check if API key exists
  console.log('1️⃣ Checking GEMINI_API_KEY environment variable...');
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not set!');
    console.log('   Please set it in your .env file or environment variables.');
    process.exit(1);
  }
  console.log('✅ GEMINI_API_KEY is set');
  console.log(`   Key preview: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}\n`);

  // Test 2: Check package version
  console.log('2️⃣ Checking @google/generative-ai package...');
  try {
    const packageJson = require('./package.json');
    const version = packageJson.dependencies['@google/generative-ai'];
    console.log(`✅ Package installed: @google/generative-ai@${version}\n`);
  } catch (error) {
    console.error('❌ Could not read package.json');
    process.exit(1);
  }

  // Test 3: Initialize Gemini AI
  console.log('3️⃣ Initializing Gemini AI...');
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini AI initialized successfully\n');

    // Test 4: Test model access
    console.log('4️⃣ Testing model access...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    console.log('✅ Model loaded: gemini-2.0-flash-exp\n');

    // Test 5: Simple API call
    console.log('5️⃣ Testing simple API call...');
    const prompt = 'Reply with only the word "SUCCESS" if you can read this.';
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(`✅ API call successful!`);
    console.log(`   Response: ${text}\n`);

    // All tests passed
    console.log('🎉 All tests passed! Your Gemini API setup is working correctly.\n');
    console.log('📝 Next steps:');
    console.log('   1. Ensure GEMINI_API_KEY is set in your deployment environment (Vercel)');
    console.log('   2. Deploy your application');
    console.log('   3. Test receipt scanning in production');
    console.log('   4. Monitor logs in Vercel Dashboard\n');

  } catch (error) {
    console.error('❌ Error testing Gemini API:');
    console.error(`   ${error.message}`);
    if (error.message.includes('API key')) {
      console.log('\n💡 This might be an invalid API key. Please verify:');
      console.log('   1. Go to https://makersuite.google.com/app/apikey');
      console.log('   2. Generate a new API key if needed');
      console.log('   3. Update GEMINI_API_KEY in your .env file');
    }
    process.exit(1);
  }
}

// Run the test
testGeminiSetup().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
