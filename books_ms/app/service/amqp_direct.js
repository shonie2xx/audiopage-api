const amqplib = require('amqplib');

//require('dotenv').config();

const amqpUrl = process.env.AMQP_URL;

async function publisher(bId, uId) {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  
  const exchange = 'books.buy';
  const queue = 'books.book_to_library';
  const routingKey = 'audiobook';
    
  await channel.assertExchange(exchange, 'direct', {durable: true});
  await channel.assertQueue(queue, {durable: true});
  await channel.bindQueue(queue, exchange, routingKey);
    
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({
      bookId: bId,
      userId: uId
  })));
  console.log('Message published');
  
  await channel.close();
  await connection.close();
  console.info('Channel and connection closed');
  }

module.exports = {publisher} ;