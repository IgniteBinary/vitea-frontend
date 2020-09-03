import React, {Fragment} from 'react';
import {
    Button
} from 'reactstrap';

export default class WizardStep4 extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="form-wizard-content">
                    <div className="no-results">
                        <div className="sa-icon sa-success animate">
                            <span className="sa-line sa-tip animateSuccessTip"/>
                            <span className="sa-line sa-long animateSuccessLong"/>

                            <div className="sa-placeholder"/>
                            <div className="sa-fix"/>
                        </div>
                        <div className="results-subtitle mt-4">Success !</div>
                        <div className="results-title">Kindly Check your email for the login credentials then proceed to login</div>
                        <div className="mt-3 mb-3"/>
                        <div className="text-center">
                            <Button color="success" size="lg" className="btn-shadow btn-wide" onClick={()=>window.location.href='/'}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
