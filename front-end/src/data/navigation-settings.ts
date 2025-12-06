import type { links } from "../types";
import {
    User,
    Bolt,
    Image,
    Trash2,
    WalletCards
} from "lucide-react";

export const navigation: links[] = [
    { name: "General", url: "/dashboard/settings/general", icon: Bolt },
    { name: "Profile", url: "/dashboard/settings/profile", icon: User },
    { name: "Image Profile", url: "/dashboard/settings/image-profile", icon: Image },
    { name: "Credit Account", url: "/dashboard/settings/credit-account", icon: WalletCards },
    { name: "Delete Account", url: "/dashboard/settings/delete-account", icon: Trash2 },
]