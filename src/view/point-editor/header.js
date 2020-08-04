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

const createTripEventEditorHeaderTemplate = (currentType, destinations) => {
  return (
    `<header class="event__header">
      ${createTypeListTemplate(currentType)}
      ${createDestinationTemplate(currentType, destinations)}
      ${createTimeTemplate()}
      ${createPriceTemplate()}
      ${createSaveButtonTemplate()}
      ${createCancelButtonTemplate()}
      ${createFavoriteTemplate()}
      ${createRollupButtonTemplate()}
    </header>`
  );
};

export {createTripEventEditorHeaderTemplate};
