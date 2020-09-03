import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>
      {invoice.first_name} {invoice.first_lastname}
    </Text>
    <Text>{invoice.email}</Text>
    <Text>{invoice.msisdn}</Text>
    <Text>
      {'ID'}{" "}
      {invoice.national_id}
    </Text>
  </View>
);

export default BillTo;
