import React from "react";

export default function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error
}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? "error" : ""}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}