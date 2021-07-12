const bcrypt = require('bcrypt');
const bdd = require("../models");
const User = bdd.user;
const Role = bdd.role;
const jwt = require('jsonwebtoken');
const config = require("../config/auth-config.js");
const Op = bdd.Sequelize.Op;
const cryptoJS = require("crypto-js");


exports.signup = (req, res, next) => {

    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                email: cryptoJS.SHA1(req.body.email).toString(),
                password: hash,
                username: req.body.username.toLowerCase(),
            };
            User.create(user)            
            .then(data => {
                // if (req.body.roles) {
                //     Role.findAll({
                //         where: {
                //             name: {
                //                 [Op.or]: req.body.roles
                //             }
                //         }
                //     }).then(roles => {
                //         data.setRoles(roles)
                //         .then(() => {
                //             res.send({ message: "User was registered successfully!" });
                //         });
                //     });
                // } else {
                  // user role = 1
                    data.setRoles([1])
                    .then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                //}
            })
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
        
    


exports.signin = (req, res, next) => {

    User.findOne({
        where: {
          email: cryptoJS.SHA1(req.body.email).toString()
        }
      })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur introuvable !' });
            }
            
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                var token = jwt.sign({ username: user.username }, config.secretToken, {
                    expiresIn: 86400 // 24 hours
                  });
            
                  var authorities = [];
                  user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                      authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                    //   id: user.id,
                        username: user.username,
                        roles: authorities,
                        token: token
                    });
                  });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Delete a Tutorial with the specified id in the request
exports.deleteUser = (req, res) => {
    const username = req.params.id;
  
    User.destroy({
      where: { username: username }
    })
    .then(() => {res.send({message: "User was deleted."})})
    .catch(err => {
        res.status(500).send({
            message: "Could not delete your account"
        });
    });
};

exports.seeUser = (req, res) => {
    const username = req.params.id;
    
    User.findOne({
        where: {
          username: username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        };
        res.status(200).send(user);
    })    
    .catch(error => res.status(500).json({ error }));
};

 