const amqplib = require('amqplib');

require('dotenv').config();
const amqpUrl = process.env.AMQP_URL;


const db = require('../models');
const Library = db.library;
const { Op } = require("sequelize");


async function consume() {
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60")


  const channel = await connection.createChannel();
  channel.prefetch(10);

  process.once('SIGINT', async () => {
    console.log('got sigint, closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  const queue = 'books.book_to_library';

  await channel.assertQueue(queue), { durable: true };

  await channel.consume(queue, async (msg) => {
    await processMessage(msg);
    await channel.ack(msg);
  }),
  {
    noAck: false,
    consumerTag: 'book_to_library'
  };

  return channel;
}

async function processMessage(msg) {

  //msg parse
  const { bookId, userId } = JSON.parse(msg.content);

  try {
    const library = await Library.findOne({
      where: {
        userId: {
          [Op.eq]: userId
        }
      }
    })
    if (library) {
      console.log("updating");
      var bookId_array = library.bookIds;

      if (!bookId_array.includes(bookId)) {
        bookId_array.push(bookId);
      }

      //create model with the new list
      const library_model = {
        bookIds: bookId_array
      }
      //update library
      const library_module_updated = await Library.update(library_model, { where: { userId: userId } })

    } else {

      console.log("creating library");
      var books = new Array();
      books.push(bookId);

      const library_model = {
        userId: userId,
        bookIds: books
      }
      try {
        const reslibrary = await Library.create(library_model);
      } catch (err) {
      }

    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { consume }