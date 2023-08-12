// basic import

const express=require('express');
const app=express();
const router=require('./src/routes/api');
const bodyParser=require('body-parser');

// security middleware lib import

const rateLimit=require('express-rate-limit');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');


// darabase import

const mongoose=require('mongoose');


// security middleware implementation

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// request rate limit

const limiter=rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// mongodb database connection

let uri='mongodb://127.0.0.1:27017/task'

mongoose.connect(uri)
   .then(console.log('connection successful'))
   .catch((err)=>console.log(err))


//routing implement

app.use('/api/v1',router);

// undefine route

app.use('*',(req,res)=>{
     res.status(404).json({status:'fail',data:'Not Found'})
})


module.exports=app;

