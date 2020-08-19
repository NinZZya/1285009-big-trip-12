import AbstractView from '../abstract';

const convertToTitle = (value) => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.toLocaleString(`en-us`, {month: `short`});

  return `${month} ${day}`;
};

const getDayInfoTemplate = ({dayCount, date}) => {
  return (
    `<div class="day__info">
      <span class="day__counter">${dayCount}</span>
      <time class="day__date" datetime=${date}>
        ${convertToTitle(date)}
      </time>
    </div>`
  );
};

const createDayTemplate = (dayData) => {
  return (
    `<li class="trip-days__item  day">
    ${dayData.isCountRender ? getDayInfoTemplate(dayData) : `<div class="day__info"></div>`}
    </li>`
  );
};

class DayView extends AbstractView {
  constructor(dayData) {
    super();
    this._dayData = dayData;
  }

  getTemplate() {
    return createDayTemplate(this._dayData);
  }
}

export default DayView;
