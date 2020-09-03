import React, { Component, Fragment } from 'react';
import { Row, Col, CardHeader, Container, Card } from 'reactstrap';

import CountUp from 'react-countup';

class PaymentsReports extends Component {
  render() {
    const {
      totalAmountPaid,
      todayPayments,
      thisMonthPayments,
      amountWithdrawn,
      balance,
    } = this.props;
    return (
      <Fragment>
        <Container fluid>
          <Card className='mb-3'>
            <CardHeader className='card-header-tab z-index-6'>
              <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                <i className='header-icon lnr-charts icon-gradient bg-happy-green'>
                  {' '}
                </i>
                Payments
              </div>
              {/* <div className='btn-actions-pane-right text-capitalize'>
                <span className='d-inline-block ml-2' style={{ width: 200 }}>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                </span>
              </div> */}
            </CardHeader>
            <Row className='no-gutters'>
              <Col sm='6' md='6' xl='6'>
                <div className='card no-shadow rm-border bg-transparent widget-chart text-left'>
                  <div className='icon-wrapper rounded-circle'>
                    <div className='icon-wrapper-bg opacity-9 bg-info' />
                    <i className='lnr-exit-up text-white' />
                  </div>
                  <div className='widget-chart-content'>
                    <div className='widget-subheading'>Total amount paid</div>
                    <div className='widget-numbers text-info'>
                      <CountUp
                        start={0}
                        end={totalAmountPaid}
                        separator=','
                        decimals={0}
                        decimal=','
                        prefix='ksh '
                        useEasing={false}
                        suffix=''
                        duration='5'
                      />
                    </div>
                  </div>
                </div>
                <div className='divider m-0 d-md-none d-sm-block' />
              </Col>
              <Col sm='6' md='6' xl='6'>
                <div className='card no-shadow rm-border bg-transparent widget-chart text-left'>
                  <div className='icon-wrapper rounded-circle'>
                    <div className='icon-wrapper-bg opacity-9 bg-success' />
                    <i className='pe-7s-cash text-white' />
                  </div>
                  <div className='widget-chart-content'>
                    <div className='widget-subheading'>
                      Amount paid in today
                    </div>
                    <div className='widget-numbers text-success'>
                      <CountUp
                        start={0}
                        end={todayPayments}
                        separator=','
                        decimals={0}
                        decimal=','
                        prefix='ksh '
                        useEasing={false}
                        suffix=''
                        duration='5'
                      />
                    </div>
                  </div>
                </div>
                <div className='divider m-0 d-md-none d-sm-block' />
              </Col>
            </Row>
            <Row className='no-gutters'>
              <Col sm='12' md='6' xl='6'>
                <div className='card no-shadow rm-border bg-transparent widget-chart text-left'>
                  <div className='icon-wrapper rounded-circle'>
                    <div className='icon-wrapper-bg opacity-9 bg-warning' />
                    <i className='lnr-download text-white' />
                  </div>
                  <div className='widget-chart-content'>
                    <div className='widget-subheading'>
                      Total amount withdrawn
                    </div>
                    <div className='widget-numbers text-warning'>
                      <CountUp
                        start={0}
                        end={amountWithdrawn}
                        separator=','
                        decimals={0}
                        decimal='.'
                        prefix='ksh '
                        useEasing={false}
                        suffix=''
                        duration='7'
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm='12' md='6' xl='6'>
                <div className='card no-shadow rm-border bg-transparent widget-chart text-left'>
                  <div className='icon-wrapper rounded-circle'>
                    <div className='icon-wrapper-bg opacity-9 bg-success' />
                    <i className='pe-7s-cash text-white' />
                  </div>
                  <div className='widget-chart-content'>
                    <div className='widget-subheading'>
                      Amount Paid in this month
                    </div>
                    <div className='widget-numbers text-success'>
                      <CountUp
                        start={0}
                        end={thisMonthPayments}
                        separator=','
                        decimals={0}
                        decimal='.'
                        prefix='ksh '
                        useEasing={false}
                        suffix=''
                        duration='7'
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm='12' md='8' xl='8'>
                <div className='card no-shadow rm-border bg-transparent widget-chart text-left'>
                  <div className='icon-wrapper rounded-circle'>
                    <div className='icon-wrapper-bg opacity-9 bg-primary' />
                    <i className='pe-7s-wallet text-white' />
                  </div>
                  <div className='widget-chart-content'>
                    <div className='widget-subheading'>Balance remaining</div>
                    <div className='widget-numbers text-primary'>
                      <CountUp
                        start={0}
                        end={balance}
                        separator=','
                        decimals={0}
                        decimal='.'
                        prefix='ksh '
                        useEasing={false}
                        suffix=''
                        duration='7'
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default PaymentsReports;
