//Initialize the express app
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var CryptoJS = require('crypto-js');
var Creature = require('./models/creature');
var User = require('./models/user');
var ADMIN_USER = 'admin';
//Set the port
let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

//config files
var db = require('./config/db');
mongoose.connect(db.prod, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Create mongoose connection to MongoDB
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(express.json());
const refreshTokens = {};
var secret = require('./config/secret');
const SECRET = secret.secret;
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./dist/DnDHelper'));

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if(expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}));

passport.serializeUser(function (user, done) {
  done(null, user.username)
});

function genTokens(user){
  const token = jwt.sign(user, SECRET, { expiresIn: 10000000 });
  const refreshToken = randtoken.uid(256);
  refreshTokens[refreshToken] = user.username;
  return {token: token, refreshToken: refreshToken};
}

//Defining routes
app.get('/', function(req, res) {
  return res.sendFile('index.html', {root: 'dist/DnDHelper/'});
});

app.get('/api/creatures/:user_id', function(req, res){
  Creature.find({
    $or:[
      {'creature.user': ADMIN_USER},
      {'creature.user': req.params.user_id}
    ]
  },function(err, creatures){
    //If there is an error return the error and stop executing after that
    if(err)
      return res.send(err);

    return res.json(creatures); //return all creatures in JSON format
  });
});

//Creatures
app.post('/api/creatures/send', function(req, res){
  let creature = new Creature();
  creature.creature = req.body;
  creature.save(function(err){
    if(err)
      return res.send(err);

    return res.json({message: 'Creature Created!'})
  });
});

app.delete('/api/creatures/:creature_id', function(req, res){
  Creature.deleteOne({
    _id: req.params.creature_id
  }, function(err, bear){
    if(err)
      return res.send(err);

    return res.json({message: 'Successfully Deleted'});
  });
});

app.put('/api/creatures', function(req, res){
  Creature.findOne({ _id: req.body._id}, function(err, result){
    result.creature = req.body.creature;
    result.save(function(err){
      if(err)
        return res.send(err);

      return res.json({message: "Successfully Updated"});
    });
  });
});

//User
app.post('/api/users/register',function (req, res) {
  User.findOne({ $or:[{username: req.body.username},{email: req.body.email}]}, function(err, result) {
    if(result){
      let message = "";
      if(result.email == req.body.email)
        message = "That email already has an account";

      if(result.username == req.body.username)
        message = "Username already exists"
      return res.status(406).json({message: message});
    } else {
      let user = new User();
      user.id = req.body.id;
      user.role = req.body.role;
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      user.save(function(err){
        if(err)
          return res.sendStatus(500);

        var tokens = genTokens(user.toJSON());
        return res.json({jwt: tokens.token, refreshToken: tokens.refreshToken});
      });
    }
  });
});

app.post('/api/users/login', function (req, res) {
  User.findOne({username: req.body.username, password: req.body.password}, function(err, result) {
    if(result){
      let user = new User();
      user.id = result.id;
      user.role = result.role;
      user.email = result.email;
      user.username = result.username;
      user.password = result.password;
      var tokens = genTokens(user.toJSON());
      return res.json({jwt: tokens.token, refreshToken: tokens.refreshToken, id: user.id, role: user.role});
    } else {
      return res.status(406).json({message: "Invalid Password"});
    }
  });
});

app.post('/api/users/salt', function (req, res) {
  User.findOne({username: req.body.username}, function(err, result){
    if(result){
      let salt = result.password.substring(0, result.password.indexOf(":"));
      return res.json({salt: salt});
    } else {
      return res.status(404).json({message: "Username doesn't exist"});
    }
  });
});

app.post('/api/users/logout', function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});

app.post('/api/users/refresh', function (req, res) {
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const user = {
      'username': refreshTokens[refreshToken],
      'role': 'admin'
    }
    const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    res.json({jwt: token})
  }
  else {
    res.sendStatus(401);
  }
});

//Startup the app with the assigned port number above
app.listen(port, () => {});
