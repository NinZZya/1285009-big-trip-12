const PHOTOS_COUNT = 5;

const createAddEventDestinationTemplate = () => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.
      </p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${new Array(PHOTOS_COUNT)
            .fill(``)
            .map((_, index) => `<img class="event__photo" src="img/photos/${index + 1}.jpg" alt="Event photo">`)
            .join(``)}
        </div>
      </div>
    </section>`
  );
};

export {createAddEventDestinationTemplate};
