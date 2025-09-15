const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if(!token) return res.status(401).json({ message: 'Token diperlukan' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.admin = payload; // { id, role }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
}

function requireRole(role){
  return (req,res,next) => {
    if(!req.admin) return res.status(401).json({ message: 'Unauthorized' });
    if(req.admin.role !== role && req.admin.role !== 'super') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = { authRequired, requireRole };