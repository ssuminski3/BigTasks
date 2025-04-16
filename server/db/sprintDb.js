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

        const result = await collection.insertOne({name: sprint.name, done: sprint.done, hours: sprint.hours, minutes: sprint.minutes});
        return result.insertedId;
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}

module.exports = { addSprintToDb }