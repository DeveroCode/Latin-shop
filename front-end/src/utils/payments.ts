import type { PaymentMethods } from "../types";

export interface PaymentMethodsUi {
    method: PaymentMethods;
    name: string;
    image: string;
}

export const payments: PaymentMethodsUi[] = [
    {
        method: "cash",
        name: "Cash",
        image: "/payments/oxxo_payment.png"
    },
    {
        method: "debit card",
        name: "Debit Card",
        image: "/payments/debit_card.png"
    },
    {
        method: "credit card",
        name: "Credit Card",
        image: "/payments/credit_card.png"
    }
]