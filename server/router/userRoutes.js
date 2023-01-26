const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/authentication');
const user          = require('../controllers/userController');

// POST
router.post("/login", user.login)
router.post("/register", user.register)

// PUT
router.put("/update", auth , user.update)


module.exports = router;