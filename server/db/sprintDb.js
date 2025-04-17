const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

let client

async function addSprintToDb(sprint) {
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('Sprints');

        if (typeof sprint.name !== 'string' || typeof sprint.done !== 'boolean') {
            throw new Error('Invalid Task object');
        }
        await collection.insertOne(sprint);
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getSprintsDb(userId) {
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection("Sprints");

        const sprints = await collection.find({ userId: userId }, { tasks: 0, userId: 0 }).toArray()

        return sprints
    } catch (error) {
        console.error('Error inserting BigTask:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getSprintDb(userId, sprintId) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collectionSprint = db.collection("Sprints");
        const collection = db.collection("Tasks");

        const sprint = await collectionSprint.findOne(
            { userId: userId, _id: new ObjectId(sprintId) },
            { projection: { userId: 0 } } // corrected projection syntax
        );

        if (!sprint) {
            throw new Error(`Sprint with ID ${sprintId} not found.`);
        }

        const tasks = await Promise.all(
            sprint.tasks.map(async taskId => {
                const task = await collection.findOne({ _id: new ObjectId(taskId) });
                return task ? { ...task, id: taskId } : null;  // ensure only objects
            })
        );

        return { ...sprint, tasks: tasks.filter(Boolean) }; // filter out any nulls
    } catch (error) {
        console.error('Error getting sprint:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}


async function editSprintDb(userId, id, updatedSprint) {
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('Sprints');
        console.log("IP", updatedSprint)
        // Validate the updatedTask object
        if (typeof updatedSprint.name !== 'string' || typeof updatedSprint.done !== 'boolean') {
            throw new Error('Invalid BigTask object');
        }

        // Update the sprint in the database
        const result = await collection.updateOne(
            { _id: new ObjectId(id), userId: userId }, // Use ObjectId to find the document
            { $set: updatedSprint } // Update the fields with the new values
        );

        if (result.modifiedCount === 0) {
            throw new Error('No task found with the given id or no changes made');
        }

        return result.modifiedCount; // Return the number of modified documents
    } catch (error) {
        console.error('Error updating Sprint:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deleteSprintDb(sprintId, userId) {

    client = await connectToDb();
    try {
        const db = client.db("BigTask");
        const collection = db.collection('Sprints');

        const result = await collection.deleteOne(
            { _id: new ObjectId(sprintId), userId: userId }
        );

        return result
    } catch (error) {
        console.error('Error deleting Sprint:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

module.exports = { addSprintToDb, getSprintsDb, getSprintDb, editSprintDb, deleteSprintDb }