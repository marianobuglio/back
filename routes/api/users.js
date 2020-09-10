var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var acceso = require('../../controlAcceso/user-access')

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});
router.get('/users/list', auth.required, acceso.grantAccess('readAny','profile'), function(req, res, next){
  User.find({}).then(function(users){
    if(!users){ return res.sendStatus(401); }

    return res.json({users});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json({message:"mail o contraseña incorrectos"});
    }
  })(req, res, next);
});

router.post('/users/reset-pass',function(req,res,next){
  console.log(req.body)
})

router.put('/users/reset-pass',function(req,res,next){
  console.log(req.body)
})
router.post('/users/signup', function(req, res, next){
  var user = new User(req.body);
  console.log(user)
  user.setPassword(req.body.password);
  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.delete('/users/logout', function(req, res, next){
  return res.json({message:'salio'});
})

module.exports = router;
