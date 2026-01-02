import type { links } from "../types";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
} from "lucide-react";

export const navigation: links[] = [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Products", url: "/dashboard/products", icon: Package },
    { name: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { name: "Customers", url: "/dashboard/customers", icon: Users },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
]