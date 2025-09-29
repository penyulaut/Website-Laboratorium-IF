const mongoose = require('mongoose');

const kontakSchema = new mongoose.Schema({
    nama:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    pesan:{
        type: String,
        required : true
    },
    tanggal:{
        type:Date,
        default: Date.now
    }
});

const Kontak = mongoose.model('Kontak', kontakSchema);
module.exports = Kontak;