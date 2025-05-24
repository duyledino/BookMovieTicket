const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const standardWeekDay = () => {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    days.push({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }
  const toDate = ({ day, month, year }) => new Date(year, month - 1, day);
  const sorted = [...days].sort((a, b) => toDate(a) - toDate(b));
  console.log(sorted);
  const finalDays = sorted.map((s) => {
    let day = toDate(s);
    return weekday[day.getDay()];
  });
  console.log(finalDays);
  return finalDays;
};

const getSaleDetail=(arrayWeekDay,totalArray)=>{
    const tempArr = [...arrayWeekDay];
    const tempTotal = [...totalArray].reverse();
    console.log(tempTotal);
    console.log(tempArr);
    const finalTotal = [];
    const days = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      days.push({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
    const toDate = ({ day, month, year }) => new Date(year, month - 1, day);
    const sorted = [...days].sort((a, b) => toDate(a) - toDate(b));
    console.log(sorted);
    for(let i=0,j=0;i<sorted.length;i++){
        const d1 = toDate(sorted[i]);
        if(tempArr.some(d=> toDate(d).getTime() === d1.getTime())){
            finalTotal.push(tempTotal[j]);
            j++;
        }else{
            finalTotal.push(0);
        }
    }
    return finalTotal;
}

export { standardWeekDay,getSaleDetail };
