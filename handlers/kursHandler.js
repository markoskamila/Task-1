const Kurs = require ('../pkg/models/kurs/kursSchema');


exports.createKurs = async (req,res) =>{
    try{
        const kurs = await Kurs.create({
            ime:req.body.ime, 
            adresa:req.body.adresa,
            oblast:req.body.oblast,
        });
        res.status(201).json({
            status: 'success',
            data: {
             kurs: kurs,
            },
          });
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: err.message,
          });
    }
};

exports.getAllKursevi = async(req,res)=>{
    try{
        const kurs = await Kurs.find();
    res.status(200).json({
        status:'success',
        data:{
            kurs:kurs,
        },
    });
    }catch{
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    };
};

exports.getKurs = async(req,res)=>{
    try{
        const kurs = await Kurs.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
             kurs: kurs,
            },
        });
    }catch(error){
        res.status(404).json({
            status:'fail',
            message:error.message,
        });
    }
};

exports.deleteKurs = async(req,res)=>{
    try{
        await Kurs.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data:null,
        });
  

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateKurs = async(req,res)=>{
    try{
        const kurs = await Kurs.findByIdAndUpdate(
            {
            id:req.params.id,  
            ime:req.body.ime, 
            adresa:req.body.adresa,
            oblast:req.body.oblast,
            });
            res.status(200).json({
            status: 'success',
            data:{
             kurs:kurs,
            }
          });
    }catch{
        res.status(404).json({
            status: 'fail',
            message: err,
          });
        }
    };
