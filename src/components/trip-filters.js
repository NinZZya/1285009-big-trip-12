import {filters} from '../const';

const DEFAULT_FILTER = filters.keys().next().value;

const createTemplateTripFilters = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${Array.from(filters)
        .map(([key, value]) => {
          return (
            `<div class="trip-filters__filter">
              <input
                id="filter-${key}"
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
                value="${key}"
                ${key === DEFAULT_FILTER ? `checked` : ``}
              >
              <label class="trip-filters__filter-label" for="filter-${key}">
                ${value}
              </label>
            </div>`
          );
        })
        .join(`\n`)}
      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>`
  );
};

export {createTemplateTripFilters};
