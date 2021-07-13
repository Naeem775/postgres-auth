const express = require('express');
const { Sequelize } = require('sequelize');
const users = require('./Routes/user');


const db = require('./config/db')
  
  db.authenticate()
  .then(() => console.log('Connected To DB Successfully'))
  .catch(err => console.log('error while connecting', err));
        


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', users);

const port = 3000;

app.listen(port, console.log(`server is listening on port: ${port}`))