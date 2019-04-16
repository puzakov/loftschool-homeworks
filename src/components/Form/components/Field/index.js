import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Field = ({ name, title, type, error, onChange }) => {
  const [value, setValue] = useState('');

  useEffect(() => onChange(value, name), [value]); 

  return (
    <p className="field">
      <label className="field__label" htmlFor={name}>
        <span className="field-label">{title}</span>
      </label>
      <input
        className={`field__input field-input t-input-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <span className={`field__error field-error t-error-${name}`}>
        {error}
      </span>
    </p>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Field;
