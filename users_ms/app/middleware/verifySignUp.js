const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = async (req, res, next) => {
    try {
        console.log("post req");
        let user = await User.findOne({
            where: { username: req.body.username }
        });
        if (user) {
            console.log(user);
            return res.status(400).send({ message: "Username already in use." });
        }
        next();
    } catch (err) {
        console.log("error from duplicate username");
        return res.status(500).send({
            message: "Unable to validate username."
        }).json(err);
    }
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        console.log("yes there are roles in the database");
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsername,
    checkRolesExisted
};

module.exports = verifySignUp;