const express = require('express');
const router = express.Router();
const { doTask, getTasks, editTask } = require('../controllers/taskController')

router.put('/dotask', doTask);
router.get('/tasks', getTasks)
router.put('/edittask', editTask)

module.exports = router;
