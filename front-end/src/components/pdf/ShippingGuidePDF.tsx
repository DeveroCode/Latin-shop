// components/pdf/ShippingGuidePDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ShippingGuidePDFData } from "@/types/index";
import { formatCurrency } from "@/utils/index";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Helvetica",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    border: "1 solid #000",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    borderRight: "1 solid #000",
    gap: 8,
    alignItems: "center",
  },
  headerRight: {
    width: 140,
    padding: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  sub: {
    color: "#6b7280",
    fontSize: 10,
  },

  guideNumber: {
    borderLeft: "1 solid #000",
    borderRight: "1 solid #000",
    borderBottom: "1 solid #000",
    padding: 6,
    marginBottom: 8,
  },

  /* SECTIONS */
  section: {
    border: "1 solid #000",
    padding: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    marginBottom: 2,
  },

  /* COMMENTS / REFERENCES */
  grid: {
    flexDirection: "row",
    border: "1 solid #000",
  },
  cell: {
    flex: 1,
    padding: 8,
    borderRight: "1 solid #000",
  },
  cellNoBorder: {
    flex: 1,
    padding: 8,
  },

  total: {
    marginTop: 10,
    fontWeight: "bold",
  },
});

type Props = {
  data: ShippingGuidePDFData;
};

export const ShippingGuidePDF = ({ data }: Props) => {
  const { order, comments, references, totalAmount, shippingDate } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src="/logo_blue.png" style={{ width: 32 }} />
            <View>
              <Text style={styles.title}>Shipping Guide</Text>
              <Text style={styles.sub}>latin express</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Text>Shipping date:</Text>
            <Text style={styles.sub}>{shippingDate}</Text>
          </View>
        </View>

        {/* GUIDE NUMBER */}
        <View style={styles.guideNumber}>
          <Text>SHIPPING GUIDE: {order._id}</Text>
        </View>

        {/* DESTINATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination Details</Text>
          <Text style={styles.row}>CP: {order.user.cp}</Text>
          <Text style={styles.row}>City: Chihuahua</Text>
          <Text style={styles.row}>
            Address: {order.user.address}
          </Text>
          <Text style={styles.row}>
            Phone: {order.user.phone_number}
          </Text>
        </View>

        {/* COMMENTS / REFERENCES */}
        <View style={styles.grid}>
          <View style={styles.cell}>
            <Text style={styles.sectionTitle}>Comments</Text>
            <Text>{comments}</Text>
          </View>

          <View style={styles.cellNoBorder}>
            <Text style={styles.sectionTitle}>References</Text>
            <Text>{references}</Text>
          </View>
        </View>

        {/* TOTAL */}
        <Text style={styles.total}>
          Total amount: {formatCurrency(totalAmount)}
        </Text>
      </Page>
    </Document>
  );
};
