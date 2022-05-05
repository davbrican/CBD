const client = require('../../database.js').connection();

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports.getAll = (req, res) => {
    client.connect().then(() => {
        client.db("cbd").collection("films").find({}).toArray().then((result) => {
            res.send(result);
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Internal server error'
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

module.exports.getByGenre = (req, res) => {
    const genre = req.query.genre;
    client.connect().then(() => {
        client.db("cbd").collection("films").find({"Genre" : new RegExp(escapeRegExp(genre), 'i')}).toArray().then((result) => {
            res.send(result);
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Internal server error'
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

module.exports.getByTitle = (req, res) => {
    const title = req.params.film;
    client.connect().then(() => {
        client.db("cbd").collection("films").findOne({"Title" : title}).then((result) => {
            if(result){
                res.status(200).send(result);
            } else {
                res.status(404).send({
                    message: 'Film not found'
                });
            }
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: 'Internal server error'
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