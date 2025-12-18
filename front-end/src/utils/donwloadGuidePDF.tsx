// utils/downloadShippingGuide.ts
import { pdf } from "@react-pdf/renderer";
import { ShippingGuidePDF } from "@/components/pdf/ShippingGuidePDF";
import type { ShippingGuidePDFData } from "@/types/index";

export const downloadShippingGuidePDF = async (data: ShippingGuidePDFData) => {
  const blob = await pdf(
    <ShippingGuidePDF data={data} />
  ).toBlob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `shipping-guide-${data.order._id}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};
