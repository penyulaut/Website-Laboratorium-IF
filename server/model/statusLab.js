const mongoose = require('mongoose');

const statusLabSchema = new mongoose.Schema({
    status:{
        type: String,
        enum: ['Buka', 'Tutup'],
        required : true,
        default: 'Tutup'
},
    terakhirDiubah:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StatusLab', statusLabSchema);