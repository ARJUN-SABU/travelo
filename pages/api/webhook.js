import { buffer } from "micro";
import { MongoClient } from "mongodb";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

const fullFillOrder = async (session) => {
  console.log("Fullfilling order ", session);

  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  db.collection(session.customer_details.email)
    .insertOne({
      hotel_name: session.metadata.titles,
      amount: session.amount_total / 100,
    })
    .then((result) =>
      console.log(`Success: Order ${session.id} has been added to the DB`)
    )
    .catch((err) => console.log(`create-booking-error => ${err}`));
};

export default async (req, res) => {
  if (req.method === "POST") {
    //The steps below are to verify that the current
    //POST request is coming from stripe and
    //not from somewhere else. That is, we'll generate
    //a certificate for this request information and
    //we'll verify whether this certificate actually
    //belongs to stripe.

    //to get the req as buffer of information
    //that is, a section of information
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    //signature for the certificate
    const sig = req.headers["stripe-signature"];

    let event;

    //verify that the current event is coming from stripe
    //by using payload, signature and endpointSecret
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR ", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    //After the above steps, if there's no err, that means the current
    //event is coming from stripe. Now, read below.

    //So, whenever the payment is completed, an event called
    //checkout.session.completed event is fired by stripe. So,
    //we'll recieve that event and try to handle it, that is,
    //Handle the checkout.session.completed event here.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fullfill the order, that is, do
      //whatever you want with these order details.
      //In this case, we'll be storing the order data
      //in the database.
      return fullFillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

//a few more configuration to add to make this work
export const config = {
  api: {
    bodyParser: false, //we want a stream of information and not parsed object.
    externalResolver: true, //things will be resolved on the stripe end (i.e, externally)
  },
};
