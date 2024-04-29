const mongoose = require('mongoose');

const kursSchema = new mongoose.Schema({
    ime:{
        type: String,
        minlength: 1,
        maxlength: [20, 'Namali na tekst'],
        trim: true,
        required: [true, 'Mora da ima naslov'],
    },
    adresa:{
        type:[String, Number],
        required:[true, 'Mora da napishete vasha adresa'],
    },
    oblast:{
        type:String,
        required:[true,'Mora da ima oblast']

    }
   

});
const Kurs = mongoose.model('Kurs', kursSchema);
module.exports = Kurs;