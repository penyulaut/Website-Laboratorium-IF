const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

async function bootstrapIfEmpty() {
  const count = await Admin.countDocuments();
  if(count === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@lab.local';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash, role: 'super' });
    console.log('Bootstrap admin dibuat:', email);
  }
}

exports.init = async () => {
  try { await bootstrapIfEmpty(); } catch(e){ console.error('Gagal bootstrap admin', e); }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message:'Email & password wajib' });
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if(!admin) return res.status(401).json({ message: 'Kredensial salah' });
    const match = await bcrypt.compare(password, admin.passwordHash);
    if(!match) return res.status(401).json({ message: 'Kredensial salah' });
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
    res.json({ token, role: admin.role });
  } catch(e){
    res.status(500).json({ message: e.message });
  }
};

exports.createAdmin = async (req,res) => {
  try {
    const { email, password, role='admin' } = req.body;
    if(!email || !password) return res.status(400).json({ message:'Email & password wajib' });
    const exists = await Admin.findOne({ email: email.toLowerCase() });
    if(exists) return res.status(409).json({ message: 'Email sudah dipakai' });
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email: email.toLowerCase(), passwordHash, role });
    res.status(201).json({ id: admin._id, email: admin.email, role: admin.role });
  } catch(e){
    res.status(500).json({ message: e.message });
  }
};

exports.listAdmins = async (req,res) => {
  try {
    const list = await Admin.find({}, 'email role createdAt');
    res.json(list);
  } catch(e){
    res.status(500).json({ message: e.message });
  }
};