import moment from 'moment';

const isDate = (date) => date instanceof Date;

export const convertNumberOfDate = (value) => String(value).padStart(2, `0`);
/**
 * @param {date} date
 * @return {date} 17/08/20 18:00
 */
export const formatDateYyyyMmDdHhMmWithDash = (date) => isDate(date) ? moment(date).format(`DD/MM/YY HH:mm`) : ``;

/**
 * @param {date} date
 * @return {date} 2020-08-17T18:00
 */
export const formatDateISODdMmYyyyHhMm = (date) => isDate(date) ? moment(date).format(`YYYY-MM-DD[T]HH:mm`) : ``;

/**
 * @param {date} date1
 * @param {date} date2
 * @return {number} milliseconds
 */
export const diffDate = (date1, date2) => ((+date1) - (+date2));

/**
 * @param {number} ms
 * @return {object} {days: number, hours: number, minutes: number}
 */
export const convertMsToDHM = (ms) => {
  const duration = moment.duration(ms);
  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
  };
};
