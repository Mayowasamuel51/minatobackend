const express = require("express");
const router = express.Router();
const {application_logic } = require('./contoller.js')
const {login} = require('./adminController.js')

router.post('/submit-form', application_logic)
router.post('/admin', login)



module.exports = router;