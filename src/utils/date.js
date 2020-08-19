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

export const convertNumberOfDate = (value) => String(value).padStart(2, `0`);
/**
 * @param {date} date
 * @return {date} 17/08/20 18:00
 */
export const formatDateYyyyMmDdHhMmWithDash = (date) => formatter.format(date).replace(`,`, ``);

/**
 * @param {date} date
 * @return {date} 2020-08-17T18:00
 */
export const formatDateISODdMmYyyyHhMm = (date) => date.toISOString().slice(0, 16);

/**
 * @param {date} date1
 * @param {date} date2
 * @return {object} {day: number, hour: number, minutes: number}
 */
export const diffDate = (date1, date2) => {
  const subValue = ((+date1) - (+date2));
  const day = Math.floor(subValue / DAY);
  const hour = Math.floor((subValue - day * DAY) / HOUR);
  const minute = Math.floor((subValue - day * DAY - hour * HOUR) / MINUTE);
  return {day, hour, minute};
};
