import {createOffersTemplate} from './create-offers-template';
import {createDestinationTemplate} from './create-destination-template';

export const createDetailsTemplate = (pointData) => {
  const {destination, renderedOffers} = pointData;

  return (
    `<section class="event__details">
      ${renderedOffers.length > 0 ? createOffersTemplate(renderedOffers) : ``}
      ${destination.name !== `` ? createDestinationTemplate(destination) : ``}
    </section>`
  );
};
