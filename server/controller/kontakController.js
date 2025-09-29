const Kontak = require('../model/kontak');

exports.buatPesan = async (req, res) => {
    try {
        const { nama, email, pesan } = req.body;
        if (!nama || !email || !pesan) {
            return res.status(400).json({ message: 'Field wajib belum lengkap' });
        }
    const kontakBaru = new Kontak({ nama, email, pesan });
        await kontakBaru.save();
        return res.status(201).json({ message: 'Pesan berhasil dikirim' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

exports.listPesan = async (req, res) => {
    try {
    const pesanList = await Kontak.find().sort({ tanggal: -1 });
    return res.status(200).json(pesanList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}
