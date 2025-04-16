const express = require('express');
const router = express.Router();
const { createBigTask, editBigTask, getBigTasks } = require('../controllers/bigTasksController');

router.post('/createbigtask', createBigTask);
router.put('/editbigtask', editBigTask);
router.get('/bigtasks', getBigTasks)

module.exports = router;
