import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60,
  },
  Datelabel: {
    width: 30,
  },
});

const InvoiceNo = ({ invoice }) => {
  const unixTime = invoice.createdOn
  const dateObject = new Date(unixTime);

  const humanDateFormat = dateObject.toLocaleString('en-GB', {
    timeZone: 'UTC',
  });
  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Invoice No:</Text>
        <Text style={styles.invoiceDate}>{invoice.order_no}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.Datelabel}>Date:</Text>
        <Text style={styles.invoiceDate}>{humanDateFormat}</Text>
      </View>
    </Fragment>
  );};

export default InvoiceNo;
