import {createOffersTemplate} from './create-offers-template';
import {createDestinationTemplate} from './create-destination-template';

export const createDetailsTemplate = (data, destinations) => {
  const {offers, destination} = data;

  return (
    `<section class="event__details">
      ${createOffersTemplate(offers)}
      ${destination ? createDestinationTemplate(data, destinations) : ``}
    </section>`
  );
};
