const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authRequired, requireRole } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/admins', authRequired, requireRole('super'), authController.createAdmin);
router.get('/admins', authRequired, requireRole('super'), authController.listAdmins);

module.exports = router;