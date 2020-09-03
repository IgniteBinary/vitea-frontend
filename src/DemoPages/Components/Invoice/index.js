import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './invoiceTitle';
import BillTo from './billTo';
import InvoiceNo from './invoiceNo';
import InvoiceItemsTable from './invoiceItems';
import InvoiceThankYouMsg from './invoiceThankYouMsg';
import { PDFViewer } from '@react-pdf/renderer';
//import logo from '../../../src/logo.png';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const Order = JSON.parse(localStorage.getItem('orderData'))
const merchant = JSON.parse(localStorage.getItem('user'))

const Invoice = ({ invoice }) => (
<PDFViewer style={{width: "80%" , height: "500px"}}>
  <Document>
    <Page size='A4' style={styles.page}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <InvoiceTitle title='Invoice' />
      <InvoiceNo invoice={Order} />
      <BillTo invoice={Order.customer} />
      <InvoiceItemsTable invoice={Order} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
</PDFViewer>
);

export default Invoice;
