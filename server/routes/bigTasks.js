const express = require('express');
const router = express.Router();
const { createBigTask, editBigTask, getBigTasks, deleteBigTask } = require('../controllers/bigTasksController');

router.post('/createbigtask', createBigTask);
router.put('/editbigtask', editBigTask);
router.get('/bigtasks', getBigTasks)
router.delete('/deletebigtask', deleteBigTask)

module.exports = router;
