import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import type { OrdersPFD, User } from '@/types/index';

const PRIMARY_BLUE = '#1e3a8a';
const SECONDARY_BG = '#e5e7eb';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
    borderBottom: '2 solid ' + PRIMARY_BLUE,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 4,
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    textTransform: 'uppercase',
  },
  ocNumber: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 2,
    color: '#4b5563',
  },
  sectionTitle: {
    backgroundColor: PRIMARY_BLUE,
    color: '#fff',
    padding: 6,
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 11,
    textTransform: 'uppercase',
    borderRadius: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  infoBlock: {
    flex: 1,
  },
  infoText: {
    marginBottom: 2,
  },
  tableHeader: {
    backgroundColor: PRIMARY_BLUE,
    color: '#fff',
    fontWeight: 'bold',
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottom: 'none',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  rowEven: {
    backgroundColor: SECONDARY_BG,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  descriptionCell: {
    flex: 3,
  },
  totalBox: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: SECONDARY_BG,
    color: PRIMARY_BLUE,
    width: 200,
    textAlign: 'right',
    borderRadius: 4,
  },
});

type Props = {
  orders: OrdersPFD[];
  user: User;
};

export const OrdersPDF = ({ orders, user }: Props) => (
  <Document>
    {orders.map(order => (
      <Page key={order._id} size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src="/public/logo_blue.png" style={styles.logo} />
            <Text style={styles.logoText}>Latin Shop</Text>
          </View>
          <View>
            <Text style={styles.title}>ORDEN DE COMPRA</Text>
            <Text style={styles.ocNumber}>OC #: {order._id}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>SELLER</Text>
            <Text style={styles.infoText}>{user!.name} {user!.last_name}</Text>
            <Text style={styles.infoText}>{user!.address}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.sectionTitle}>ENVÍA</Text>
            <Text style={styles.infoText}>Bodega Central</Text>
            <Text style={styles.infoText}>Dirección de bodega principal</Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.descriptionCell]}>DESCRIPCIÓN</Text>
            <Text style={styles.cell}>CANT</Text>
            <Text style={styles.cell}>P/U</Text>
            <Text style={styles.cell}>TOTAL</Text>
          </View>

          {order.products.map((item, i) => (
            <View key={i} style={[styles.row, i % 2 === 1 ? styles.rowEven : {}]}>
              <Text style={[styles.cell, styles.descriptionCell]}>
                {item.product.name} - {item.product.brand}
              </Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>${item.product.price.toFixed(2)}</Text>
              <Text style={styles.cell}>
                ${(item.quantity * item.product.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>
            TOTAL: ${order.total_amount.toFixed(2)}
          </Text>
        </View>

        <View style={{ marginTop: 40, borderTop: '1 solid #ccc', paddingTop: 10 }}>
            <Text style={{ fontSize: 9, color: '#6b7280' }}>
                * Esta hoja sirve como resumen de la orden de compra y puede ser entregada al encargado de la logística para fines de validación y despacho.
            </Text>
        </View>
      </Page>
    ))}
  </Document>
);