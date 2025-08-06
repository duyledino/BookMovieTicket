const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const standardMonthRevenue = () => {
  // const currentMonth = [...monthArray];
  const tempMonth = [];
  const date = new Date();
  const monthNow = date.getMonth() + 1;
  for (let i = 0; i < 12 && tempMonth.length < 4; i++) {
    let month = monthNow - i;
    if (month <= 0) month += 12;
    tempMonth.push(month);
  }
  const sortMont = tempMonth.reverse();
  console.log(sortMont);
  const finalMonth = sortMont.map((month) => monthNames[month - 1]);
  return finalMonth;
};

const standardTotalRevenue = (monthArray, totalArray) => {
  const tempMonth = [];
  const date = new Date();
  const monthNow = date.getMonth() + 1;
  for (let i = 0; i < 12 && tempMonth.length < 4; i++) {
    let month = monthNow - i;
    if (month <= 0) month += 12;
    tempMonth.push(month);
  }
  const sortMont = tempMonth.reverse();
  console.log(sortMont);
  const curDate = [...monthArray];
  const curMonth = curDate.map((m) => m.month);
  const tempTotal = [...totalArray].reverse();
  const finalTotal = [];
  for (let i = 0, j = 0; i < sortMont.length; i++) {
    if (curMonth.includes(sortMont[i].toString())) {
      finalTotal.push(tempTotal[j]);
      j++;
    } else finalTotal.push(0);
  }
  return finalTotal;
};

const sumRevenue = (totalArray)=>{
  return totalArray.reduce((pre,cur)=>cur+=pre,0);
}

export { standardMonthRevenue, standardTotalRevenue,sumRevenue };
