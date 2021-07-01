const bcrypt = require('bcrypt');
const bdd = require("../models");
const User = bdd.user;
const Role = bdd.role;
const jwt = require('jsonwebtoken');
const config = require("../config/auth-config.js");
const Op = bdd.Sequelize.Op;
// const cryptoJS = require("crypto-js");

exports.signup = (req, res, next) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                // email: cryptoJS.SHA1(req.body.email).toString(),
                email: req.body.email,
                password: hash
            };
            User.create(user)            
            .then(data => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        data.setRoles(roles)
                        .then(() => {
                            res.send({ message: "User was registered successfully!" });
                        });
                    });
                } else {
                  // user role = 1
                    data.setRoles([1])
                    .then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            })
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
        
    


exports.login = (req, res, next) => {
    User.findOne({
        where: {
          email: req.body.email
        }
      })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                  });
            
                  var authorities = [];
                  user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                      authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                      id: user.id,
                      email: user.email,
                      roles: authorities,
                    //   accessToken: token
                        token: token
                    });
                  });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};