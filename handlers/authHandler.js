const User = require('../pkg/models/users/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signUp = async(req,res)=>{
    try{
        const user = await User.create({
            name:req.body.name, 
            email:req.body.email,
            password:req.body.password,
        
        });

        const token = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES,
            },
          );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            secure: false,
            httpOnly: true,
        });

        res.status(201).json({
            status:'succesfully added user',
            token,
            data:
            {
                user: user,
            },
        });
    }catch(err){
        console.log(err);
        res.status(500).send(err.message)    
}
};


exports.logIn = async (req,res)=>{
try{

    if(!email || !password){
        return res.status(400).send('Vnesi email & pass');
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).send ('Nevaliden pass ili email');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if(!isPasswordValid){
        return res.status(400).send('Nevaliden pass ili email');
    }

    const token = jwt.sign(
        {
          id: user._id,
          name:  user.name,
          email: user.email,
          isAdmin: user.admin
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        },
      );

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
      });

      res.status(201).json({
        status: 'success',
        token,
    });
    } catch (error) {
  console.log(error.message);
  return res.status(500).send('Internal server error');
}
};

