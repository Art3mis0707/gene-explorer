const pool = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// REGISTER FUNCTION
const registerUser = async (req, res) => {
  try {
    const { name, userId, password, userType, affiliation } = req.body;
    console.log("Received Registration Request:", req.body);

    const userExists = await pool.query('SELECT * FROM users WHERE userId = $1', [userId]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User ID already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO users (name, userId, password, userType, affiliation) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, userId, userType, affiliation`,
      [name, userId, hashedPassword, userType, affiliation]
    );

    res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: 'Failed to register user.', details: error.message });
  }
};

// LOGIN FUNCTION
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const userResult = await pool.query('SELECT * FROM users WHERE userId = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials (userId not found).' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials (incorrect password).' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "fallbackSecret",  // Use a fallback if JWT_SECRET is undefined
      { expiresIn: '1d' }
    );
    

    res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, name: user.name, userId: user.userId, userType: user.userType, affiliation: user.affiliation }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Failed to log in.', details: error.message });
  }
};

module.exports = { registerUser, loginUser };  // ✅ Ensure both functions are exported properly
