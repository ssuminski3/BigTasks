const express = require('express');
const router = express.Router();
const { createBigTask, editBigTask, getBigTasks, deleteBigTask, doBigTask, getChildrenBigTasks } = require('../controllers/bigTasksController');

router.post('/createbigtask', createBigTask);
router.put('/editbigtask', editBigTask);
router.get('/bigtasks', getBigTasks)
router.delete('/deletebigtask', deleteBigTask)
router.put('/dobigtask', doBigTask);
router.get('/childrenbigtask', getChildrenBigTasks)

module.exports = router;
