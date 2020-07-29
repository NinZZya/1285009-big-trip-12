import {offers} from '../../../const';

const PHOTOS_COUNT = 5;

const createEditEventDetails = () => {
  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers
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
            .join(`\n`)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.
        </p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${Array(PHOTOS_COUNT)
              .fill(``)
              .map((_, index) => `<img class="event__photo" src="img/photos/${index + 1}.jpg" alt="Event photo">`)
              .join(`\n`)}
          </div>
        </div>
      </section>
    </section>`
  );
};

export {createEditEventDetails};
