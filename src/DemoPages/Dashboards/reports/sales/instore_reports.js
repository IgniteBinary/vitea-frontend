import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import CheckUser from '../../../../helpers/authorization';
import { toast } from 'react-toastify';
import getAllOrders from '../../../../actions/orders/getAllOrdersAction';
import {
  generateXlabes,
  generateYlabes,
  generatePayXlabels,
  generatePayYlabels,
} from './utils';
import Chart from './barChart'
import { data2 } from '../dummy';
export class AnalyticsDashboard extends Component {
         componentDidMount() {
           if (!CheckUser()) {
             toast.error('Your session has expired redirecting to Login');
             window.setTimeout(() => {
               window.location.href = '/';
             }, 4000);
           }
           this.props.getAllOrders();
         }

         orderTotal = (products) => {
           // const total = products.reduce((a,b) => ({price: a.price + b.price}))
           let totalPrice = 0;
           products.map((product) => {
             product.price ? (totalPrice += product.price) : (totalPrice += 0);
           });
           // return total
           return totalPrice;
         };

         checkPaymentStatus = (order) => {
           let status = 'Unpaid';
           let actualPay = 0;
           const totalPrice = this.orderTotal(order.products);
           if (order.payments && order.payments.length > 0) {
             order.payments.forEach((payment) => {
               actualPay += payment.amount;
             });

             if (actualPay >= totalPrice) {
               status = 'Paid';
             } else {
               status = 'Patial';
             }
           }

           return status;
         };
         

         render() {
           const { orders } = this.props.Orders;
           const paidData = orders.filter((order) => {
             return this.checkPaymentStatus(order) === 'Paid';
           });

           const data = paidData.filter((item) => {
             return item.order_type === 'offline'
           })
           console.log(generateXlabes(data), 'Cleanest data');
           const xLabels = generateXlabes(data);
           const yLabels = generateYlabes(data);
           const monthXlabels = generateXlabes(data, {month: 'long'})
           const monthYlabels = generateYlabes(data, { month: 'long' });
           const paymentXlabels = generatePayXlabels(data);
           const paymentYlabels = generatePayYlabels(data);

           console.log(xLabels, 'My xLabels');
           console.log(yLabels, 'My yLabels')

           
           return (
             <Fragment>
               <CSSTransitionGroup
                 component='div'
                 transitionName='TabsAnimation'
                 transitionAppear={true}
                 transitionAppearTimeout={0}
                 transitionEnter={false}
                 transitionLeave={false}
               >
                 <PageTitle
                   heading='Sales Report'
                   subheading='Reports'
                   icon='lnr-chart-bars icon-gradient bg-mean-fruit'
                 />
                 <Chart
                   xLabels={xLabels}
                   yLabels={yLabels}
                   monthXlabels={monthXlabels}
                   monthYlabels={monthYlabels}
                   paymentXlabels={paymentXlabels}
                   paymentYlabels={paymentYlabels}
                 />
               </CSSTransitionGroup>
             </Fragment>
           );
         }
       }

export const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => dispatch(getAllOrders()),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard);
