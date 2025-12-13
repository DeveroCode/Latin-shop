import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { OrdersPFD } from '@/types/index';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    backgroundColor: '#e10600',
    color: '#fff',
    padding: 4,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#e10600',
    color: '#fff',
    fontWeight: 'bold',
  },
});

type Props = {
  orders: OrdersPFD[];
};

export const OrdersPDF = ({ orders }: Props) => (
  <Document>
    {orders.map(order => (
      <Page key={order._id} size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text>[LOGO]</Text>
          <View>
            <Text style={styles.title}>ORDEN DE COMPRA</Text>
            <Text>OC #: {order._id}</Text>
          </View>
        </View>

        {/* VENDEDOR / ENVÍA */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>VENDEDOR</Text>
            <Text>{order.user.name} {order.user.last_name}</Text>
            <Text>{order.user.address}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>ENVÍA</Text>
            <Text>Bodega</Text>
            <Text>Dirección de bodega</Text>
          </View>
        </View>

        {/* TABLA */}
        <View style={{ marginTop: 16 }}>
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={styles.cell}>DESCRIPCIÓN</Text>
            <Text style={styles.cell}>CANT</Text>
            <Text style={styles.cell}>P/U</Text>
            <Text style={styles.cell}>TOTAL</Text>
          </View>

          {order.products.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.cell}>
                {item.product.name} - {item.product.brand}
              </Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>${item.product.price}</Text>
              <Text style={styles.cell}>
                ${item.quantity * item.product.price}
              </Text>
            </View>
          ))}
        </View>

        {/* TOTAL */}
        <View style={{ marginTop: 12, alignItems: 'flex-end' }}>
          <Text>
            TOTAL: ${order.total_amount}
          </Text>
        </View>
      </Page>
    ))}
  </Document>
);
