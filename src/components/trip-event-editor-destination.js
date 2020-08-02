const createTripEventEditorDestinationTemplate = (photos) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.
      </p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos
            .map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)
            .join(``)}
        </div>
      </div>
    </section>`
  );
};

export {createTripEventEditorDestinationTemplate};
