import {createOffersTemplate} from './create-offers-template';
import {createDestinationTemplate} from './create-destination-template';

export const createDetailsTemplate = (pointData) => {
  const {destination, renderOffers} = pointData;

  return (
    `<section class="event__details">
      ${renderOffers.length > 0 ? createOffersTemplate(renderOffers) : ``}
      ${destination.name !== `` ? createDestinationTemplate(destination) : ``}
    </section>`
  );
};
