import moment from "moment-jalaali";

export const generateTimeRange = (startTime: number, endTime: number) => {
  const hours = [];
  for (let i = startTime; i <= endTime; i++) {
    hours.push((i < 10 ? "0" : "") + i + ":00");
  }
  return hours;
};

export const fromNow = (date: Date) => {
  let d = moment(date);
  return d.fromNow();
};

export const getTimeOnly = (date: Date) => {
  let inputDate = moment(date);
  return inputDate.format("HH:mm");
};

export const getPersianDate = (date: Date) => {
  let time = moment(date);
  let m = moment(time.format("YYYY/MM/DD"), "YYYY/MM/DD");
  let dateString = m.format("jYYYY/jMM/jDD");
  return dateString;
};

export const getPersianDateWithMonthInLetters = (date: Date) => {
  let td = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  return td;
};

export const addHoursToDate = (date: Date, hours: number) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};

export const getPersianDateWithTime = (date: Date) => {
  let time = moment(date);
  let m = moment(time.format("YYYY/MM/DD HH:mm"), "YYYY/MM/DD HH:mm");
  let dateString = m.format("jYYYY/jMM/jDD HH:mm");
  return dateString;
};

export const getDateOnly = (date: Date) => {
  let time = moment(date);
  let dateString = time.format("YYYY/MM/DD");
  return dateString;
};
