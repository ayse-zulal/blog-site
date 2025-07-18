const jwt = require('jsonwebtoken');

function auth(required = true) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      if (required) {
        return res.status(401).json({ error: 'No token provided' });
      } else {
        req.user = null;
        return next();
      }
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, username, email }
      next();
    } catch (err) {
      if (required) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      } else {
        req.user = null;
        next();
      }
    }
  };
}

module.exports = auth;