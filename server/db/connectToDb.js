const { MongoClient } = require('mongodb');

let client;
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2";

// Function to connect to the MongoDB database
async function connectToDb() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client;
}

// Function to close the MongoDB connection
async function closeDbConnection() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

module.exports = { connectToDb, closeDbConnection };
