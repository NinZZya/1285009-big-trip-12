import {createOffersTemplate} from './templates';

const createDetailsTemplate = (point) => {
  const {offers} = point;
  return (
    `<section class="event__details">
      ${createOffersTemplate(offers)}
    </section>`
  );
};

export {createDetailsTemplate};
