/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Input, FormGroup, Label, Dropdown} from 'reactstrap';
import PropTypes from 'prop-types';

const DropDown = ({label, placeholder, options, name, onChange, itemValue}) => {
    return (
      <FormGroup>
        <Label for="exampleSelect">{label}</Label>
        <Input type="select" name={name} id="exampleSelect" placeholder={placeholder} onChange={onChange}>
          <option value="" disabled selected>{placeholder}</option>
          {options.map((value)=> {
              return (
                <option value={value[itemValue]}>{value.name}</option>
              )
          })}
        </Input>
      </FormGroup>
    )
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,

}
export default DropDown
