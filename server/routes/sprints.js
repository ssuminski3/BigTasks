const express = require('express');
const router = express.Router();
const { createSprint, getSprints, getSprint } = require('../controllers/sprintController') 

router.post('/createSprint', createSprint);
router.get("/getsprints", getSprints)
router.get("/getsprint", getSprint)

module.exports = router;
