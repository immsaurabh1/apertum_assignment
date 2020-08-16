import React from "react";
const loaderStyle = {
  loaderContainer: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.7,
    height: "100%",
    width: "100%",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loaderText: {
    fontSize: "20px",
    color: "white",
    fontWeight: "500"
  }
};
const Loader = props => {
  return props.showLoader ? (
    <div style={loaderStyle.loaderContainer}>
      <span style={loaderStyle.loaderText}>
        {props.loaderMessage || "Loading ..."}
      </span>
    </div>
  ) : null;
};

export default Loader;
