import { NotificationsType } from "@/utils/notificationType";
import { User } from "lucide-react";
import type { ElementType } from "react";
import { z } from "zod";
export type links = {
    name: string,
    icon: ElementType,
    url: string,
    exact?: boolean;
}
export type linksProfile = Pick<links, "name" | "url" | "icon"> & {
    description: string
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

/** Delivery Status */
export const deliveryStatus = {
    PENDING_CONFIRMATION: "pending confirmation",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    OUT_FOR_DELIVERY: "out for delivery",
    ARRIVED_AT_HUB: "arrived at local hub",
    DELIVERED: "delivered",
    CANCELED: "canceled",
    RETURNED: "returned",
    DELIVERY_ATTEMPT_FAILED: "delivery attempt failed",
} as const;

export type DeliveryStatus = typeof deliveryStatus[keyof typeof deliveryStatus];
export const updateDeliveryStatus = Object.values(deliveryStatus).filter(
    (method) => method !== deliveryStatus.PENDING_CONFIRMATION
);

/** Cards Schema  */
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
export type DefaultCardResponse = {
  card: Card[number];
};
export type CardSet = {
    card: {
        _id: Card[number]["_id"],
        lastNumbers: Card[number]["lastNumbers"],
        cvv: Card[number]["cvv"],
        expirationDate: Card[number]["expirationDate"],
        type_target: Card[number]["type_target"],
        default: Card[number]["default"]
    }[]
}
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
        enabled: z.boolean(),
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
    cardInfo: {
       payment_method_id: string
    }
}

/** Orders Type */
export const orderSchema = z.object({
    orders: z.array(
        z.object({
            _id: z.string(),
            user: z.object({
                name: z.string(),
                last_name: z.string(),
                email: z.string(),
                address: z.string(),
                image: z.string(),
                cp: z.number(),
                city: z.string(),
                phone_number: z.string(),
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
export type OrdersPFD =
    Pick<Order, '_id' | 'total_amount'> & {
        user: Pick<Order['user'], 'name' | 'last_name' | 'address' | 'cp' | 'city' | 'phone_number'>;
        products: {
            product: Pick<
                Order['products'][number]['product'],
                'name' | 'brand' | 'price'
            >;
            quantity: Order['products'][number]['quantity'];
        }[];
    };

/** Shipping Guide */
export const shippingGuideSchema = z.array(
    z.object({
        _id: z.string(),
        guideNumber: z.string(),
        owner: z.string(),
        buyer: z.string(),
        comments: z.string(),
        references: z.string(),
        totalAmount: z.number(),
        shippingDate: z.coerce.date()
    })
);

export type ShippingGuide = z.infer<typeof shippingGuideSchema>;
export type ShippingGuides = ShippingGuide[];
export type ShippingGuideFormData = Pick<ShippingGuide[number], 'guideNumber' | 'buyer' | 'comments' | 'references' | 'totalAmount'>;

export type ShippingGuidePDFData = {
    order: OrdersPFD;
    shippingDate: string;
    comments: string;
    references: string;
    totalAmount: number;
};


/** Chat and Message */
export const chatSchema = z.object({
    chats: z.array(
        z.object({
            _id: z.string(),
            seller: z.object({
                _id: z.string(),
                name: z.string(),
                last_name: z.string(),
                email: z.string().email(),
                role: z.string(),
                image: z.string().url().optional(),
                phone_number: z.string().optional(),
            }),
            buyer: z.object({
                _id: z.string(),
                name: z.string(),
                last_name: z.string(),
                email: z.string().email(),
                role: z.string(),
                image: z.string().url().optional(),
                phone_number: z.string().optional(),
            }),
            order: z.object({
                createdAt: z.coerce.date(),
                products: z.array(
                    z.object({
                        name: z.string(),
                        price: z.number(),
                        quantity: z.number(),
                    })
                ),
            }),
            lastMessage: z.string(),
            lastMessageAt: z.coerce.date(),
            unreadBy: z.enum(["buyer", "seller"]),
            isActive: z.boolean(),
        })
    ),
});

export type Chat = z.infer<typeof chatSchema>["chats"][number];
export type Chats = Chat[];

export const messagesSchema = z.object({
    messages: z.array(
        z.object({
            _id: z.string(),
            sender: z.object({
                name: z.string(),
                last_name: z.string(),
                image: z.string(),
            }),
            senderRole: z.enum(["buyer", "seller"]),
            content: z.string(),
            isRead: z.boolean(),
            createdAt: z.coerce.date()
        })
    )
})

export type Message = z.infer<typeof messagesSchema>["messages"][number];
export type Messages = Message[];

export type MessageFormData = Pick<Message, 'senderRole' | 'content' | 'isRead'> & { sender: string, chat: string };

/** Stats */
export const statsSchema = z.array(
    z.object({
    title: z.string(),
    count: z.number(),
    description: z.string()
})
)
export type Stat = z.infer<typeof statsSchema>[number];
export type Stats = z.infer<typeof statsSchema>;
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
/** Charts Types */
export const chartsMainSchema = z.object({
    labels: z.array(z.string()),
    series: z.object({
        revenue: z.array(z.number()),
        orders: z.array(z.number())
    })
})
export type ChartsMain = z.infer<typeof chartsMainSchema>;

export const actualSalesSchema = z.object({
    labels: z.array(z.string()),
    series: z.array(z.number())
})
export type ActualSales = z.infer<typeof actualSalesSchema>;