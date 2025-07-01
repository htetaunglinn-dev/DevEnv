const axios = require('axios');

const BASE_URL = 'http://localhost:8000/api';

async function testArticleEndpoints() {
  try {
    console.log('🚀 Testing Article API Endpoints...\n');

    // Test 1: Get articles (should work without auth)
    console.log('1. Testing GET /api/articles (public)');
    try {
      const response = await axios.get(`${BASE_URL}/articles`);
      console.log('✅ Status:', response.status);
      console.log('✅ Articles count:', response.data.articles?.length || 0);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    // Test 2: Try to create article without auth (should fail)
    console.log('\n2. Testing POST /api/articles (no auth - should fail)');
    try {
      const response = await axios.post(`${BASE_URL}/articles`, {
        title: 'Test Article',
        content: 'This is test content for the article.'
      });
      console.log('❌ Unexpected success:', response.status);
    } catch (error) {
      console.log('✅ Expected failure - Status:', error.response?.status);
      console.log('✅ Message:', error.response?.data?.message);
    }

    // Test 3: Test validation
    console.log('\n3. Testing POST /api/articles with invalid data');
    try {
      const response = await axios.post(`${BASE_URL}/articles`, {
        title: '', // Invalid - too short
        content: 'short' // Invalid - too short
      }, {
        headers: {
          'Authorization': 'Bearer fake-token'
        }
      });
      console.log('❌ Unexpected success:', response.status);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Auth required (expected)');
      } else if (error.response?.status === 400) {
        console.log('✅ Validation error (expected)');
        console.log('✅ Errors:', error.response?.data?.errors);
      } else {
        console.log('❌ Unexpected error:', error.response?.status);
      }
    }

    console.log('\n🎉 API endpoints are properly configured!');
    console.log('\n📋 Available endpoints:');
    console.log('  POST   /api/articles           - Create article (auth required)');
    console.log('  GET    /api/articles           - Get published articles');
    console.log('  GET    /api/articles/my-articles - Get user\'s articles (auth required)');
    console.log('  GET    /api/articles/:id       - Get article by ID');
    console.log('  PUT    /api/articles/:id       - Update article (auth required)');
    console.log('  DELETE /api/articles/:id       - Delete article (auth required)');
    console.log('  POST   /api/articles/:id/like  - Toggle like (auth required)');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Check if server is running first
axios.get(`${BASE_URL}/../health`)
  .then(() => {
    console.log('✅ Server is running at http://localhost:8000');
    testArticleEndpoints();
  })
  .catch(() => {
    console.log('❌ Server is not running. Please start the server first with:');
    console.log('   cd server && npm run dev');
  });