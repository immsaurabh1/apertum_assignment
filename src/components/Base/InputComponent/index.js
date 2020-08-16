import React from "react";
import { errorStyle, inputStyle } from "../../../style.js";
const styles = {
  container: {
    width: "100%"
  },
  error: {
    marginTop: "-10px"
  }
};
const Input = props => {
  return (
    <div
      style={{ ...styles.container, ...(props.style && props.style.container) }}
    >
      <input
        data-testid="input-cmp"
        defaultValue={props.value}
        type={props.type}
        style={{ ...inputStyle, ...(props.style && props.style.input) }}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
      {props.error ? (
        <p
          style={{
            ...errorStyle,
            ...styles.error,
            ...(props.style && props.style.error)
          }}
        >
          {props.errorText ? props.errorText : "This is a required field"}
        </p>
      ) : null}
    </div>
  );
};
export default Input;
