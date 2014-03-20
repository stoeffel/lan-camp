/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  config = require('./config.json'),
  http = require('http'),
  path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.secret));
  app.use(express.session());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist', 'index.html')));
  app.use('/styles/fonts', express.static(path.join(__dirname, '..', 'frontend', 'dist', 'icomoon', 'fonts')));
  app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'app', 'images')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.post('/register', routes.register);
app.get('/countGamers', routes.countGamers);
app.get('/getGamers', routes.getGamers(app));
app.post('/setConfirmed', routes.setConfirmed(app));
app.post('/deleteGamer', routes.deleteGamer(app));
app.post('/login', routes.login(app));
app.get('/confirmRegistration/:hash', routes.confirm);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
