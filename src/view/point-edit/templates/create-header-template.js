import {createTypeListTemplate} from './create-type-list-template';
import {createHeaderDestinationTemplate} from './create-header-destination-template';
import {createTimeTemplate} from './create-time-template';
import {createPriceTemplate} from './create-price-template';
import {createSaveButtonTemplate} from './create-save-button-template';
import {createResetButtonTemplate} from './create-reset-button-template';
import {createFavoriteTemplate} from './create-favorite-template';
import {createRollupButtonTemplate} from './create-rollup-button-template';

export const createHeaderTemplate = (data, destinations, isAddMode) => {
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
      ${createHeaderDestinationTemplate(type, destination, destinations)}
      ${createTimeTemplate({start, end})}
      ${createPriceTemplate(price)}
      ${createSaveButtonTemplate(isDisabled)}
      ${createResetButtonTemplate(isAddMode)}
      ${createFavoriteTemplate(isFavorite)}
      ${createRollupButtonTemplate()}
    </header>`
  );
};
