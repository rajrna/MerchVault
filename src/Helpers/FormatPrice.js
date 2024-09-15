const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 2,
  }).format((price / 100) * 1.6);
};

export default FormatPrice;
