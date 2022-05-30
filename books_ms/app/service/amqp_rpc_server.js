const amqp = require('amqplib/callback_api');

//require('dotenv').config();

const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';

async function replyto() {

  amqp.connect(amqpUrl, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'rpc_queue';

      channel.assertQueue(queue, {
        durable: false
      });
      channel.prefetch(1);
      console.log('[x] Awaiting RPC requests');
      channel.consume(queue, async function reply(msg) {

        const books = await getBooks(msg.content.toString());
        console.log(books);
        channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(JSON.stringify(books)), {
          correlationId: msg.properties.correlationId
        });

        channel.ack(msg);
      });
    });
  });
}

const db = require('../models');
const Audiobook = db.audiobooks;

//seperate in other service;
async function getBooks(n) {
  
  var ids = n;
  const idsWithoutFirstAndLast = ids.slice(1, -1);

  var idsArr = idsWithoutFirstAndLast.split(',');

  var bookList = [];
  for (var i = 0; i < idsArr.length; i++) {
    const book = await getBook(idsArr[i]);
    bookList.push(book);
  }
  //console.log(bookList);
 
  return bookList;
}

async function getBook(id) {
  try {
    const audiobook = await Audiobook.findOne({
      where: { 
        id: id
      },
      raw: true,
    });
    return audiobook;
  }
  catch (err) {
    console.log(err, "can't find books by id");
  }
}

module.exports = { replyto }