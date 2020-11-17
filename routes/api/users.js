var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var acceso = require('../../controlAcceso/user-access')
var userController = require('../../controllers/users/user-back-controller')

router.get('/user', auth.required, userController.findByID);
router.get('/users/list', auth.required, acceso.grantAccess('readAny','profile'),userController.list)
router.put('/user', auth.required, userController.update);

router.post('/users/login',userController.login)
router.post('/users/signup', userController.signUp);
router.delete('/users/logout',userController.signOut)
//router.post('/users/reset-pass',function(req,res,next){
//   console.log(req.body)
// })

// router.put('/users/reset-pass',function(req,res,next){
//   console.log(req.body)
// })


module.exports = router 
