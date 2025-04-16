const express = require('express');
const router = express.Router();
const { doTask } = require('../controllers/taskController')

router.put('/dotask', doTask);

module.exports = router;
