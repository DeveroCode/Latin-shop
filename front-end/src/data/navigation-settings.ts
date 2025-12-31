import type { linksProfile } from "../types";
import {
  User,
  Image,
  Trash2,
  WalletCards
} from "lucide-react";

export const navigation: linksProfile[] = [
  {
    name: "Profile",
    url: "/dashboard/settings/profile",
    icon: User,
    description:
      "Update your personal profile details, including your name, contact information, and other identifying data."
  },
  {
    name: "Image Profile",
    url: "/dashboard/settings/image-profile",
    icon: Image,
    description:
      "Upload or change your profile image to personalize how your account appears across the platform."
  },
  {
    name: "Credit Account",
    url: "/dashboard/settings/credit-account",
    icon: WalletCards,
    description:
      "Manage your credit account, payment methods, and billing-related information."
  },
  {
    name: "Delete Account",
    url: "/dashboard/settings/delete-account",
    icon: Trash2,
    description:
      "Permanently delete your account and all associated data from the platform."
  }
];
