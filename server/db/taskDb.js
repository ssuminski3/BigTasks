const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

/**
 * Inserts a new sub-task.
 * @param {{ name: string, done: boolean, userId: any, bigTaskId: any }} task
 * @returns {Promise<ObjectId>}
 */
async function addTaskToDb(task) {
  const { db } = await connectToDb();
  if (typeof task.name !== 'string' || typeof task.done !== 'boolean') {
    throw new Error('Invalid Task object');
  }
  const result = await db.collection('Tasks').insertOne(task);
  return result.insertedId;
}

/**
 * Toggles a sub-task's done status.
 */
async function setTaskDone(taskId, userId) {
  const { db } = await connectToDb();
  const col = db.collection('Tasks');
  const task = await col.findOne({ _id: new ObjectId(taskId), userId });
  if (!task) return null;
  await col.updateOne(
    { _id: new ObjectId(taskId), userId },
    { $set: { done: !task.done } }
  );
  return true;
}

/**
 * Fetches all sub-tasks for a big task along with the big task name.
 */
async function getTasksDb(bigTaskId, userId) {
  const { db } = await connectToDb();
  const big = await db
    .collection('BigTasks')
    .findOne(
      { _id: new ObjectId(bigTaskId), userId },
      { projection: { name: 1 } }
    );
  if (!big) return { tasks: [], name: null };

  const tasks = await db
    .collection('Tasks')
    .find({ bigTaskId: new ObjectId(bigTaskId), userId })
    .toArray();

  return { tasks, name: big.name };
}

/**
 * Updates the name of a sub-task.
 */
async function editTaskDb(taskId, userId, newName) {
  if (!newName || typeof newName !== 'string' || !newName.trim()) {
    throw new Error('Invalid new name');
  }
  const { db } = await connectToDb();
  const result = await db.collection('Tasks').updateOne(
    { _id: new ObjectId(taskId), userId, name: { $ne: newName } },
    { $set: { name: newName } }
  );
  if (result.modifiedCount === 0) {
    throw new Error('No task updated or name unchanged');
  }
  return result.modifiedCount;
}

/**
 * Deletes a sub-task.
 */
async function deleteTaskDb(taskId, userId) {
  const { db } = await connectToDb();
  return db.collection('Tasks').deleteOne({
    _id: new ObjectId(taskId),
    userId,
  });
}

module.exports = {
  addTaskToDb,
  setTaskDone,
  getTasksDb,
  editTaskDb,
  deleteTaskDb,
};
