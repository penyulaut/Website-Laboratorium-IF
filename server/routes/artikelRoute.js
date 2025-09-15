const express = require('express');
const router = express.Router();
const multer = require('multer');
const artikelController = require('../controller/artikelController');
const upload = require('../middleware/multerConfig');
const { authRequired } = require('../middleware/authMiddleware');

router.route('/')
    .get(artikelController.lihatsemuaArtikel)
    .post(authRequired, upload.single('gambar'), artikelController.buatArtikel);

router.route('/:id')
    .get(artikelController.lihatsatuArtikel)
    .patch(authRequired, upload.single('gambar'), artikelController.updateArtikel)
    .delete(authRequired, artikelController.hapusArtikel);

module.exports = router;