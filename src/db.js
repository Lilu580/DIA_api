import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://bogdanmaliutawork:qwerty123@cluster0.wzgiw91.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Auth';


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.log(error);
  }
  
}

export function getDB() {
  return client.db(dbName);
}


