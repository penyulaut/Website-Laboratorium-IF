const express = require('express');
const router = express.Router();
const resvController = require('../controller/resvController');
const { authRequired } = require('../middleware/authMiddleware');

router.route('/')
  .get(resvController.lihatsemuaResv)
  .post(resvController.buatResv); // public create

router.route('/:id')
  .get(resvController.lihatResvById)
  .patch(authRequired, resvController.updateResv)
  .delete(authRequired, resvController.hapusResv);

router.patch('/:id/status', authRequired, resvController.updateStatusResv);

module.exports = router;