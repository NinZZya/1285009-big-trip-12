import AbstractView from '../abstract';
import {SORTS} from './data';

const DEFAULT_SORT = 0;
const SORT_ICON = (
  `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path
      d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"
    />
  </svg>`
);

const createSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">
        Day
      </span>

      ${Array.from(SORTS)
        .map((sort, index) => {
          const key = sort.toLowerCase();
          return (
            `<div class="trip-sort__item  trip-sort__item--${key}">
              <input
                id="sort-${key}"
                class="trip-sort__input  visually-hidden"
                type="radio" name="trip-sort"
                value="sort-${key}"
                ${key === DEFAULT_SORT ? `checked` : ``}
              >
              <label class="trip-sort__btn" for="sort-${key}">
                ${sort}
                ${index === DEFAULT_SORT ? `` : SORT_ICON}
              </label>
            </div>`
          );
        })
        .join(``)}

        <span class="trip-sort__item  trip-sort__item--offers">
          Offers
        </span>
    </form>`
  );
};

class SortView extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}

export default SortView;
