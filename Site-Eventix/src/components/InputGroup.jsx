import React from "react";

export const InputGroup = ({
  type = "text",
  placeholder,
  value,
  onChange,
  isValid,
  showToggle,
  show,
  toggle,
}) => (
  <div className="inputgroup">
    <input
      type={showToggle && !show ? "password" : type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={isValid ? "input-valid" : "input-error"}
      required
    />
    {showToggle && (
      <span className="eye-icon" onClick={toggle}>
        {show ? "👁️" : "🔒"}
      </span>
    )}
  </div>
);
