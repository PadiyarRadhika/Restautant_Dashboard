export const Colors = {
  primaryColor: "#20BBFF",
  secondaryColor: "#0E85FF",
  white: "#FFFFFF",
  darkTangerine: "#FFA222",
  placeholderText: "#787E8C",
  greyLight: "#b2bbd2",
  border: "#d7dae2",
  textinputBg: "#D7D7D7",
  warningColor: "#ff6269"
};

export function getColorWithOpacity(hex, opacity) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
  return result;
}
