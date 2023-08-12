const express=require('express');

const router=express.Router();
const usersController=require('../controller/usersController');


router.post('/registration',usersController.registration);
router.post('/login',usersController.login);

module.exports=router;