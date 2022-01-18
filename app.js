require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teamsRouter = require('./routes/teams');


const app = express();

app.use(logger('dev'));
// youre telling your app to use json middleware
// if it has a url encoded body it adds a 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/teams', teamsRouter);


module.exports = app;
