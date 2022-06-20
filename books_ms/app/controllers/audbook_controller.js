const db = require('../models');
const Audiobook = db.audiobooks;

const amqpService = require('../service/amqp_direct');


exports.getAll = async (req, res, next) => {
    try {
        const allAudios = await Audiobook.findAll();
        //if(allAudios.length > 0)
        return res.status(200).json(allAudios);
        //else
        //return res.status(200).json("Not audiobooks in the market");
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        console.log("USER ID : " + req.userId);
        const audiobook = await Audiobook.findByPk(req.params.id);
        return res.status(200).json(audiobook);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.createOne = async (req, res, next) => {
    try {
        const audiobook_model = {
            publisherId: req.userId,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price
        }
        try {
            const item = await Audiobook.create(audiobook_model);
            console.log("book published");
            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.updateOne = async (req, res, next) => {

    try {
        const audiobook_model = {
            description: req.body.description,
            price: req.body.price }

        //check if book author is userId==
        const book_to_update = await Audiobook.findOne({ where: { id: req.params.id } });
        if (book_to_update.publisherId == req.userId) {
            const audiobook_model_updated = await Audiobook.update(audiobook_model, { where: { id: book_to_update.id } });

            return res.status(200).json(audiobook_model_updated);
        }
        return res.status(403).json("Not authorized to update this book");
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const audiobook = await Audiobook.destroy({ where: { id: req.params.id } })
        return res.status(200).json(audiobook);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// User buy product -> send book to library.
exports.buyOne = async (req, res, next) => {
    const audbook = await Audiobook.findByPk(req.params.id);

    if (audbook) {
        amqpService.publisher(audbook.id, req.userId);
        return res.status(200).json(audbook);
    }
    else {
        return res.status(404).json("Book not found");
    }

}

exports.getMyPublished = async (req, res, next) => {
    try {
        const mypublished_books = await Audiobook.findAll({ where: { publisherId: req.userId } });
        return res.status(200).json(mypublished_books);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
