const express = require('express');
const router = express.Router();
const { doTask, getTasks } = require('../controllers/taskController')

router.put('/dotask', doTask);
router.get('/tasks', getTasks)

module.exports = router;
