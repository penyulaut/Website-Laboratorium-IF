const StatusLab = require('../model/statusLab');
const mongoose = require('mongoose');

exports.getStatus = async (req, res) => {
    try{
        let statusLab = await StatusLab.findOne();
        if(!statusLab){
            statusLab = new StatusLab();
            await statusLab.save();
        }
        res.status(200).json(statusLab);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateStatus = async (req, res) => {
  try {
    let { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Field 'status' wajib ada" });
    }

    status = status.trim();
    if (status !== 'Buka' && status !== 'Tutup') {
      return res.status(400).json({ message: "Status hanya boleh 'Buka' atau 'Tutup'" });
    }

    const statusTerupdate = await StatusLab.findOneAndUpdate(
      {},                                   // selalu dokumen tunggal
      { status, terakhirDiubah: Date.now() }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(statusTerupdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};