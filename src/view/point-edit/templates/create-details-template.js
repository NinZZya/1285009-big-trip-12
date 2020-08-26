import {createOffersTemplate} from './create-offers-template';

export const createDetailsTemplate = (point) => {
  const {offers} = point;
  return (
    `<section class="event__details">
      ${createOffersTemplate(offers)}
    </section>`
  );
};
