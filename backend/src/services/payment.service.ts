import { processStripeCardPayment } from "../lib/processStripeCardPayment";

export async function handlePayment(payment_method: string, amount: number, cardInfo?: any) {
  switch (payment_method) {

    case "cash":
      return {
        success: true,
        reference: "CASH-" + Date.now()
      };

    case "debit card":
    case "credit card":
      if (!cardInfo) {
        return { success: false, message: "Faltan los datos de la tarjeta" };
      }

      const payment = await processStripeCardPayment(amount, cardInfo);

      if (!payment.success) {
        return { success: false, message: payment.message };
      }

      return {
        success: true,
        reference: payment.id
      };

    case "latin card":
      if (!cardInfo || cardInfo.number !== "9999-9999-9999-9999") {
        return { success: false, message: "Tarjeta LatinCard rechazada" };
      }

      return {
        success: true,
        reference: "LATIN-" + Date.now()
      };

    default:
      return {
        success: false,
        message: "Método no soportado"
      };
  }
}
