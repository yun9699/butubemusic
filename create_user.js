const {MongoClient} = require ('mongodb');

const uri = process.env.DB_ATLAS_URL;
const client = MongoClient(uri);