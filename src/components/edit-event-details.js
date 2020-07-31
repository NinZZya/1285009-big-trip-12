import {OFFERS} from '../data';

const createEditEventOffersTemplate = () => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${OFFERS
          .map((offer) => {
            const {key, name, price} = offer;

            return (
              `<div class="event__offer-selector">
                <input
                  class="event__offer-checkbox  visually-hidden"
                  id="event-offer-${key}-1"
                  type="checkbox" name="event-offer-${key}"
                >
                 <label class="event__offer-label" for="event-offer-${key}-1">
                  <span class="event__offer-title">
                    ${name}
                  </span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">
                    ${price}
                 </span>
                </label>
              </div>`
            );
          })
          .join(``)}
      </div>
    </section>`
  );
};

const createEditEventDetailsTemplate = () => {
  return (
    `<section class="event__details">
      ${createEditEventOffersTemplate()}
    </section>`
  );
};

export {createEditEventDetailsTemplate};
