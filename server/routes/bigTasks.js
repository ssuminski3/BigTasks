const express = require('express');
const router = express.Router();
const { createBigTask, editBigTask } = require('../controllers/bigTasksController');

router.post('/createbigtask', createBigTask);
router.put('/editbigtask', editBigTask);

module.exports = router;
