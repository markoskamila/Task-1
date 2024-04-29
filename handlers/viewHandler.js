const Kurs = require('../pkg/models/kurs/kursSchema')
exports.viewKursevi= async(req, res)=>{
    try{
    const kurs = await Kurs.find();
    return res.render("kurs", {kurs})
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message,
          });
    }

}

