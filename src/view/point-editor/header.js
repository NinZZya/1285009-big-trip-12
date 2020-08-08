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
    type: pointType,
    destination,
    start,
    end,
    price,
    isFavorite,
  } = point;
  return (
    `<header class="event__header">
      ${createTypeListTemplate(pointType)}
      ${createDestinationTemplate(pointType, destination, destinations)}
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
