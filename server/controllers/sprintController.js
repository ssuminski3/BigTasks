const { getUserSub } = require('../middleware/userId')
const { addSprintToDb } = require('../db/sprintDb')

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

module.exports = { createSprint }