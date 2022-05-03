const dotenv =  require("dotenv")
const { MongoClient } = require("mongodb")

require("dotenv").config();

const connection = () => {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    return client;
};

module.exports = { connection };