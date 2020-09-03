import React, {Fragment} from 'react'

import {
    InputGroup, InputGroupAddon
} from 'reactstrap';

import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';

class FormDatePicker1 extends React.Component {
    
    render() {
        return (
            <Fragment>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </div>
                    </InputGroupAddon>
                    <DatePicker className="form-control"
                                selected={this.props.selected}
                                onChange={this.props.onDateChange}
                                dateFormat="yyy-MM-dd"
                    />
                </InputGroup>
            </Fragment>
        )
    }
}

export default FormDatePicker1;