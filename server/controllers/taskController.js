const { getUserSub } = require('../middleware/userId')
const { setTaskDone } = require('../db/taskDb')

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

module.exports = { doTask }