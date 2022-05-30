const express = require('express');
const sequelize = require('./utils/database');
const cookieSession = require('cookie-session');
const app = express();
//rpc_server
const amqp_server = require('./service/amqp_rpc_server');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  next();
})

app.use(
  cookieSession({
    name: "auth",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
)

app.use('/api/books', require('./routes/audiobookroutes'));


(async () => {
  try {
    await sequelize.sync(
      { force: false }
    );
    app.listen(8000);
    
    await amqp_server.replyto(); 

  } catch (error) {
    console.error(error);
  }
})()
