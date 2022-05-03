const client = require('../../database.js').connection();
const dotenv = require("dotenv")
const bcrypt = require('bcrypt');

dotenv.config({ path: process.cwd() + './../.env' })

module.exports = (req, res, next) => {
    const credentials = req.headers['x-access-token']
    if (!credentials) {
        res.status(401).send({ message: 'No credentials provided' })
    }
    else {
        const user = JSON.parse(credentials)
        client.connect().then(() => {
            client.db("cbd").collection("users").findOne({ 'email': user.email }).then((result) => {
                if (result === null) {
                    res.status(401).send({
                        message: 'Credentials are wrong'
                    });
                } else {
                    bcrypt.compare(user.password, result.password, function (err, result2) {
                        if (err) {
                            console.log(err);
                            res.status(500).send({
                                message: 'Internal server error'
                            });
                        } else {
                            if (result2) {
                                req.verifiedUserID = user.id;
                                next();
                            } else {
                                res.status(401).send({
                                    message: 'Credentials are wrong'
                                });
                            }
                        }
                    });
                }
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'Credentials are wrong'
                });
            }
            );
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Error connecting to database'
            });
        }
        );
    }
}
