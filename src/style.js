const fontStandard = "16px";
const fontSmall = "12px";
const base = 8;
const calcBase = n => {
  if (n) {
    return `${n * base}px`;
  }
  return `${base}px`;
};

export const buttonStyle = {
  padding: calcBase(),
  fontSize: fontStandard
};

export const inputStyle = {
  padding: calcBase(),
  fontSize: fontStandard,
  marginBottom: "12px",
  width: "100%",
  boxSizing: "border-box"
};

export const errorStyle = {
  fontSize: fontSmall,
  color: "red"
};
