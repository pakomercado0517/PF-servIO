const { Router } = require('express');
const UsersRoute = require('./Users.js')
const router = Router();

router.use("/", UsersRoute)

module.exports = router;