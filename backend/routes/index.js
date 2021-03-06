var mongoose = require('mongoose'),
  config = require('../config.json'),
  Q = require('q'),
  md5 = require('MD5'),
  nodemailer = require('nodemailer'),
  Registration;

connect();

exports.login = function(app) {
  return function(req, res) {
    if (req.body.email === config.admin.email && req.body.password === config.admin.password) {
      app.session = {
        authorized: true
      };
      res.send(200);
    } else {
      if (app.session) {
        delete app.session;
      }
      res.send(401);
    }
  };
};

exports.register = function(req, res) {
  var hash, registration;
  hash = md5('asdjkhads891k12' + req.body.name + req.body.email + 'ajvghbr82123h;');
  registration = new Registration({
    name: req.body.name,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    comment: req.body.comment,
    adress: req.body.adress,
    email: req.body.email,
    confirmed: false,
    hash: hash
  });
  registration.save(function(err, registration) {
    if (err) {
      res.send(500, 'Schon vergessen? Du bist bereits angemeldet');
    } else {
      Registration.count({
        confirmed: true
      }, function(err, count) {
        if (err) {
          res.send(500, 'Da gabs wohl ein Fehler');
        } else {
          if (count >= config.maxGamers) {
            res.send('Es wurde bereits das Maximum an Teilnehmern erreicht. Falls ein Platz frei wird werden wir uns bei dir melden.');
          } else {
            if (config.sendEmail) {
              console.log(count, config.maxGamers);
              sendMail(req.body.email, hash);
              res.send('Du wirst in kürze eine E-Mail erhalten, um die Anmeldung zu bestätigen.');
            } else {
              res.send('Besten dank für die Anmeldung.');
            }
          }
        }
      });
    }
  });
};

exports.confirm = function(req, res) {
  console.log('confirm');
  Registration.findOneAndUpdate({
    hash: req.params.hash
  }, {
    confirmed: true
  }, function(err) {
    if (err) {
      res.send(500, 'Da gabs wohl ein Fehler');
    } else {
      res.send(200);
    }
  });
};

exports.countGamers = function(req, res) {
  Registration.count({
    confirmed: true
  }, function(err, count) {
    if (err) {
      res.send(500, 'Da gabs wohl ein Fehler');
    } else {
      res.send({
        count: count,
        maxGamers: config.maxGamers
      });
    }
  });
};

exports.getGamers = function(app) {
  return function(req, res) {
    if (app.session && app.session.authorized) {
      Registration.find(function(err, gamers) {
        if (err) {
          res.send(500, 'Da gabs wohl ein Fehler');
        } else {
          res.send(gamers);
        }
      });
    } else {
      res.send(401);
    }
  };
};

exports.setConfirmed = function(app) {
  return function(req, res) {
    if (app.session && app.session.authorized) {
      Registration.findOneAndUpdate({
        email: req.body.email
      }, {
        confirmed: !req.body.confirmed
      }, function(err) {
        if (err) {
          res.send(500, 'Da gabs wohl ein Fehler');
        } else {
          exports.getGamers(app)(req, res);
        }
      });
    } else {
      res.send(401);
    }
  };
};

exports.deleteGamer = function(app) {
  return function(req, res) {
    if (app.session && app.session.authorized) {
      Registration.findOneAndRemove({
        email: req.body.email
      }, function(err) {
        if (err) {
          res.send(500, 'Da gabs wohl ein Fehler');
        } else {
          exports.getGamers(app)(req, res);
        }
      });
    } else {
      res.send(401);
    }
  };
};
function connect() {
  var q = Q.defer();
  mongoose.connect('mongodb://localhost/lanCamp');
  var db = mongoose.connection;
  db.on('error', function() {
    console.log(arguments);
    q.reject();
  });
  db.once('open', function callback() {
    createSchema();
    q.resolve();
  });
  return q.promise;
}

function createSchema() {
  var schema = mongoose.Schema({
    name: String,
    lastname: String,
    birthday: String,
    comment: String,
    adress: String,
    email: String,
    confirmed: Boolean,
    hash: String
  });
  schema.path('email').index({
    unique: true
  });
  Registration = mongoose.model('Registration', schema);
}

function sendMail(email, hash) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  });
  //}),
  mailOptions = {
    from: 'LanCamp ✔ <registration@lan-camp.ch>', // sender address
    to: email,
    subject: 'LanCamp 16 - Anmeldungbestätigen ✔', // Subject line
    html: 'Bitte bestätige deine Anmeldung mit einem click auf den Link unten.<br><a href=\'http://'+ config.hostname + '/#/confirm/' + hash + '\'>Best&auml;tigungs-link</a>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
}
