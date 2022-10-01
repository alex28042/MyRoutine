import express from "express";
import Stripe from "stripe";

const app = express()
const port = 3000
const PUBLISHABLE_KEY = "pk_test_51LiOtxKEbbYpdkJ18XhgKkboyB14CkI4T5kXZUzyBEp44T6pJRFz66N1vIujoGBkFNppOXSQ8oGUIRwl4ZXq4LFN00R0flZlpg"
const SECRET_KEY = "sk_test_51LiOtxKEbbYpdkJ1bSGiqXTdl77TIx8QWA2iuY4Lt2MWOQxAzzITUVVh9SQ2WjDOANVFfDR6hzBjRU8A3PMSOiBC00MuCiyE4i"
const stripe = new Stripe(SECRET_KEY)


app.listen(port, () => {
    console.log("listening form port " + port)
})

app.post("/create-payment-intent", async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2,
            currency: "usd",
            payment_method_types: ["card"],
        })

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        })
    } catch (e) {
        console.log(e.message)
        res.json({error: e.message})
    }
})