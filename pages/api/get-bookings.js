import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let client = new MongoClient(MONGODB_URI);
    await client.connect();
    let db = client.db(MONGODB_DB);

    console.log(req.body);

    const bookings = await db
      .collection(req.body.collectionName)
      .find()
      .toArray();
    //   console.log(bookings);
    res.status(200).json({ bookings });
  }
}
