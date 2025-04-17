const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
let _client;
let _db;

/**
 * Establishes a singleton MongoClient and returns both client and db instances.
 * Subsequent calls return the cached instances.
 */
async function connectToDb() {
  if (_db) {
    return { client: _client, db: _db };
  }

  _client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await _client.connect();
  _db = _client.db("BigTask");
  console.log("✅ MongoDB connected");
  return { client: _client, db: _db };
}

module.exports = { connectToDb };

