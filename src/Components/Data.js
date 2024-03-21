import React from "react";
import './Data.css';

const Data = ({ label, value, onChange ,placeholder}) => {
  return (
    <div className="input-box">
      <label className="input-field">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Data;