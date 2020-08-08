const formatter = new Intl.DateTimeFormat([], {
  year: `2-digit`,
  month: `numeric`,
  day: `numeric`,
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
  timeZone: `UTC`
});

const convertToPrintDate = (date) => formatter.format(date).replace(`,`, ``);
const convertToShortDateWithDash = (value) => {
  const date = new Date(value);
  let month = `` + (date.getMonth() + 1);
  let day = `` + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = `0` + month;
  }

  if (day.length < 2) {
    day = `0` + day;
  }

  return [year, month, day].join(`-`);
};

export {
  convertToPrintDate,
  convertToShortDateWithDash,
};
