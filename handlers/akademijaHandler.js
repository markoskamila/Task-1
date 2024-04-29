const Akademija = require ('../pkg/models/akademija/akademijaSchema');

exports.createAkademija = async (req,res) =>{
    try{
        const akademija = await Akademija.create({
            ime:req.body.ime, 
            adresa:req.body.adresa,
            
        })
        
        res.status(201).json({
            status: 'success',
            data: {
              akademija: akademija,
            },
          });
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: err,
          });
    }
};

exports.getAllAkademii = async(req,res)=>{
    try{
        const akademija = await Akademija.find();
        res.status(200).json({
        status:'success',
        data:{
            akademija: akademija,
        },
    });
    }catch{
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    };
};

exports.getAkademija = async(req,res)=>{
    try{
        const akademija = await Oglas.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
             akademija: akademija,
            },
        });
    }catch(error){
        res.status(404).json({
            status:'fail',
            message:error,
        });
    }
};

exports.deleteAkademija = async(req,res)=>{
    try{
        await Akademija.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        });
  

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateAkademija = async(req,res)=>{
    try{
        await Akademija.findByIdAndUpdate(req.params.id, req.body,);
            res.status(200).json({
            status: 'success',
            data:{
             akademija:akademija,
            }
          });
    }catch{
        res.status(404).json({
            status: 'fail',
            message: err,
          });
        }
    };