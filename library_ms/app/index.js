const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const sequelize = require('./utils/database');
//consume msg from books_ms
const amqp_service = require('./service/amqp_direct_service');

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

app.use('/api/library', require('./routes/library_routes'));

(async () => {
  try {
    await sequelize.sync(
      { force: false }
    );
    console.log("db sync complete");
    app.listen(8000);
    try {
      await amqp_service.consume();
      console.log("rabbitmq connect successfuly");
    } catch (err) {
      console.log(err);
    }

  } catch (error) {
    console.log(error);
  }
})()

// (async () => {
//   try {
//     await amqp_service.consume();
//     console.log("rabbitmq connect successfuly");
//   } catch (err) {
//     console.log("rabbitmq error", err)
//   }
// })();
// //test