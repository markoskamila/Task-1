const mongoose = require('mongoose');

const akademijaSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: [true, 'Mora da ima ime'],
        minlength: 1,
        trim: true,
    },
    adresa: {
        type:[String, Number],
        required: [true, 'Mora da vnesete vasha adresa'],

    }
});

const Akademija = mongoose.model('Akademija', akademijaSchema);

module.exports = Akademija;