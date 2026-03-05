const express = require('express');
const { login, refresh } = require('../controllers/authController');
const { protectRoute } = require('../middleware/authMw');
const router = express.Router();

router.post('/login', login);
router.post('/refresh', refresh);

//For test!
router.get('/profile', protectRoute, (req, res) => {
    res.json({ message: 'welcome', user: req.user });
});

module.exports = router;