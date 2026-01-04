import { stripe } from "../config/stripe";

export interface CardInfo {
  payment_method_id: string;
   customer_id: string;
}

export async function processStripeCardPayment(amount: number, cardInfo: CardInfo) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "mxn",
      payment_method: cardInfo.payment_method_id,
      customer: cardInfo.customer_id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never"
      }
    });

    return {
      success: paymentIntent.status === "succeeded",
      id: paymentIntent.id,
      status: paymentIntent.status,
    };

  } catch (error: any) {
    console.error("Stripe error:", error.message);
    return { success: false, message: error.message };
  }
}
