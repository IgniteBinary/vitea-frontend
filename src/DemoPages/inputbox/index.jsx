/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types';

const InputBox = ({classes, label, placeholder,name,
   type, onchange, inputValue, required, error}) => {
    return (
      <div className={`${classes} 'form-group'`}>
        <label htmlFor="exampleInputEmail1">{label}</label>
        <input
          type={type}
          name={name}
          className="form-control" 
          aria-describedby="emailHelp" 
          placeholder={placeholder}
          onChange={onchange}
          value={inputValue}
          required={required}
        />
        <div className={error?'text-danger': 'd-none'}>Invalid Input</div>
      </div>
    )
}
InputBox.propTypes = {
    classes: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
}
export default InputBox



