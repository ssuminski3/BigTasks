const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');
let client

async function addTaskToDb(task) {
    try {
        client = await connectToDb();
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
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function setTaskDone(taskId, userId) {
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
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection("Tasks");

        // Get the name of the big task
        const bigTask = await db.collection("BigTasks").findOne(
            { _id: new ObjectId(bigTaskId), userId: userId },
            { projection: { name: 1 } }
        );

        if (!bigTask) {
            console.log("Big task not found or unauthorized.");
            return { tasks: [], name: null };
        }

        // Retrieve the tasks for the given bigTaskId and userId
        const tasks = await collection.find({ bigTaskId: new ObjectId(bigTaskId), userId: userId }).toArray();

        if (!tasks.length) {
            console.log("No tasks found for this big task or unauthorized.");
            return { tasks: [], name: bigTask.name };
        }

        return { tasks, name: bigTask.name };
    } catch (e) {
        console.error(e);
        return { tasks: [], name: null };
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function editTaskDb(taskId, userId, newName) {
    if (!newName || typeof newName !== 'string' || !newName.trim()) {
        throw new Error('Invalid new name: cannot be null, empty, or non-string');
    }

    client = await connectToDb();
    try {
        const db = client.db("BigTask");
        const collection = db.collection('Tasks');

        const result = await collection.updateOne(
            { _id: new ObjectId(taskId), userId: userId, name: { $ne: newName } }, // Only update if it's actually different
            { $set: { name: newName } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('No task found with the given id, or the name was already set to this value');
        }

        return result.modifiedCount;
    } catch (error) {
        console.error('Error updating Task:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deleteTaskDb(taskId, userId) {

    client = await connectToDb();
    try {
        const db = client.db("BigTask");
        const collection = db.collection('Tasks');

        const result = await collection.deleteOne(
            { _id: new ObjectId(taskId), userId: userId }
        );

        return result
    } catch (error) {
        console.error('Error deleting Task:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}


module.exports = { setTaskDone, getTasksDb, addTaskToDb, editTaskDb, deleteTaskDb }