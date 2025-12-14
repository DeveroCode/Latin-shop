import { pdf } from "@react-pdf/renderer";
import type { OrdersPFD, User } from "../types";
import { OrdersPDF } from "@/components/pdf/OrdersPDF";

export const donwloadPDF = async (orders: OrdersPFD[], user: User) => {
  const blob = await pdf(
    <OrdersPDF orders={orders} user={user} />
  ).toBlob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ordenes-compra.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};
