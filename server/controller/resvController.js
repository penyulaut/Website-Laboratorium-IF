const Reservasi = require('../model/resv');



function validJam(j) {
  return /^[0-2]\d:[0-5]\d$/.test(j);
}
function toMenit(j) {
  const [h, m] = j.split(':').map(Number);
  return h * 60 + m;
}


exports.buatResv = async (req, res) => {
  try {
    const { nama, nim, email, keperluan, tanggal, waktuMulai, waktuSelesai } = req.body;

    if (!nama || !email || !keperluan || !tanggal || !waktuMulai || !waktuSelesai) {
      return res.status(400).json({ message: 'Field wajib belum lengkap' });
    }
    if (!validJam(waktuMulai) || !validJam(waktuSelesai)) {
      return res.status(400).json({ message: 'Format jam harus HH:MM' });
    }
    if (toMenit(waktuMulai) >= toMenit(waktuSelesai)) {
      return res.status(400).json({ message: 'waktuMulai harus sebelum waktuSelesai' });
    }

    const bentrok = await Reservasi.findOne({
      tanggal,
      waktuMulai: { $lt: waktuSelesai },
      waktuSelesai: { $gt: waktuMulai }
    }).lean();

    if (bentrok) {
      return res.status(409).json({ message: 'Jadwal bentrok dengan reservasi lain' });
    }

    const reservasi = await Reservasi.create({
      nama: nama.trim(),
      nim: nim?.trim(),
      email: email.trim().toLowerCase(),
      keperluan: keperluan.trim(),
      tanggal,
      waktuMulai,
      waktuSelesai
    });

    res.status(201).json(reservasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.lihatsemuaResv = async (req, res) => {
  try {
    const { status, tanggal } = req.query;
    const filter = {};
    if (status) filter.status = status; // Disetujui, Pending, Ditolak
    if (tanggal) {
      // asumsi tanggal format YYYY-MM-DD
      const start = new Date(tanggal);
      const end = new Date(tanggal);
      end.setHours(23,59,59,999);
      filter.tanggal = { $gte: start, $lte: end };
    }
    const semuaResv = await Reservasi.find(filter).sort({ tanggal: 1, waktuMulai: 1 });
    res.json(semuaResv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateResv = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };


    if (updateData.waktuMulai && updateData.waktuSelesai) {
      if (!validJam(updateData.waktuMulai) || !validJam(updateData.waktuSelesai)) {
        return res.status(400).json({ message: 'Format jam harus HH:MM' });
      }
      if (toMenit(updateData.waktuMulai) >= toMenit(updateData.waktuSelesai)) {
        return res.status(400).json({ message: 'waktuMulai harus sebelum waktuSelesai' });
      }
      const docLama = await Reservasi.findById(id).lean();
      const tanggal = updateData.tanggal || docLama?.tanggal;
      const bentrok = await Reservasi.findOne({
        _id: { $ne: id },
        tanggal,
        waktuMulai: { $lt: updateData.waktuSelesai },
        waktuSelesai: { $gt: updateData.waktuMulai }
      }).lean();
      if (bentrok) {
        return res.status(409).json({ message: 'Perubahan jadwal bentrok' });
      }
    }

    const reservasiTerupdate = await Reservasi.findByIdAndUpdate(id, updateData, { new: true });
    if (!reservasiTerupdate) {
      return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
    }
    res.json(reservasiTerupdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.hapusResv = async (req, res) => {
    try{
        const {id} = req.params;
        const reservasiDihapus = await Reservasi.findByIdAndDelete(id);
        if(!reservasiDihapus){
            return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
        }
        res.json({ message: 'Reservasi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.lihatResvById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservasi = await Reservasi.findById(id);
        if (!reservasi) {
            return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
        }
        res.json(reservasi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateStatusResv = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['Pending', 'Disetujui', 'Ditolak'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }
    const reservasiTerupdate = await Reservasi.findByIdAndUpdate(id, { status }, { new: true });
    if (!reservasiTerupdate) {
      return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
    }
    res.json(reservasiTerupdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};