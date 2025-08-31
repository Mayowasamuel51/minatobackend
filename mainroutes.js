const express = require("express");
const router = express.Router();
const {application_logic, get_all_information } = require('./contoller.js')
const {login} = require('./adminController.js')

router.post('/submit-form', application_logic)
router.post('/admin', login)
router.get('/applications',get_all_information)


module.exports = router;