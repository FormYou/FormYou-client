import React from "react";

const Select = ({ register, options, name, ...rest }) => {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Select;