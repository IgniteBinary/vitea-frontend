import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import getAllWithdrawals from '../../../../actions/withdrawals/allWithdrawal';
import getAllOrders from '../../../../actions/orders/getAllOrdersAction';
import {
  getAllAmountPaid,
  todayPayment,
  thisMonthPayment,
  totalAmountWithdrawn,
} from './utils';
import CardReports from './cardReports';

class PaymentsReports extends Component {
  componentDidMount() {
    this.props.getWithdrawals();
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
      return (
        this.checkPaymentStatus(order) === 'Paid' ||
        this.checkPaymentStatus(order) === 'Patial'
      );
    });
    const withdrawals = this.props.Withdrawals.withdrawalls;
    const totalAmountPaid = getAllAmountPaid(paidData);
    console.log(totalAmountPaid);
    const todayPayments = todayPayment(paidData);
    const thisMonthPayments = thisMonthPayment(paidData);
    const amountWithdrawn = totalAmountWithdrawn(withdrawals);
    const balance = this.props.Withdrawals.balance;
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
            toggle={this.toggle}
            heading='Payments Report'
            subheading='Reports'
            icon='pe-7s-cash icon-gradient bg-mean-fruit'
          />
          <CardReports
            totalAmountPaid={totalAmountPaid}
            todayPayments={todayPayments}
            thisMonthPayments={thisMonthPayments}
            amountWithdrawn={amountWithdrawn}
            balance={balance}
          />
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
         getWithdrawals: () => dispatch(getAllWithdrawals()),
         getAllOrders: () => dispatch(getAllOrders()),
       });

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsReports);
