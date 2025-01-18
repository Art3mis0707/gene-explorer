// controllers/userController.js
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, userId, password, userType, affiliation } = req.body;

    // 1. Check if userId already exists
    const checkUserQuery = 'SELECT * FROM users WHERE userId = $1 LIMIT 1';
    const userExists = await pool.query(checkUserQuery, [userId]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'This User ID already exists.' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert into db
    const insertUserQuery = `
      INSERT INTO users (name, userId, password, userType, affiliation)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, userId, userType, affiliation
    `;
    const newUser = await pool.query(insertUserQuery, [
      name,
      userId,
      hashedPassword,
      userType,
      affiliation
    ]);

    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser.rows[0], // returns the inserted row
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // 1. Check if user with this userId exists
    const findUserQuery = 'SELECT * FROM users WHERE userId = $1 LIMIT 1';
    const userResult = await pool.query(findUserQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials (userId not found).' });
    }

    const user = userResult.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials (incorrect password).' });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        userId: user.userid,
        userType: user.usertype,
        affiliation: user.affiliation
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};
