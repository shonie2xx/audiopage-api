// RPC 
const amqp = require('amqplib/callback_api');

require('dotenv').config();
const amqpUrl = process.env.AMQP_URL;


async function send(book_id_array) {


  amqp.connect(amqpUrl, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    return connection.createChannel(function (error1, channel) {

      if (error1) {
        throw error1;
      }
      channel.assertQueue('', { exclusive: true },
        async function (error2, q) {
          if (error2) {
            throw error2;
          }

          var correlationId = makeid();

          console.log(' [x] Requesting books with id', book_id_array);
          //give book id's here
          channel.sendToQueue('rpc_queue',
            Buffer.from(JSON.stringify(book_id_array)), {
            correlationId: correlationId,
            replyTo: q.queue
          });

          channel.consume(q.queue, function (msg) {
            if (msg.properties.correlationId == correlationId) {


              console.log(' [.] Got %s', msg.content);

              processMsg(msg.content);

              setTimeout(function () {
                connection.close();
                //process.exit(0);
              }, 500);
            }
          }, {
            noAck: true
          });

        });

    });
  });

}


//generate 10 lenght id;
function makeid() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const db = require('../models');
const Audiobook = db.audiobook;


async function processMsg(msg) {

  const arrayAUBooks = JSON.parse(msg);
  console.log(arrayAUBooks);

  arrayAUBooks.map(async function(audiobook){

    const isExist = await Audiobook.findOne({where: {id: audiobook.id }});
        if(isExist){
          const audiobook_model_updated = await Audiobook.update(audiobook, {where: {id: isExist.id}})
        return audiobook_model_updated;
        }
        else{
          const audiobook_new_model = await Audiobook.create(audiobook);
          return audiobook_new_model;        
        }
  });
}
module.exports = { send }