import React from "react";
import PropTypes from "prop-types";
const imgStyle = {
  image: {
    height: "70px"
  }
};
const ImgContainer = props => {
  return (
    <img
      style={{ ...imgStyle.image, ...props.style }}
      src={props.src}
      alt={props.alt}
    />
  );
};

ImgContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
export default ImgContainer;
