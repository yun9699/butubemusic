const {MongoClient} = require ('mongodb');
const Input = require ('./input')

const uri = process.env.DB_ATLAS_URL;
const client = new MongoClient(uri);


async function read_top100() {
  try {
    await client.connect();
    const result = await client.db("butube").collection("MUSIC").find({ music_rank: { $exists: true } }).toArray();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
}

read_top100();