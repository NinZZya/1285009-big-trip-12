import AbstractView from '../abstract';
import {FilterType} from '../../const';

const FILTERS = Object.values(FilterType);

const createFiltersTemplate = (activeFilter = FilterType.EVERYTHING) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS
        .map((filter) => {
          const key = filter.toLowerCase();
          return (
            `<div class="trip-filters__filter">
              <input
                id="filter-${key}"
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
                value="${key}"
                ${filter === activeFilter ? `checked` : ``}
              >
              <label class="trip-filters__filter-label" for="filter-${key}">
                ${filter}
              </label>
            </div>`
          );
        })
        .join(``)}
      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>`
  );
};

export default class Filters extends AbstractView {
  getTemplate() {
    return createFiltersTemplate();
  }
}
