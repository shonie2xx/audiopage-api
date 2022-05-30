const db = require('../models/');
const User = db.user;

exports.getAll = async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        console.log(allUsers);
        return res.status(200).json(allUsers);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.createOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
            username: req.body.username,
            passwords: req.body.passwords
        }
        try {
            const user = await User.create(USER_MODEL);
            console.log("user created");
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

exports.updateOne = async (req, res, next) => {
    try{
        const USER_MODEL = {
            username: req.body.username,
            passwords: req.body.passwords
        }
        try{
            const user = await User.update(USER_MODEL, {where: {id: req.params.id} });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    try{
        const user = await User.destroy({where: {id: req.params.id}})
        return res.status(200).json(user);
    }catch (error) {
        return res.status(500).json(error);
    }
}
