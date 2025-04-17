const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

/**
 * Inserts a new big task document into the BigTasks collection.
 * @param {{ name: string, done: boolean, userId: any }} task
 * @returns {Promise<ObjectId>} The inserted document's ID
 */
async function addBigTaskDb(task) {
  const { db } = await connectToDb();

  if (typeof task.name !== 'string' || typeof task.done !== 'boolean') {
    throw new Error('Invalid BigTask object');
  }

  const result = await db.collection('BigTasks').insertOne(task);
  return result.insertedId;
}

/**
 * Updates an existing big task's name and done status for a user.
 * @param {string} id
 * @param {{ name: string, done: boolean }} updatedTask
 * @param {any} userId
 * @returns {Promise<number>} Number of modified documents
 */
async function editBigTaskDb(id, updatedTask, userId) {
  const { db } = await connectToDb();

  if (typeof updatedTask.name !== 'string' || typeof updatedTask.done !== 'boolean') {
    throw new Error('Invalid BigTask object');
  }
  console.log("What am I saving: ", updatedTask)
  const result = await db.collection('BigTasks').updateOne(
    { _id: new ObjectId(id), userId },
    { $set: updatedTask }
  );

  if (result.modifiedCount === 0) {
    throw new Error('No task found with the given id or no changes made');
  }

  return result.modifiedCount;
}

/**
 * Retrieves all big tasks for a given user and aggregates subtask counts.
 * @param {any} userId
 * @returns {Promise<Array>} List of tasks with counts
 */
async function getBigTasksByUserId(userId) {
  const { db } = await connectToDb();
  const bigCol = db.collection('BigTasks');
  const subCol = db.collection('Tasks');

  const tasksFromDb = await bigCol
    .find({ userId }, { projection: { userId: 0 } })
    .toArray();

  const tasks = await Promise.all(
    tasksFromDb.map(async task => {
      const [falseCount] = await subCol.aggregate([
        { $match: { bigTaskId: new ObjectId(task._id), done: false } },
        { $count: 'totalTasks' }
      ]).toArray();

      const [trueCount] = await subCol.aggregate([
        { $match: { bigTaskId: new ObjectId(task._id), done: true } },
        { $count: 'totalTasks' }
      ]).toArray();

      const countDone = trueCount?.totalTasks || 0;
      const countTotal = (falseCount?.totalTasks || 0) + countDone;

      return {
        ...task,
        taskToDo: countTotal,
        donesTasks: countDone,
        id: task._id
      };
    })
  );

  return tasks;
}

/**
 * Deletes a big task by ID for a given user.
 * @param {string} bigTaskId
 * @param {any} userId
 */
async function deleteBigTaskDb(bigTaskId, userId) {
  const { db } = await connectToDb();
  return db.collection('BigTasks').deleteOne({
    _id: new ObjectId(bigTaskId),
    userId,
  });
}

/**
 * Toggles the "done" status of a big task for a user.
 * @param {string} taskId
 * @param {any} userId
 */
async function setBigTaskDone(taskId, userId) {
  const { db } = await connectToDb();
  const col = db.collection('BigTasks');
  const task = await col.findOne({ _id: new ObjectId(taskId), userId });

  if (!task) {
    console.warn('Task not found or unauthorized');
    return null;
  }

  await col.updateOne(
    { _id: new ObjectId(taskId), userId },
    { $set: { done: !task.done } }
  );

  return true;
}

module.exports = {
  addBigTaskDb,
  editBigTaskDb,
  getBigTasksByUserId,
  deleteBigTaskDb,
  setBigTaskDone,
};
