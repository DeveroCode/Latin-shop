import { NotificationsType } from "@/utils/notificationType";
import { User } from "lucide-react";
import type { ElementType } from "react";
import { z } from "zod";
export type links = {
    name: string,
    icon: ElementType,
    url: string
}

export type ResponseMessage = {
    message: string;
}

/** Roles accepted */
export const roles = ["buyer", "seller"] as const;
export type UserRole = (typeof roles)[number];

/** Payments methods */
export const methods = {
    CASH: "cash",
    DEBIT_CARD: "debit card",
    CREDIT_CARD: "credit card",
    LATIN_CARD: "latin card"
} as const;

export type PaymentMethods = typeof methods[keyof typeof methods];

export const cards_types = {
    VISA: "visa",
    MASTERCARD: "mastercard",
    AMEX: "amex",
    DISCOVER: "discover",
    JCB: "jcb",
    DINERSCLUB: "dinersclub",
    UNKNOWN: "unknown"
}

export type CardsTypes = typeof cards_types[keyof typeof cards_types];
export type TargetType = Exclude<PaymentMethods, "cash">;
/** Selected type target  */
export const selectableMethods = Object.values(methods).filter(
    (method) => method !== methods.CASH
);


export const CardsSchema = z.array(
    z.object({
        _id: z.string(),
        lastNumbers: z.string(),
        cvv: z.string(),
        expirationDate: z.string(),
        type_target: z.string(),
        default: z.boolean()
    })
);

export type Card = z.infer<typeof CardsSchema>;

export type AddCard = Pick<Card[number], 'lastNumbers' | 'cvv' | 'expirationDate' | 'type_target'> & { user: string }

/** Users */
export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string().optional(),
    email: z.string(),
    role: z.enum(roles),
    image: z.string().optional(),
    phone_number: z.string().optional(),
    address: z.string().optional(),
    cp: z.number().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export type userRegisterForm = Pick<User, | 'name' | 'email' | 'role'> & {
    password: string;
    password_confirm: string;
};

export type UserUpdateForm = Pick<User, 'role' | 'name' | 'last_name' | 'email' | 'phone_number' | 'address' | 'cp' | 'city' | 'country'>;

export type userLoginForm = Pick<User, | 'email'> & {
    password: string;
};

/** Categories */
export const categorySchema = z.array(
    z.object({
        _id: z.string(),
        name: z.string(),
    }));

export type Category = z.infer<typeof categorySchema>;
/** Product */
export const productSchema = z.array(
    z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        brand: z.string(),
        category: z.object({
            _id: z.string(),
            name: z.string(),
        }),
        images: z.array(z.string()),
        countInStock: z.number(),
    })
);

export type Product = z.infer<typeof productSchema>;
export type ProductFormData = {
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    countInStock: number;
    user: string;
}
export type UpdloadProductImages = {
    images: File[];
}


export type ProductCartItem = Pick<Product[number], '_id' | 'name' | 'price' | 'images' | 'countInStock'> & {
    quantity: number;
}

/** Shopping cart */
export type ShoppingCart = {
    products: {
        product: Product[number]['_id'],
        quantity: number,
        price: Product[number]['price'],
    }[],
    total_amount: number,
    is_payment: boolean,
    payment_method: PaymentMethods
}

/** Orders Type */
export const orderSchema = z.object({
    orders: z.array(
        z.object({
            _id: z.string(),
            user: z.object({
                name: z.string(),
                last_name: z.string(),
                email: z.string()
            }),
            products: z.array(
                z.object({
                    product: z.object({
                        name: z.string(),
                        brand: z.string(),
                        images: z.array(z.string()),
                        price: z.number()
                    }),
                    quantity: z.number(),
                    price: z.number(),
                    _id: z.string()
                })
            ),
            total_amount: z.number(),
            is_payment: z.boolean(),
            createdAt: z.coerce.date()
        })
    )
})

export type Order = z.infer<typeof orderSchema>["orders"][number];
export type Orders = Order[];

/** Notifications */
export const notificationsSchema = z.object({
    notifications: z.array(
        z.object({
            _id: z.string(),
            type: z.enum(NotificationsType),
            title: z.string(),
            message: z.string(),
            orderId: z.string(),
            createdAt: z.coerce.date()
        })
    )
});


export type Notification = z.infer<typeof notificationsSchema>["notifications"][number];
export type Notifications = Notification[];
