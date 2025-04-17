const { addBigTaskDb, editBigTaskDb, getBigTasksByUserId, deleteBigTaskDb, setBigTaskDone } = require('../db/bigTaskDb');
const { addTaskToDb } = require('../db/taskDb')
const { getUserSub } = require('../middleware/userId')
const { ObjectId } = require('mongodb');

const createBigTask = async (req, res) => {
    console.log("Received POST /createbigtask", req.body);
    try {
        const userId = await getUserSub(req)
        const id = await addBigTaskDb({ name: req.body.name, done: req.body.done, userId: userId });
        req.body.tasks.forEach(async task =>
            await addTaskToDb({ name: task.name, done: task.done, bigTaskId: id, userId: userId })
        );
        res.status(200).send("Task created successfully");
    } catch (error) {
        console.error("Failed to create task:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const editBigTask = async (req, res) => {
    console.log("Received PUT /editbigtask", req.body);
    const userId = await getUserSub(req);

    try {
        await editBigTaskDb(req.body.id, { name: req.body.name, done: req.body.done }, userId);
    } catch (error) {
        console.error("Failed to edit bigTask:", error.message, req.body.id);
        // don't return, just log and proceed
    }

    try {
        const id = req.body.id;  // assuming this is the bigTaskId you want
        const tasks = req.body.tasks || [];
        console.log("OK add tasks", tasks)
        for (const task of tasks) {
            await addTaskToDb({
                name: task.name,
                done: task.done,
                bigTaskId: new ObjectId(id),
                userId: userId
            });
        }
        res.status(200).send("Worked");
    } catch (error) {
        console.error("Failed to add tasks:", error.message);
        res.status(500).send("Internal Server Error while adding tasks");
    }
};


const getBigTasks = async (req, res) => {
    try {
        const userId = await getUserSub(req)
        const tasks = await getBigTasksByUserId(userId)
        res.send(tasks)
    }
    catch (e) {
        console.error(e)
    }
}

const deleteBigTask = async (req, res) => {
    console.log("Received DELETE /deletebigtask", req.query)
    const userId = await getUserSub(req); // Assuming getUserSub() fetches the user's unique ID from request
    try {
        await deleteBigTaskDb(req.query.bigTaskId, userId)
        res.status(200).send("BigTask deleted");
    } catch (e) {
        console.error(e)
    }
}

const doBigTask = async (req, res) => {
    console.log("Received PUT /dobigtask", req.body);
    const userId = await getUserSub(req)
    try {
        await setBigTaskDone(req.body.id, userId);
        res.status(200).send("Worked");
    } catch (error) {
        console.error("Failed to edit task:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { createBigTask, editBigTask, getBigTasks, deleteBigTask, doBigTask };
