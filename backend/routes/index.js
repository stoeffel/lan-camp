var mongoose = require('mongoose'),
  config = require('../config.json'),
  Q = require('q'),
  md5 = require('MD5'),
  nodemailer = require('nodemailer'),
  Registration;

connect();

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
      if (config.sendEmail) {
        sendMail(req.body.email, hash);
      } else {
        console.log('no mail send');
      }
      res.send(req.body.email);
    }
  });
};

exports.confirm = function(req, res) {
  console.log('confirm');
  Registration.findOneAndUpdate({hash: req.params.hash}, {confirmed: true}, function(err) {
    if (err) {
      res.send(500, 'Da gabs wohl ein Fehler');
    } else {
      res.send(200);
    }
  });
};

exports.countGamers = function(req, res) {
  Registration.count({confirmed: true}, function(err, count) {
    if (err) {
      res.send(500, 'Da gabs wohl ein Fehler');
    } else {
      res.send(count+"");
    }
  });
};

exports.getGamers = function(req, res) {
  console.log('as');
  Registration.find(function(err, gamers) {
    if (err) {
      res.send(500, 'Da gabs wohl ein Fehler');
    } else {
      res.send(gamers);
    }
  });
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
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  }),
    mailOptions = {
      from: 'LanCamp ✔ <registration@lan-camp.ch>', // sender address
      to: email,
      subject: 'LanCamp 14 - Anmeldungbestätigen ✔', // Subject line
      html: 'Bitte bestätige deine Anmeldung mit einem click auf den Link unten. <a href=\'http://127.0.0.1:3000/confirm/' + hash + '\'>lan-camp.ch/confirm/' + hash + '</a>'
    };

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}
