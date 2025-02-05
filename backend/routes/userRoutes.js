const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // ✅ Correct import

// Debugging: Check if functions exist before using them
if (!registerUser || !loginUser) {
  console.error("ERROR: registerUser or loginUser is undefined in userRoutes.js");
}

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
