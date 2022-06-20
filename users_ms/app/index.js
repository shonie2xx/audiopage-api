const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const sequelize = require('./utils/database');
//const User = require('./models/users');

//const db = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  next();
})
app.use(cors());
app.use(
  cookieSession({
    name: "auth",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
)

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/authroutes'));

(async () => {
    try {
      await sequelize.sync(
        { force: false }
      );
      console.log("db sync complete ");
      app.listen(8000);
    } catch (error) {
      console.log(error);
    }
})()