import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/auth';
const dbName = 'Auth';

let client;

export async function connectToMongoDB() {
  client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to MongoDB');
}

export function getClient() {
  return client;
}

export function getDB() {
  return client.db(dbName);
}
