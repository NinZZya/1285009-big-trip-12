import {
  ControlsView,
  TabsView,
  NewPointButtonView,
} from './view/';

import {
  TripPresenter,
  FilterPresenter,
  InfoPresenter,
  StatisticsPresenter,
} from './presenter';

import {TripModel, FilterModel} from './model';
import {RenderPosition, render} from './utils/dom';
import Api from './api';
import {TabItem, UpdateType} from './const';

const AUTHORIZATION = `Basic K5MGq4Ma5mbffTogkBUBv`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const {
  BEFORE_BEGIN,
  BEFORE_END,
} = RenderPosition;

const api = new Api(END_POINT, AUTHORIZATION);

const tripModel = new TripModel();

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);

const controlsView = new ControlsView();
render(tripMainElement, controlsView, BEFORE_END);

const tabsView = new TabsView();
render(controlsView.getFilterEventsHeaderElement(), tabsView, BEFORE_BEGIN);

const newPointButtonView = new NewPointButtonView();
render(tripMainElement, newPointButtonView, BEFORE_END);

const bodyContainerElement = document.querySelector(`.page-main`).querySelector(`.page-body__container`);
const tripEventsElement = bodyContainerElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, tripModel, filterModel, api);
const filterPresenter = new FilterPresenter(controlsView, tripModel, filterModel);
const infoPresenter = new InfoPresenter(tripMainElement, tripModel, filterModel);
const statisticsPresenter = new StatisticsPresenter(bodyContainerElement, tripModel, filterModel);

const newPointButtonClickHandler = () => {
  newPointButtonView.disable();
  tripPresenter.createPoint(() => {
    newPointButtonView.enable();
  });
};

newPointButtonView.disable();
newPointButtonView.setClickHandler(newPointButtonClickHandler);

const tabsClickHandler = (activeTab) => {
  statisticsPresenter.changeMode(activeTab);

  switch (activeTab) {
    case TabItem.TABLE:
      tripPresenter.init();
      statisticsPresenter.destroy();
      break;
    case TabItem.STATS:
      tripPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

tripPresenter.init();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints()
])
  .then((values) => {
    const [destinations, offers, points] = values;

    tripModel.setDestinations(destinations);
    tripModel.setOffers(offers);
    tripModel.setPoints(UpdateType.INIT, points);

    tabsView.setClickHandler(tabsClickHandler);
    newPointButtonView.enable();

    filterPresenter.init();
    infoPresenter.init();
  })
  .catch(() => {
    tripModel.setError(UpdateType.ERROR);
  });
