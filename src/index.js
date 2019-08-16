// Archivo nodejs-express para inicializar servidor

// Variables y constantes
var createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var indexRouter = require('./routes/index');
const fs = require('fs');
const Busboy = require('busboy');

// Settings

app.set('port', process.env.PORT || 8082);
app.set('host', process.env.HOST || '0.0.0.0');

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.use('/', indexRouter);

//Static files

app.use(express.static(path.join(__dirname,'public')));
app.use('/:anything',express.static(path.join(__dirname,'public')));

//Receive images
app.post('/images', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join(__dirname+'/public/images/', filename);
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    console.log('Upload complete');
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'),app.get('host'),()=>{
  console.log('Web page on port '+app.get('port') + " on host " + app.get('host'));
})