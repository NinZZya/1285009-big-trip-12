import {
  createTypeListTemplate,
  createDestinationTemplate,
  createTimeTemplate,
  createPriceTemplate,
  createSaveButtonTemplate,
  createResetButtonTemplate,
  createFavoriteTemplate,
  createRollupButtonTemplate,
} from './header-templates';

export const createTripEventEditHeaderTemplate = (data, destinations, isAddMode) => {
  const {
    type,
    destination,
    start,
    end,
    price,
    isFavorite,
    isDestinationError,
  } = data;

  const isDisabled = isDestinationError;

  return (
    `<header class="event__header">
      ${createTypeListTemplate(type)}
      ${createDestinationTemplate(type, destination, destinations)}
      ${createTimeTemplate({start, end})}
      ${createPriceTemplate(price)}
      ${createSaveButtonTemplate(isDisabled)}
      ${createResetButtonTemplate(isAddMode)}
      ${createFavoriteTemplate(isFavorite)}
      ${createRollupButtonTemplate()}
    </header>`
  );
};
