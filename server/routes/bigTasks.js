const express = require('express');
const router = express.Router();
const { createBigTask, editBigTask, getBigTasks, deleteBigTask, doBigTask } = require('../controllers/bigTasksController');

router.post('/createbigtask', createBigTask);
router.put('/editbigtask', editBigTask);
router.get('/bigtasks', getBigTasks)
router.delete('/deletebigtask', deleteBigTask)
router.put('/dobigtask', doBigTask);

module.exports = router;
