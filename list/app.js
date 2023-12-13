var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mydb_test");

var listSchema = mongoose.Schema({
 text : String,
 task : String,
 dateA : String,
 dateC: String
});

var List = mongoose.model("elements", listSchema);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// creating a new element in the list
app.post("/list", async function(req, res) {
  var text = req.body.text;
  var task = req.body.task;
  //var dateA = new Date(req.body.dateA);
  var dateA = req.body.dateA;
  var dateC = req.body.dateC;
  console.log(text);
try {
    var doc = await List.create({text:text, task: task, dateA : dateA, dateC: dateC});
    res.json({id:doc._id});
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// retrieving list of elements
app.get("/list", async function(req, res) {
  try {
    var elements = await List.find();
    res.json({elements:elements});
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// modifying an element in the list
app.put("/list", async function(req, res) {
  try {
    const id = req.body.id;
    const updateFields = {};

    // Check and update specific fields based on what is received from the client
    if (req.body.text) {
      updateFields.text = req.body.text;
    }
    if (req.body.task) {
      updateFields.task = req.body.task;
    }
    if (req.body.dateA) {
      updateFields.dateA = req.body.dateA;
    }
    if (req.body.dateC) {
      updateFields.dateC = req.body.dateC;
    }

    // Update the document with the dynamically constructed fields
    await List.updateOne({ _id: id }, updateFields).exec();
    res.send(); // close the connection to the browser
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.delete("/list", async function(req, res) {
  try {
    var id = req.body.id;
    console.log(req.body.id);
    await List.deleteOne({ _id: id }).exec(); // await the deletion operation
    res.send(); // close the connection to the browser
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;