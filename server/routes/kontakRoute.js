const express = require('express');
const router = express.Router();
const kontakController = require('../controller/kontakController');
const { authRequired } = require('../middleware/authMiddleware');

router.post('/', kontakController.buatPesan);
router.get('/', authRequired, kontakController.listPesan);

module.exports = router;

