const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")(process.env.REACT_APP_STRIPESK);

// 1) App Config
const app = express();

// 2) Middlewares
app.use(cors());
app.use(express.json());

// 3) API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  cors()(request, response, async () => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // Ok - created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
});

// 4) Listener Command
exports.api = functions.https.onRequest(app);
