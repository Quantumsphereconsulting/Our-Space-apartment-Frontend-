export default function (text) {
  return parseFloat(text).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}
