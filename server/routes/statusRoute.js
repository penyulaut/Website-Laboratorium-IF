const express = require('express');
const router = express.Router();
const statusController = require('../controller/statusController');
const { authRequired } = require('../middleware/authMiddleware');

router.route('/')
    .get(statusController.getStatus)
    .patch(authRequired, statusController.updateStatus);

module.exports = router;