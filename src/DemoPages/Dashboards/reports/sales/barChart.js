import React, {Component, Fragment} from 'react';
import Chart from 'react-apexcharts'


import classnames from 'classnames';

import {

    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    CardBody,
    CardFooter
} from 'reactstrap';
import CountUp from 'react-countup';

import {
    faCalendar,
    faCashRegister
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default class MinimalDashboard2 extends Component {
                
                   state = {
                     popoverOpen1: false,
                     activeTab: '2',
                   };


                 componentDidMount() {
                   this.setState({
                     optionsMixedChart: {
                       ...this.state.optionsMixedChart,
                       labels: this.props.xLabels,
                     },
                   });
                 }

                 togglePop1 = () => {
                   this.setState({
                     popoverOpen1: !this.state.popoverOpen1,
                   });
                 }

                 toggle = (tab) => {
                   if (this.state.activeTab !== tab) {
                     this.setState({
                       activeTab: tab,
                     });
                   }
                 }

                 render() {
                   console.log(this.props.xLabels);
                   const state = {
                     optionsMixedChart: {
                       chart: {
                         height: 350,
                         type: 'line',
                         stacked: false,
                       },
                       stroke: {
                         width: [0, 2, 5],
                         curve: 'smooth',
                       },
                       plotOptions: {
                         bar: {
                           columnWidth: '50%',
                         },
                       },
                       fill: {
                         opacity: [0.85, 0.25, 1],
                         gradient: {
                           inverseColors: false,
                           shade: 'light',
                           type: 'vertical',
                           opacityFrom: 0.85,
                           opacityTo: 0.55,
                           stops: [0, 100, 100, 100],
                         },
                       },
                       //List of keys
                       labels: this.props.xLabels,
                       markers: {
                         size: 0,
                       },
                       xaxis: {
                         type: 'string',
                       },
                       yaxis: {
                         title: {
                           text: 'Number of orders',
                         },
                         min: 0,
                       },
                       tooltip: {
                         shared: true,
                         intersect: false,
                         y: {
                           formatter: function(y) {
                             if (typeof y !== 'undefined') {
                               return y.toFixed(0) + 'orders';
                             }
                             return y;
                           },
                         },
                       },
                     },
                     seriesMixedChart: [
                       {
                         name: 'Orders',
                         type: 'column',
                         // list of the lengthof orders
                         data: this.props.yLabels,
                       },
                     ],
                   };

                    const monthly = {
                      optionsMixedChart: {
                        chart: {
                          height: 350,
                          type: 'line',
                          stacked: false,
                        },
                        stroke: {
                          width: [0, 2, 5],
                          curve: 'smooth',
                        },
                        plotOptions: {
                          bar: {
                            columnWidth: '50%',
                          },
                        },
                        fill: {
                          opacity: [0.85, 0.25, 1],
                          gradient: {
                            inverseColors: false,
                            shade: 'light',
                            type: 'vertical',
                            opacityFrom: 0.85,
                            opacityTo: 0.55,
                            stops: [0, 100, 100, 100],
                          },
                        },
                        //List of keys
                        labels: this.props.monthXlabels,
                        markers: {
                          size: 0,
                        },
                        xaxis: {
                          type: 'string',
                        },
                        yaxis: {
                          title: {
                            text: 'Number of orders',
                          },
                          min: 0,
                        },
                        tooltip: {
                          shared: true,
                          intersect: false,
                          y: {
                            formatter: function(y) {
                              if (typeof y !== 'undefined') {
                                return y.toFixed(0) + 'orders';
                              }
                              return y;
                            },
                          },
                        },
                      },
                      seriesMixedChart: [
                        {
                          name: 'Orders',
                          type: 'column',
                          // list of the lengthof orders
                          data: this.props.monthYlabels,
                        },
                      ],
                    };

                     const Payment = {
                       optionsMixedChart: {
                         chart: {
                           height: 350,
                           type: 'line',
                           stacked: false,
                         },
                         stroke: {
                           width: [0, 2, 5],
                           curve: 'smooth',
                         },
                         plotOptions: {
                           bar: {
                             columnWidth: '50%',
                           },
                         },
                         fill: {
                           opacity: [0.85, 0.25, 1],
                           gradient: {
                             inverseColors: false,
                             shade: 'light',
                             type: 'vertical',
                             opacityFrom: 0.85,
                             opacityTo: 0.55,
                             stops: [0, 100, 100, 100],
                           },
                         },
                         //List of keys
                         labels: this.props.paymentXlabels,
                         markers: {
                           size: 0,
                         },
                         xaxis: {
                           type: 'string',
                         },
                         yaxis: {
                           title: {
                             text: 'Number of orders',
                           },
                           min: 0,
                         },
                         tooltip: {
                           shared: true,
                           intersect: false,
                           y: {
                             formatter: function(y) {
                               if (typeof y !== 'undefined') {
                                 return y.toFixed(0) + 'orders';
                               }
                               return y;
                             },
                           },
                         },
                       },
                       seriesMixedChart: [
                         {
                           name: 'Orders',
                           type: 'column',
                           // list of the lengthof orders
                           data: this.props.paymentYlabels,
                         },
                       ],
                     };
                   return (
                     <Card tabs='true' className='mb-3'>
                       <CardHeader className='tabs-lg-alternate'>
                         <Nav justified>
                           <NavItem>
                             <NavLink
                               href='#'
                               className={classnames({
                                 active: this.state.activeTab === '1',
                               })}
                               onClick={() => {
                                 this.toggle('1');
                               }}
                             >
                               {/* <div className='widget-number'>
                      <CountUp
                        start={0}
                        end={15065}
                        separator=','
                        decimals={0}
                        decimal=''
                        delay={2}
                        prefix='$'
                        duration='10'
                      />
                    </div> */}
                               <div className='tab-subheading'>
                                 <span className='pr-2 opacity-6'>
                                   <FontAwesomeIcon icon={faCalendar} />
                                 </span>
                                 Sales By Day
                               </div>
                             </NavLink>
                           </NavItem>
                           <NavItem>
                             <NavLink
                               href='#'
                               className={classnames({
                                 active: this.state.activeTab === '2',
                               })}
                               onClick={() => {
                                 this.toggle('2');
                               }}
                             >
                             
                               <div className='tab-subheading'>
                                 Sales By Month
                               </div>
                             </NavLink>
                           </NavItem>
                           <NavItem>
                             <NavLink
                               href='#'
                               className={classnames({
                                 active: this.state.activeTab === '3',
                               })}
                               onClick={() => {
                                 this.toggle('3');
                               }}
                             >
                               <div className='tab-subheading'>
                                 <span className='pr-2 opacity-6'>
                                   <FontAwesomeIcon icon={faCashRegister} />
                                 </span>
                                 Sales by payment type
                               </div>
                             </NavLink>
                           </NavItem>
                         </Nav>
                       </CardHeader>
                       <TabContent activeTab={this.state.activeTab}>
                         <TabPane tabId='1'>
                           <CardBody>
                             <Chart
                               options={state.optionsMixedChart}
                               series={state.seriesMixedChart}
                               type='line'
                               width='100%'
                               height='330px'
                             />
                           </CardBody>
                         </TabPane>
                         <TabPane tabId='2'>
                           <Chart
                             options={monthly.optionsMixedChart}
                             series={monthly.seriesMixedChart}
                             type='line'
                             width='100%'
                             height='330px'
                           />
                         </TabPane>
                         <TabPane tabId='3'>
                           <Chart
                             options={Payment.optionsMixedChart}
                             series={Payment.seriesMixedChart}
                             type='line'
                             width='100%'
                             height='330px'
                           />
                         </TabPane>
                       </TabContent>
                     </Card>
                   );
                 }
               }