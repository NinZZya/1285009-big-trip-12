import {
  ControlsView,
  TabsView,
  NewPointButtonView,
  StatisticsView,
} from './view/';

import {TripModel, FilterModel} from './model';
import {TripPresenter, FilterPresenter, InfoPresenter} from './presenter';
import {RenderPosition, render, remove} from './utils/dom';
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
const tripFilterEventsHeaderElement = controlsView.getFilterEventsHeaderElement();
const tabsView = new TabsView();
render(tripFilterEventsHeaderElement, tabsView, BEFORE_BEGIN);

const newPointButtonView = new NewPointButtonView();
render(tripMainElement, newPointButtonView, BEFORE_END);

const bodyContainerElement = document.querySelector(`.page-main`).querySelector(`.page-body__container`);
const tripEventsElement = bodyContainerElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, tripModel, filterModel, api);
const filterPresenter = new FilterPresenter(controlsView, tripModel, filterModel);
const infoPresenter = new InfoPresenter(tripMainElement, tripModel, filterModel);

const newPointButtonClickHandler = () => {
  newPointButtonView.setDisabled();
  tripPresenter.createPoint(() => {
    newPointButtonView.setEnabled();
  });
};

newPointButtonView.setDisabled();
newPointButtonView.setClickHandler(newPointButtonClickHandler);

let statisticsView = null;

const tabsClickHandler = (activeTab) => {
  switch (activeTab) {
    case TabItem.TABLE:
      tripPresenter.init();
      remove(statisticsView);
      break;
    case TabItem.STATS:
      tripPresenter.destroy();
      statisticsView = new StatisticsView(tripModel.getPoints());
      render(bodyContainerElement, statisticsView, BEFORE_END);
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

    tabsView.setTabsClickHandler(tabsClickHandler);
    newPointButtonView.setEnabled();

    filterPresenter.init();
    infoPresenter.init();
  })
  .catch(() => {
    tripModel.setError(UpdateType.ERROR);
  });
