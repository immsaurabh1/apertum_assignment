import React from "react";
import { buttonStyle } from "../../../style.js";
import PropTypes from "prop-types";
const Button = props => {
  return (
    <button
      data-testid="btn-cmp"
      {...props}
      style={{
        ...buttonStyle,
        ...props.style
      }}
      onClick={props.action}
    >
      {props.title || "Button"}
    </button>
  );
};
Button.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string
};
export default Button;
