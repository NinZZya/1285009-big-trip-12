import {createOffersTemplate} from './templates';

const createDetailsTemplate = (offers) => {
  return (
    `<section class="event__details">
      ${createOffersTemplate(offers)}
    </section>`
  );
};

export {createDetailsTemplate};
