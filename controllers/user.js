const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const sendTokenResponse = (user, statusCode, res) => {
//     const token = user.getSignedJwtToken();
//     const options = {
//       expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: false,
//     };

//     const data = {
//       token,
//       user,
//     };
//     res.status(statusCode).cookie('token', token, options).json({
//       success: true,
//       data,
//       token,
//     });
//   };

exports.getUser = async (req,res) => {
    const users = await  User.findAll();
    res.status(200).json({
        success:true,
        data:users
    })
}

exports.signUp = async (req,res) => {
    // console.log(req.body)
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const token = jwt.sign({ id: newUser.id },'my-test-secret', {
        expiresIn: 86400 // 24 hours
      });
    
    res.status(201).json({
        success:true,
        data:newUser
    })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let data;
    let user;
    user = await User.findOne({where:{ email:email }});
    console.log(user)
    if (!user) {
      return res.status(401).json({success:false,data:'Invalid credentials'});
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
        if (!passwordIsValid) {
      return res.status(401).json({success:false,data:'Invalid credentials'});
    }
      const token = jwt.sign({ id: user.id },'my-test-secret', {
        expiresIn: 86400 // 24 hours
      });
    
    res.status(200).json({
        success:true,
        data:token
    })
  };

