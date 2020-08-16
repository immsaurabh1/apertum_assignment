import React from "react";
import ImgComponent from "../../Base/ImgComponent";
export default function () {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flexStart",
        alignItems: "center",
        paddingLeft: "8px",
        width: "100%",
        boxShadow: "0 5px 5px -4px #b4b4b4"
      }}
    >
      <ImgComponent
        alt={"Appertum Online"}
        src={`https://apertumo.com/images/logo-apertum-online-dark-high-res.png`}
      />
    </div>
  );
}
