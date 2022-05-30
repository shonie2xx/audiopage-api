const db = require('../models');
const Library = db.library;
const Audiobook = db.audiobook;
const client = require('../service/amqp_rpc_client');

exports.getUpdate = async (req, res, next) => {
   
    try{
    
    // get library of user authenticated
    const library_model = await Library.findOne({where: { userId: req.userId}})
    
    // update the library if there are any changes on owned books
    await client.send(library_model.bookIds);
    
    
    // get the updated books
    const audiobooks = await Audiobook.findAll({
        where: { 
            id: [library_model.bookIds]
        }});
      
    return res.status(200).json(audiobooks);
   }
    catch(err){
        console.log(err);
        return res.status(500).json(error);
    }
}


