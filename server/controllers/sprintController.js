const { getUserSub } = require('../middleware/userId')
const { addSprintToDb, getSprintsDb, getSprintDb, editSprintDb, deleteSprintDb } = require('../db/sprintDb')

const createSprint = async (req, res) => {
    console.log("Received POST /createsprint", req.body);
    try {
        const userId = await getUserSub(req)
        await addSprintToDb({ name: req.body.name, done: req.body.done, userId: userId, hours: req.body.hours, minutes: req.body.minutes, tasks: req.body.tasks });
        
        res.status(200).send("Sprint created successfully");
    } catch (error) {
        console.error("Failed to create task:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const getSprints = async (req, res) => {
    console.log("Recived GET /getsprints")
    try {
        const userId = await getUserSub(req)
        const sprintsDb = await getSprintsDb(userId)
        const sprints = sprintsDb.map(sprint => ({ ...sprint, id: sprint._id }))
        console.log(sprints)
        res.send(sprints)
    }
    catch(e){
        console.error(e)
    }
}

const getSprint = async (req, res) => {
    console.log("Recived GET /getsprints")
    try {
        const userId = await getUserSub(req)
        const sprintDb = await getSprintDb(userId, req.query.sprintId)
        const sprints = {...sprintDb, id: sprintDb._id}
        console.log(sprints)
        res.send(sprints)
    }
    catch(e){
        console.error(e)
    }
}

const editSprint = async (req, res) => {
    console.log("Recived PUT /editsprint", req.body)
    try {
        const userId = await getUserSub(req)
        await editSprintDb(userId, req.body.id, req.body.sprint)
        res.status(200).send("Sprin edited")
    }
    catch(e){
        console.error(e)
    }
}

const deleteSprint = async (req, res) => {
    console.log("Received DELETE /deletesprint", req.query)
    const userId = await getUserSub(req); // Assuming getUserSub() fetches the user's unique ID from request
    try{
        await deleteSprintDb(req.query.sprintId, userId)
        res.status(200).send("Sprint deleted");
    } catch (e) {
        console.error(e)
    }
}

module.exports = { createSprint, getSprints, getSprint, editSprint, deleteSprint }