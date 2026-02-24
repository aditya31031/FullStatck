const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if (user.role === 'admin' || user.role === 'receptionist') {
            next();
        } else {
            res.status(403).json({ msg: 'Access denied: Staff only' });
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
