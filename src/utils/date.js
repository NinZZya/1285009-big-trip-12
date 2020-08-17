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

export const convertNumberOfDate = (value) => String(value).padStart(2, `0`);
export const convertToDateWithDash = (date) => formatter.format(date).replace(`,`, ``);
export const formatDateHhMm = (date) => formatterHhMm.format(date);
export const formatDateYyyyMmDdWithDash = (value) => new Date(value).toISOString().split(`T`)[0];

export const diffDate = (date1, date2) => {
  const subValue = ((+date1) - (+date2));
  const day = Math.floor(subValue / DAY);
  const hour = Math.floor((subValue - day * DAY) / HOUR);
  const minute = Math.floor((subValue - day * DAY - hour * HOUR) / MINUTE);
  return {day, hour, minute};
};
