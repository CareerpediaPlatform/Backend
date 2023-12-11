export const Counter = (prop) => {
  const totalLength = Object.keys(prop).filter(
    (key) => prop[key] !== ""
  ).length;
  return totalLength;
};
