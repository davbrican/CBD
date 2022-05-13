const client = require('../../database.js').connection();
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

function verifyEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function verifyUser(req, res) {
    if (req.verifiedUserID) { return true; }
    return false
}

module.exports.login = async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        email: email,
        password: password
    }

    if (!email || !password) {
        return res.status(400).json({
            message: 'Some fields are missing'
        });
    }

    if (!verifyEmail(email)) {
        return res.status(400).json({
            message: 'Email is not valid'
        });
    }

    client.connect().then(() => {
        client.db("cbd").collection("users").findOne({ 'email': email }).then((result) => {
            if (result) {
                bcrypt.compare(user.password, result.password, function (err, result2) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            message: 'Internal server error'
                        });
                    } else {
                        if (result2) {
                            res.status(200).send({ user, message: 'Logged in!' });
                        } else {
                            res.status(401).send({
                                message: 'Credentials are wrong'
                            });
                        }
                    }
                });
            } else {
                res.status(409).send({
                    message: 'User already exists'
                });
            };
        }).catch(err => {
            userService.saveFilm(req, res);
            res.status(500).send({
                message: 'Credentials are wrong'
            });
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: 'Error connecting to database'
        });
    });
};

module.exports.signup = async function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    if (!email || !password || !passwordConfirmation) {
        return res.status(400).json({
            message: 'Some fields are missing'
        });
    }

    if (!verifyEmail(email)) {
        return res.status(400).json({
            message: 'Email is not valid'
        });
    }

    if (password !== passwordConfirmation) {
        return res.status(401).json({
            message: 'Passwords are not equal'
        });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Internal server error'
            });
        } else {
            const user = {
                email: email,
                password: hash,
                films: []
            }

            client.connect().then(() => {
                client.db("cbd").collection("users").findOne({ 'email': email }).then((result) => {
                    if (result === null) {
                        client.db("cbd").collection("users").insertOne(user).then((result) => {
                            res.status(200).send({
                                message: 'User signed up'
                            });
                        }).catch(err => {
                            console.log(err)
                            res.status(500).send({
                                message: 'Error signing up user'
                            });
                        });
                    } else {
                        res.status(409).send({
                            message: 'User already exists'
                        });
                    };
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: 'Error signing up user'
                    });
                });
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'Error connecting to database'
                });
            });
        }
    });
};

module.exports.getFilms = async function getFilms(req, res) {
    if (!verifyUser(req)) {
        res.status(401).json({
            message: 'No credentials provided.'
        });
    } else {
        client.connect().then(() => {
            //join films and users by film title
            client.db("cbd").collection("users").aggregate([
                {
                    $lookup: {
                        from: "films",
                        localField: "films",
                        foreignField: "Title",
                        as: "films",
                    }
                }
            ]).toArray().then((result) => {
                result = result.filter(x => x.films.length > 0);
                res.status(200).send({
                    films: result[0]
                });
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'Error getting films'
                });
            }
            );
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Error connecting to database'
            });
        });
    }
}

module.exports.saveFilm = async function saveFilm(req, res) {
    const film = req.params.film;

    client.connect().then(() => {
        client.db("cbd").collection("films").findOne({ 'Title': film }).then((result) => {
            if (result) {
                res.status(200).send({
                    film: film,
                    message: 'Film already saved'
                });
            } else {
                //Collect film data
                axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${film}`).then(response => {
                    const filmData = response.data;
                    if (filmData.Response === 'False') {
                        res.status(404).send({
                            message: 'Film not found'
                        });
                    } else {
                        client.db("cbd").collection("films").insertOne(filmData).then((result) => {
                            res.status(200).send({
                                film: filmData,
                                message: 'Film saved'
                            });
                        }).catch(err => {
                            console.log(err)
                            res.status(500).send({
                                message: 'Error saving film'
                            });
                        });
                    }
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: 'Error saving film'
                    });
                });
            };
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Error saving film'
            });
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: 'Error connecting to database'
        });
    });
}


module.exports.saveFilmInFavs = async function saveFilmInFavs(req, res) {
    if(!verifyUser(req)){
        res.status(401).json({
            message: 'No credentials provided.'
        });
    } else {
        const userId = req.verifiedUserID;
        const film = req.body.film;

        //Collect film data
        // axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${film}`).then(response => {

        client.connect().then(() => {
            client.db("cbd").collection("users").findOne({ '_id': ObjectId(userId) }).then((result) => {
                if (result) {
                    if (result.films.includes(film)) {
                        client.db("cbd").collection("users").updateOne({ '_id': ObjectId(userId) }, { $pull: { films: film } }).then((result) => {
                            res.status(200).send({
                                message: 'Film deleted from favs'
                            });
                        }).catch(err => {
                            console.log(err)
                            res.status(500).send({
                                message: 'Error saving film in favs'
                            });
                        });
                    } else {
                        client.db("cbd").collection("users").updateOne({ '_id': ObjectId(userId) }, { $push: { films: film } }).then((result) => {
                            res.status(200).send({
                                message: 'Film saved in favs'
                            });
                        }).catch(err => {
                            console.log(err)
                            res.status(500).send({
                                message: 'Error saving film in favs'
                            });
                        });
                    }
                } else {
                    res.status(409).send({
                        message: 'Error saving film'
                    });
                };
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'Error saving film'
                });
            });
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Error connecting to database'
            });
        });
    }
}