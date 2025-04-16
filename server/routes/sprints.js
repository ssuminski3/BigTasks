const express = require('express');
const router = express.Router();
const { createSprint, getSprints, getSprint, editSprint } = require('../controllers/sprintController') 

router.post('/createSprint', createSprint);
router.get("/getsprints", getSprints)
router.get("/getsprint", getSprint)
router.put("/editsprint", editSprint)

module.exports = router;
