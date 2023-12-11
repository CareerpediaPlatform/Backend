export const Counter = (prop) => {
const totalLength = Object.keys(prop).filter(key => prop[key] !== "").length;
console.log(totalLength);
  return totalLength
}
