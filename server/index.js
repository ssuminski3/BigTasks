const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
    }
}

app.get('/', async (req, res) => {
    try {
        const db = client.db('bigTask');
        const collection = db.collection('tasks');

        // Fetch the first document
        const firstDoc = await collection.findOne();

        if (firstDoc) {
            res.json(firstDoc);
        } else {
            res.status(404).json({ message: "No documents found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server and connect to MongoDB
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
