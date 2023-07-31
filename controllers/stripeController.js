const stripe = require("stripe")(process.env.STRIPE_KEY);
const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = async () => {
    // verify using values in db the amount of money.
    // because in front-end things can be manipulated.
    // back-end verification is required
    // this is demo project so ignoring it

    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "INR",
  });

  console.log(paymentIntent);

  res({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
