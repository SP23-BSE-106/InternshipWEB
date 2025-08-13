const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

console.log('🔍 MongoDB Connection Diagnostics');
console.log('=================================');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ .env file exists');
    
    // Read .env file content (without exposing sensitive data)
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('MONGO_URI')) {
        console.log('✅ MONGO_URI found in .env');
        
        // Check if it's a local or cloud connection
        if (envContent.includes('localhost')) {
            console.log('📍 Using local MongoDB (localhost:27017)');
            console.log('   Make sure MongoDB service is running: net start MongoDB');
        } else if (envContent.includes('mongodb+srv://')) {
            console.log('☁️  Using MongoDB Atlas (cloud)');
        } else {
            console.log('⚠️  Custom MongoDB connection string detected');
        }
    } else {
        console.log('❌ MONGO_URI missing from .env file');
    }
} else {
    console.log('❌ .env file not found');
    console.log('   Create .env file with: MONGO_URI=mongodb://localhost:27017/myapp');
}

// Test MongoDB connection
async function testConnection() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
        console.log(`\n🔄 Testing connection to: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);
        
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ MongoDB connection successful!');
        
        await mongoose.connection.close();
    } catch (error) {
        console.log('\n❌ Connection failed:');
        console.log(`   Error: ${error.message}`);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('   🔧 Solution: MongoDB service is not running');
            console.log('   🔧 Run: net start MongoDB (Windows)');
            console.log('   🔧 Or install MongoDB: https://www.mongodb.com/try/download/community');
        } else if (error.message.includes('authentication')) {
            console.log('   🔧 Solution: Check username/password in connection string');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('   🔧 Solution: Check hostname in connection string');
        }
    }
}

// Check if MongoDB is installed
const { exec } = require('child_process');
exec('mongo --version', (error, stdout, stderr) => {
    if (error) {
        console.log('❌ MongoDB CLI not found - MongoDB may not be installed');
        console.log('   🔧 Install MongoDB: https://www.mongodb.com/try/download/community');
    } else {
        console.log(`✅ MongoDB CLI found: ${stdout.trim()}`);
    }
    
    testConnection();
});
