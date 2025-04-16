const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

async function addTaskToDb(task) {
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

async function setTaskDone(taskId, userId) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection("Tasks");

        const task = await collection.findOne({ _id: new ObjectId(taskId), userId: userId });

        if (!task) {
            console.log("Task not found or unauthorized.");
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(taskId), userId: userId },
            { $set: { done: !task.done } }
        );

    } catch (e) {
        console.error(e);
    } finally {
        if (client) {
            await client.close();
        }
    }
}


async function getTasksDb(bigTaskId, userId) {
    try {
        const client = await connectToDb();
        const db = client.db("BigTask")
        const collection = db.collection("Tasks")
        const tasks = await collection.find({ bigTaskId: new ObjectId(bigTaskId), userId: userId }).toArray()
        if (!tasks) {
            console.log("Task not found or unauthorized.");
            return;
        }
        console.log(tasks)
        return tasks
    } catch (e) {
        console.error(e)
    }
}

module.exports = { setTaskDone, getTasksDb, addTaskToDb }