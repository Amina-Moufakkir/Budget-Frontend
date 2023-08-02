import React from 'react';

const FormSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        required
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list &&
          list.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default FormSelect;
