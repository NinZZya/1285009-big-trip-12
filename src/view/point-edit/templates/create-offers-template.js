const isOfferIncluded = (offers, currentOffer) => {
  return offers.reduce((isInclude, offer) => isInclude || offer.title === currentOffer.title, false);
};

export const createOffersTemplate = (data, offers) => {
  const {type} = data;
  const typeOffers = offers[type];

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">
        Offers
      </h3>
      <div class="event__available-offers">
        ${typeOffers
          .map((offer, index) => {
            const {title, price} = offer;

            return (
              `<div class="event__offer-selector">
                <input
                  class="event__offer-checkbox visually-hidden"
                  id="event-offer-${type}-${index}"
                  data-title="${title}"
                  data-price="${price}"
                  type="checkbox" name="event-offer-${type}"
                  ${isOfferIncluded(data.offers, offer) ? `checked` : ``}
                >
                 <label class="event__offer-label" for="event-offer-${type}-${index}">
                  <span class="event__offer-title">
                    ${title}
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
