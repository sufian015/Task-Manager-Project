const UserModel=require('../model/usersModel');
const jwt=require('jsonwebtoken');
const {hashPassword,comparePassword}=require('../helpers/auth');


//user Registration

exports.registration=async (req,res)=>{
     try {
          // 1. destructure name, email, password from req.body
          const { firstName,lastName, email,mobile, password,photo } = req.body;
    
          // 2. all fields require validation
          if (!firstName.trim()) {
            return res.json({ error: "FirstName is required" });
          }
          if (!lastName.trim()) {
            return res.json({ error: "LastName is required" });
          }
          
          if (!email) {
            return res.json({ error: "Email is required" });
          }
          if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
          }
    
          // 3. check if email is taken by another user
          
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            return res.json({ error: "Email is taken" });
          }
    
    
          // 4. hash password before save to db
          const hashedPassword = await hashPassword(password);
          // 5. register user   
    
          const user = await new UserModel({
            firstName,
            lastName,
            mobile,
            email,
            password: hashedPassword,
            photo,
          }).save();
     
          const token = jwt.sign({ _id: user._id }, 'ghost123456', {
               expiresIn: "7d",
             });
             
             // 7. send response
             res.json({
               status:'success',
               user,
               token,
             });
     } catch (err) {
             console.log(err);
           }
    
}






// login controller

exports.login=async (req,res)=>{

     try {
       
     const {email,password}=req.body;
   
      if(!email){
       return res.json('email is required');
     }
   
     if(!password || password.length<6){
       return res.json({error: "Password must be at least 6 characters long" });
     }
   
    // ekhn dekhbo database e ai email ta ase ki na
   
     const user=await UserModel.findOne({email});
   
     if(!user){
   
       return res.json('user is not valid')
   
     }
   
     // jodi ei email diye database e user pai tahole password match korar somoy hoyeche 
   
     const match=await comparePassword(password,user.password);
   
     if (!match) {
       return res.json({ error: "Invalid email or password" });
     }
   
     // jodi match kore tahole amra valid user takey token genarate korbo
   
     const token= await jwt.sign({user:user._id},"ghost@12345",
       {expiresIn:"7d"});
   
       //ekhn response pathanor somoy
   
       res.status(200).json({status:"success",data:user,token:token})
   
     } catch (error) {
       console.log(error);
       
     }
   
   }