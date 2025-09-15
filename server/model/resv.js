const mongoose = require('mongoose');

const resvSchema = new mongoose.Schema({
    nama:{
        type: String,
        required : true
    },
    nim:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    keperluan:{
        type: String,
        required: true
    },
    tanggal:{
        type: Date,
        required: true
    },
    waktuMulai:{
        type: String,
        required: true
    },
    waktuSelesai:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Disetujui', 'Ditolak'],
        default: 'Pending'
    }
})

const Resv = mongoose.model('Resv', resvSchema);
module.exports= Resv;