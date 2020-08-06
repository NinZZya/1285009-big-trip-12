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

export {
  convertToPrintDate,
};
