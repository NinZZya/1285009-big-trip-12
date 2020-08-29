import {createOffersTemplate} from './create-offers-template';
import {createDestinationTemplate} from './create-destination-template';

export const createDetailsTemplate = (data, offers) => {
  const {destination} = data;

  return (
    `<section class="event__details">
      ${data.offers.length > 0 ? createOffersTemplate(data, offers) : ``}
      ${destination ? createDestinationTemplate(destination) : ``}
    </section>`
  );
};
