const convertToTitle = (value) => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.toLocaleString(`en-us`, {month: `short`});

  return `${month} ${day}`;
};

const createDayTemplate = ({dayCount, date, dateTimeFormat}) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime=${dateTimeFormat}>
          ${convertToTitle(date)}
        </time>
      </div>
    </li>`
  );
};

export {createDayTemplate};
