const { ObjectId } = require('mongodb');
const { connectToDb } = require('./connectToDb');

/**
 * Inserts a new sprint document into the Sprints collection.
 * @param {{ name: string, done: boolean, userId: any, tasks?: any[] }} sprint
 */
async function addSprintToDb(sprint) {
  const { db } = await connectToDb();
  if (typeof sprint.name !== 'string' || typeof sprint.done !== 'boolean') {
    throw new Error('Invalid Sprint object');
  }
  return db.collection('Sprints').insertOne(sprint);
}

/**
 * Retrieves all sprints for a given user, omitting tasks and userId fields.
 * @param {any} userId
 * @returns {Promise<Array>}
 */
async function getSprintsDb(userId) {
  const { db } = await connectToDb();
  return db
    .collection('Sprints')
    .find({ userId }, { projection: { tasks: 0, userId: 0 } })
    .toArray();
}

/**
 * Retrieves a single sprint by its ID for a given user and populates task details.
 * @param {any} userId
 * @param {string} sprintId
 */
async function getSprintDb(userId, sprintId) {
  const { db } = await connectToDb();
  const sprint = await db
    .collection('Sprints')
    .findOne(
      { userId, _id: new ObjectId(sprintId) },
      { projection: { userId: 0 } }
    );
  if (!sprint) throw new Error(`Sprint ${sprintId} not found`);

  const tasks = await Promise.all(
    (sprint.tasks || []).map(taskId =>
      db
        .collection('Tasks')
        .findOne({ _id: new ObjectId(taskId) })
        .then(task => task && { ...task, id: taskId })
    )
  );
  return { ...sprint, tasks: tasks.filter(Boolean) };
}

/**
 * Updates an existing sprint's name and done status for a user.
 * @param {any} userId
 * @param {string} id
 * @param {{ name: string, done: boolean }} updatedSprint
 */
async function editSprintDb(userId, id, updatedSprint) {
  const { db } = await connectToDb();
  if (typeof updatedSprint.name !== 'string' || typeof updatedSprint.done !== 'boolean') {
    throw new Error('Invalid Sprint object');
  }
  const result = await db.collection('Sprints').updateOne(
    { _id: new ObjectId(id), userId },
    { $set: updatedSprint }
  );
  if (result.modifiedCount === 0) {
    throw new Error('No sprint updated – check ID or no changes were made');
  }
  return result.modifiedCount;
}

/**
 * Deletes a sprint by ID for a given user.
 * @param {string} sprintId
 * @param {any} userId
 */
async function deleteSprintDb(sprintId, userId) {
  const { db } = await connectToDb();
  return db.collection('Sprints').deleteOne({
    _id: new ObjectId(sprintId),
    userId,
  });
}

/**
 * Toggles the "done" status of a sprint for a user.
 * @param {string} sprintId
 * @param {any} userId
 */
async function setSprintDone(sprintId, userId) {
  const { db } = await connectToDb();
  const coll = db.collection('Sprints');
  const sprint = await coll.findOne({ _id: new ObjectId(sprintId), userId });
  if (!sprint) {
    console.warn("Sprint not found or unauthorized");
    return null;
  }
  await coll.updateOne(
    { _id: new ObjectId(sprintId), userId },
    { $set: { done: !sprint.done } }
  );
  return true;
}

module.exports = {
  addSprintToDb,
  getSprintsDb,
  getSprintDb,
  editSprintDb,
  deleteSprintDb,
  setSprintDone,
};
