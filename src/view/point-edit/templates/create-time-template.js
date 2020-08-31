import {formatDateYyyyMmDdHhMmWithDash} from '../../../utils/date';

export const createTimeTemplate = ({start, end}) => {
  const timeStart = formatDateYyyyMmDdHhMmWithDash(start);
  const timeEnd = formatDateYyyyMmDdHhMmWithDash(end);

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value="${timeStart}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text" name="event-end-time"
        value="${timeEnd}"
      >
    </div>`
  );
};
