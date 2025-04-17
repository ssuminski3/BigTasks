const { getUserSub } = require('../middleware/userId')
const { setTaskDone, getTasksDb } = require('../db/taskDb')

const doTask = async (req, res) => {
    console.log("Received PUT /dotask", req.body);
    const userId = await getUserSub(req)
    try {
        await setTaskDone(req.body.id, userId);
        res.status(200).send("Worked");
    } catch (error) {
        console.error("Failed to edit task:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const getTasks = async (req, res) => {
    console.log("Received GET /tasks", req.query);
    const userId = await getUserSub(req); // Assuming getUserSub() fetches the user's unique ID from request

    try {
        const { tasks, name } = await getTasksDb(req.query.bigTaskId, userId);

        // Map tasks to the required format
        const taskData = tasks.map(task => ({
            name: task.name,
            done: task.done,
            id: task._id,
        }));

        res.status(200).send({ tasks: taskData, name });
    } catch (error) {
        console.error("Failed to get tasks:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { doTask, getTasks }