import {
  MINUTE,
  HOUR,
  DAY,
} from '../const';

const formatter = new Intl.DateTimeFormat([], {
  year: `2-digit`,
  month: `numeric`,
  day: `numeric`,
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
  timeZone: `UTC`
});

const formatterHhMm = new Intl.DateTimeFormat([], {
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
  timeZone: `UTC`
});

const getPrintValue = (value) => {
  let printValue = `` + value;
  if (printValue.length < 2) {
    return `0${printValue}`;
  }

  return printValue;
};

const convertToDateWithDash = (date) => formatter.format(date).replace(`,`, ``);
const convertToHhMm = (date) => formatterHhMm.format(date);
const convertToShortDateWithDash = (value) => {
  const date = new Date(value);
  const month = getPrintValue(date.getMonth() + 1);
  const day = getPrintValue(date.getDate());
  const year = date.getFullYear();

  return [year, month, day].join(`-`);
};
const diffDate = (date1, date2) => {
  const subValue = ((+date1) - (+date2));
  const day = Math.floor(subValue / DAY);
  const hour = Math.floor((subValue - day * DAY) / HOUR);
  const minute = Math.floor((subValue - day * DAY - hour * HOUR) / MINUTE);
  return {day, hour, minute};
};


export {
  convertToDateWithDash,
  convertToHhMm,
  convertToShortDateWithDash,
  diffDate,
  getPrintValue,
};
