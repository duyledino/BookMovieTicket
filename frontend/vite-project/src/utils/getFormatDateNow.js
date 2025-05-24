import { DateTime } from "luxon";

function getFormatDateNow() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
}

function getFormatTime(myDate) {
  console.log(myDate);
  const date = new Date(myDate);
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}

function getDateRespone(myDate) {
  const myDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = DateTime.fromISO(myDate, {
    zone: "UTC",
  }).toJSDate();
  const dateString = date.getDate() + " / " + Number(date.getMonth() + 1);
  const day = myDay[date.getDay()];
  return [dateString, day];
}

function fixFormatDateRespone(dateRes) {
  const dateArr = dateRes.split("T");
  const date = dateArr[0];
  const time = dateArr[1].slice(0, dateArr[1].length - 5);
  console.log();
  return `${date} ${time}`;
}

function fixFormatDate(date) {
  const dateArr = date.split("T");
  console.log(date);
  console.log(dateArr);
  let correctTime;
  if (dateArr.length === 1) {
    correctTime = "00:00:00";
  } else {
    if(dateArr[1].includes("Z")){
      correctTime = dateArr[1].slice(0,8);
    }
    else correctTime = dateArr[1];
  }
  console.log(dateArr[1]);
  console.log(date + "-----------------" + dateArr[1]);
  const correctDate = dateArr[0];
  console.log(correctTime);
  // console.log(date,dateArr,`${dateArr[0]} ${dateArr[1]}:00`);
  return `${correctDate} ${correctTime}`;
}

export {
  getFormatDateNow,
  fixFormatDate,
  fixFormatDateRespone,
  getDateRespone,
  getFormatTime,
};
