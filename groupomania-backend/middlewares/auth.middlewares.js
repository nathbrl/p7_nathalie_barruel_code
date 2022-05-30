require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            throw 'Les headers d\'autorisation sont absents';
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET_KEY);
        const email = decodedToken.email;
        if (req.body.email && req.body.email != email) {
            return res.status(403).json("Unauthorized request")
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid request'});
    }
}