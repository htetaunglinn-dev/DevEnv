// Simple test script to verify post endpoints work
// Run with: node src/test-post.js

const http = require('http');

// Test data
const testPost = {
  title: "Test Post",
  content: "This is a test post content",
  category: "general",
  tags: "test,api",
  status: "published"
};

// Helper function to make HTTP requests
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(body)
        });
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testPostEndpoints() {
  try {
    console.log('🚀 Testing Post API endpoints...\n');

    // Test 1: Get all posts (should work without auth)
    console.log('📋 Testing GET /api/posts');
    const getPostsResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/api/posts',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${getPostsResponse.statusCode}`);
    console.log(`Response: ${JSON.stringify(getPostsResponse.body, null, 2)}\n`);

    // Test 2: Health check
    console.log('🏥 Testing Health Check');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/health',
      method: 'GET'
    });
    
    console.log(`Status: ${healthResponse.statusCode}`);
    console.log(`Response: ${JSON.stringify(healthResponse.body, null, 2)}\n`);

    console.log('✅ Basic tests completed!');
    console.log('Note: Authentication-required endpoints need a valid JWT token to test fully.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('Make sure the server is running on port 8000');
  }
}

testPostEndpoints();