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

async function getSprintsDb(userId) {
    try {
        const client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection("Sprints");

        const sprints = await collection.find({ userId: userId }, { tasks: 0, userId: 0}).toArray()

        return sprints
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}

async function getSprintDb(userId, sprintId) {
    try {
        const client = await connectToDb();
        const db = client.db("BigTask");
        const collectionSprint = db.collection("Sprints");
        const collection = db.collection("Tasks")

        const sprint = await collectionSprint.findOne({ userId: userId, _id: new ObjectId(sprintId) }, { userId: 0})

        const tasks = await Promise.all(
            sprint.tasks.map(async task => {
                const result = await collection.findOne({ _id: new ObjectId(task) });
                return { ...result, id: task };
            })
        );
        
        return {...sprint, tasks}
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    }
}

module.exports = { addSprintToDb, getSprintsDb, getSprintDb }