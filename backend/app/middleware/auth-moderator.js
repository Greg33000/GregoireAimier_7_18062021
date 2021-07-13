const bdd = require("../models");
const User = bdd.user;
const Role = bdd.role;
const jwt = require('jsonwebtoken');
const config = require("../config/auth-config.js");


module.exports = (req, res, next) => {
    try {
        const token = req.get('x-access-token');
        const decodedToken = jwt.verify(token, config.secretToken);
        const username = decodedToken.username;
        var roleVerified = false;

        // verify the role of the user : MODERATOR is needed
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if (!user) {
                throw 'Invalid user role';
            } else {
                user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name.toUpperCase() == "MODERATOR") {
                            roleVerified = true;
                        }
                    }
                    if (roleVerified == false) {
                        throw 'Invalid user role';
                    } else {
                        next();
                    }
                })
            }
        })
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
