const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({

     email:{type:String,unique:true,required:true},
     firstName:{type:String},
     lastName:{type:String},
     mobile:{type:String},
     password:{type:String,required:true},
     photo:{type:String},
     createdDate:{type:Date,default:Date.now()}


},{versionKey:false})

const UserModel=mongoose.model('users',UserSchema);

module.exports=UserModel;