const express = require("express");
const router = express.Router();
const {application_logic } = require('./contoller.js')



router.post('/', application_logic)



module.exports = router;