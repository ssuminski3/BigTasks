const express = require('express');
const router = express.Router();
const { createSprint } = require('../controllers/sprintController') 

router.post('/createSprint', createSprint);

module.exports = router;
