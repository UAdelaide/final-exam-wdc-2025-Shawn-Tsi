const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
    // Look up user by email + password_hash
    const [rows] = await db.query(
      `SELECT user_id, username, role
       FROM Users
       WHERE email = ? AND password_hash = ?`,
      [email, password]
    );

    if (rows.length === 0) {
      // invalid credential
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // store minimal user info in session
    const user = rows[0];
    req.session.user = {
      user_id: user.user_id,
      username: user.username,
      role: user.role
    };
    return res.json({ message: 'Login successful', user: req.session.user });
} catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Failed to log out' });
        }
        // Clear the session cookie
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logged out' });
  });
});

module.exports = router;