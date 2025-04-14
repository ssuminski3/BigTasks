require('dotenv').config()

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')

const app = express();
const port = 3000;
app.use(cors())

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2";
const client = new MongoClient(uri);

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_BASEURL,
    tokenSigningAlg: process.env.AUTH0_ALGO
  });
  
  // enforce on all endpoints
  app.use(jwtCheck);
  

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
    }
}

/*app.get('/', async (req, res) => {
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
});*/
app.get('/', async (req, res) => {
    res.send("LOKOKOKOKOO")
})

app.use((req, res, next) => {
    const error = new Error('Not found.')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal server error"
    res.status(status).send(message)
})


// Start the server and connect to MongoDB
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
});
