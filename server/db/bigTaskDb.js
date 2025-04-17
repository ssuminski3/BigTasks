const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

async function addBigTaskDb(task) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('BigTasks');

        if (typeof task.name !== 'string' || typeof task.done !== 'boolean') {
            throw new Error('Invalid BigTask object');
        }
        console.log("Big task: " + task)
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


async function editBigTaskDb(id, updatedTask, userId) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collection = db.collection('BigTasks');

        // Validate the updatedTask object
        if (typeof updatedTask.name !== 'string' || typeof updatedTask.done !== 'boolean') {
            throw new Error('Invalid BigTask object');
        }

        // Update the task in the database
        const result = await collection.updateOne(
            { _id: new ObjectId(id), userId: userId }, // Use ObjectId to find the document
            { $set: updatedTask } // Update the fields with the new values
        );

        if (result.modifiedCount === 0) {
            throw new Error('No task found with the given id or no changes made');
        }

        return result.modifiedCount; // Return the number of modified documents
    } catch (error) {
        console.error('Error updating BigTask:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getBigTasksByUserId(userId) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db("BigTask");
        const collectionBig = db.collection('BigTasks');
        const collection = db.collection('Tasks')

        const tasksFromDb = await collectionBig.find({ userId: userId }, { userId: 0 }).toArray();
        const tasks = await Promise.all(
            tasksFromDb.map(async task => {

                const countCursorFalse = await collection.aggregate([
                    { $match: { "bigTaskId": new ObjectId(task._id), "done": false } },
                    { $count: "totalTasks" }
                ]).toArray();  // <--- .toArray() to actually execute the aggregation!

                const countCursorTrue = await collection.aggregate([
                    { $match: { "bigTaskId": new ObjectId(task._id), "done": true } },
                    { $count: "totalTasks" }
                ]).toArray();

                const countDone = countCursorTrue[0]?.totalTasks || 0;
                const countTotal = (countCursorFalse[0]?.totalTasks || 0) + countDone;

                return { ...task, taskToDo: countTotal, donesTasks: countDone, id: task._id };
            })
        );

        console.log(tasks)
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks for user:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deleteBigTaskDb(bigTaskId, userId) {
    let client;
    client = await connectToDb();
    try {
        const db = client.db("BigTask");
        const collection = db.collection('BigTasks');

        const result = await collection.deleteOne(
            { _id: new ObjectId(bigTaskId), userId: userId }
        );

        return result
    } catch (error) {
        console.error('Error deleting BigTask:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
}


module.exports = { addBigTaskDb, editBigTaskDb, getBigTasksByUserId, deleteBigTaskDb };