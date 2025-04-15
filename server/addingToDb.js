const { MongoClient } = require('mongodb');
let client;
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2";

async function connectToDb() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client;
}

async function addBigTaskDb(task) {
    try {
        const client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('BigTasks');

        if (typeof task.name !== 'string' || typeof task.done !== 'boolean') {
            throw new Error('Invalid BigTask object');
        }

        const result = await collection.insertOne(task);
        return result.insertedId;
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}

async function addTaskToDb(task){
    try {
        const client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('Tasks');

        if (typeof task.name !== 'string' || typeof task.done !== 'boolean') {
            throw new Error('Invalid Task object');
        }

        const result = await collection.insertOne(task);
        return result.insertedId;
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}
module.exports = { addBigTaskDb, addTaskToDb };