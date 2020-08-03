import {FILTERS} from '../../const';

const DEFAULT_FILTER = 0;

const createFiltersTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS
        .map((filter, index) => {
          const key = filter.toLowerCase();
          return (
            `<div class="trip-filters__filter">
              <input
                id="filter-${key}"
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
                value="${key}"
                ${index === DEFAULT_FILTER ? `checked` : ``}
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

export {createFiltersTemplate};
