const express = require('express');
const router = express.Router();
const { doTask, getTasks, editTask, deleteTask } = require('../controllers/taskController')

router.put('/dotask', doTask);
router.get('/tasks', getTasks)
router.put('/edittask', editTask)
router.delete('/deletetask', deleteTask)

module.exports = router;
