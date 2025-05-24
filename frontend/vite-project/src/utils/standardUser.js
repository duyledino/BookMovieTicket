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

const getSum = (countArray) => {
  const tempArr = [...countArray];
  console.log(tempArr);
  const sum = tempArr.reduce((pre, cur) => (cur += pre), 0);
  console.log(sum);
  return sum;
};

const getMax = (countArray) => {
  const tempArr = [...countArray];
  const max = tempArr.reduce((pre, cur) => (cur < pre ? pre : cur), tempArr[0]);
  return max;
};

// TODO: fix get 6 month earliest to now
const standardMonthUser = () => {
  const tempMonth = [];
  const date = new Date();
  const monthNow = date.getMonth()+1;
  for (let i = 0; i < 12 && tempMonth.length < 6; i++) {
    let month = monthNow - i;
    if (month <= 0) month += 12;
    tempMonth.push(month);
  }
  const sortMonth = tempMonth.reverse();
  const finalMonth = sortMonth.map((month) => monthNames[month - 1]);
  return finalMonth;
};

const standardCount = (monthArray, countArray) => {
  const tempMonth = [];
  const date = new Date();
  const monthNow = date.getMonth()+1;
  console.log(monthNow);
  for (let i = 0; i < 12 && tempMonth.length < 6; i++) {
    let month = monthNow - i;
    if (month <= 0) month += 12;
    tempMonth.push(month);
  }
  const sortMonth = tempMonth.reverse();
  const curMonth = [...monthArray];
  const tempTotal = [...countArray];
  console.log(sortMonth);
  console.log(curMonth);
  console.log(tempTotal);
  const finalCount = [];
  for(let i=0,j=0;i<sortMonth.length;i++){
    if(curMonth.includes(sortMonth[i].toString())){
      finalCount.push(tempTotal[j]);j++;
    }else{
      finalCount.push(0);
    }
  }
  return finalCount;
};

export { standardMonthUser, standardCount, getSum, getMax };
