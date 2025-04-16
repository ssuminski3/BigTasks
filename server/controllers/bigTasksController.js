const { addBigTaskDb, addTaskToDb, editBigTaskDb, getTasksByUserId } = require('../db/bigTaskDb');
const { getUserSub } = require('../middleware/userId')

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
    const userId = await getUserSub(req)
    try {
        await editBigTaskDb(req.body.id, { name: req.body.name, done: req.body.done }, userId);
        res.status(200).send("Worked");
    } catch (error) {
        console.error("Failed to edit task:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const getBigTask = async (req, res) => {
    try {
        const userId = await getUserSub(req)
        const tasks = await getTasksByUserId(userId)
        res.send(tasks)
    }
    catch(e){
        console.error(e)
    }
}



module.exports = { createBigTask, editBigTask };
