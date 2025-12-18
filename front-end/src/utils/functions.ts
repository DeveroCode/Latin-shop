import type { Orders, OrdersPFD } from "../types";

export function toOrdersPDF(orders: Orders) : OrdersPFD[] {
    return orders.map(order => ({
        _id: order._id,
        total_amount: order.total_amount,
        user: {
            name: order.user.name,
            last_name: order.user.last_name,
            address: order.user.address,
            cp: order.user.cp,
            city: order.user.city,
            phone_number: order.user.phone_number
        },
        products: order.products.map(p => ({
            product: {
                name: p.product.name,
                brand: p.product.brand,
                price: p.product.price
            },
            quantity: p.quantity
        }))
    }))
}