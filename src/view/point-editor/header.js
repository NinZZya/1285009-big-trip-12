import {
  createTypeListTemplate,
  createDestinationTemplate,
  createTimeTemplate,
  createPriceTemplate,
  createSaveButtonTemplate,
  createCancelButtonTemplate,
  createFavoriteTemplate,
  createRollupButtonTemplate,
} from './templates';

const createTripEventEditorHeaderTemplate = (point, destinations) => {
  const {
    type,
    destination,
    start,
    end,
    price,
    isFavorite,
  } = point;
  return (
    `<header class="event__header">
      ${createTypeListTemplate(type)}
      ${createDestinationTemplate(type, destination, destinations)}
      ${createTimeTemplate({start, end})}
      ${createPriceTemplate(price)}
      ${createSaveButtonTemplate()}
      ${createCancelButtonTemplate()}
      ${createFavoriteTemplate(isFavorite)}
      ${createRollupButtonTemplate()}
    </header>`
  );
};

export {createTripEventEditorHeaderTemplate};
