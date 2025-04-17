const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2";
let client;

// Function to connect to the MongoDB database
async function connectToDb() {
    if (!client) {
        client = new MongoClient(uri);
    }

    // For MongoDB Node.js Driver v4.x or later, you don't need to check `topology.isConnected()`
    // The driver handles pooling and reconnection. Just ensure `connect()` is called once.
    if (!client.topology?.isConnected()) {
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
