import {createOffersTemplate} from './create-offers-template';
import {createDestinationTemplate} from './create-destination-template';

export const createDetailsTemplate = (data, offers) => {
  const {destination, type} = data;

  return (
    `<section class="event__details">
      ${offers[type].length > 0 ? createOffersTemplate(data, offers) : ``}
      ${destination ? createDestinationTemplate(destination) : ``}
    </section>`
  );
};
