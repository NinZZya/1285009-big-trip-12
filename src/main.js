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
import {TabItem, UpdateType} from './const';
import Provider from './api/provider';
import Store from './api/store';
import Api from './api/api';

const AUTHORIZATION = `Basic K5MGq4Ma5mbffTogkBUBv`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const {
  BEFORE_BEGIN,
  BEFORE_END,
} = RenderPosition;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const tripPresenter = new TripPresenter(tripEventsElement, tripModel, filterModel, apiWithProvider);
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
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers(),
  apiWithProvider.getPoints()
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
      .then(() => {
        console.log(`ServiceWorker available`); // eslint-disable-line
      }).catch(() => {
        console.error(`ServiceWorker isn't available`); // eslint-disable-line
      });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
