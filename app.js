const express = require('express');
const cityRoutes = require('./api/routes/cities');
const bodyparser = require('body-parser');
const app = express();
const morgan =require('morgan');




app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(morgan('dev'));

app.use('/cities', cityRoutes);

module.exports = app;