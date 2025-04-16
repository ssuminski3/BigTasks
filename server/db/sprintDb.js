const { ObjectId } = require('mongodb');
const connectToDb = require('./connectToDb');

async function addSprintToDb(sprint) {
    try {
        const client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('Sprints');

        if (typeof sprint.name !== 'string' || typeof sprint.done !== 'boolean') {
            throw new Error('Invalid Task object');
        }
        await collection.insertOne(sprint);
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}

module.exports = { addSprintToDb }