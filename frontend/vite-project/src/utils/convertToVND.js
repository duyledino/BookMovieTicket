export const convertToVND = (currency) => {
  console.log("currency: ",currency);
  if (!currency || isNaN(currency)) return "0";

  // Chuyển về số nếu là string
  let temp = typeof currency === "string" ? Number(currency) : currency;
  const vnd = "000";
  const final = [];
  let curr = 0;
  while (temp % 1000 !== 0) {
    curr = temp / 1000;
    final.unshift(vnd);
    temp = temp / 1000;
  }
  final.unshift(curr);
  return final.join(",");
};
