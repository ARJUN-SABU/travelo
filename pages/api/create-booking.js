import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

export default async function handler(req, res) {
  if (req.method == "POST") {
    let client = new MongoClient(MONGODB_URI);
    await client.connect();
    let db = client.db(MONGODB_DB);

    console.log(req.body);

    db.collection(req.body.collectionName)
      .insertOne({
        destination: req.body.destination,
        price: req.body.price,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(`create-booking-error => ${err}`));
  }
}
