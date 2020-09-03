import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import getAllDomains from '.../../actions/domains/domains';
import getAllStores from '.../../actions/stores/getAllStoresAction';
import Modal from './switchDomain';

import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

import ReactTable from 'react-table';



class Domains extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.getAllDomains();
    this.props.getAllStores();
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const data = this.props.Domains.domains;
    return (
      <Fragment>
        <Modal
          subs={this.props.Stores.stores}
          toggle={this.toggle}
          modal={this.state.isOpen}
        />
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <PageTitle
              tag='Switch store domain to an existing domain'
              toggle={this.toggle}
              useCase='Switch Store Domain'
              data_tut='save_store'
              heading='Domain'
              subheading='Domain management'
              icon='pe-7s-global icon-gradient bg-ripe-malin'
              cancle={this.cancle}
            />
          </div>
          <Row>
            <Col md='12'>
              <Card className='main-card mb-3'>
                <CardBody>
                  <ReactTable
                    data={data}
                    columns={[
                      {
                        columns: [
                          {
                            Header: 'Domain Name',
                            headerStyle: {
                              margin: '0 auto',
                            },
                            accessor: 'url',
                            style: {
                              textAlign: 'center',
                              display: 'inline',
                              margin: '0 auto',
                            },
                          },
                        ],
                      },
                    ]}
                    defaultPageSize={10}
                    className='-striped -highlight'
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllDomains: () => dispatch(getAllDomains()),
  getAllStores: () => dispatch(getAllStores()),
});
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(Domains);
