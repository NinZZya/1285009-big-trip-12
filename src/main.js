import {
  ControlsView,
  TabsView,
  NewPointButtonView,
  StatisticsView,
} from './view/';

import {TripModel, FilterModel} from './model';
import {TripPresenter, FilterPresenter, InfoPresenter} from './presenter';
import {RenderPosition, render, remove} from './utils/dom';
import {generatePoints} from './mock/points';
import {DESTINATIONS} from './mock/points';
import {TabItem} from './const';

const {
  BEFORE_BEGIN,
  BEFORE_END,
} = RenderPosition;

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

const tripModel = new TripModel();
tripModel.setDestinations(DESTINATIONS);
tripModel.setPoints(points);

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

const tripPresenter = new TripPresenter(tripEventsElement, tripModel, filterModel);

const filterPresenter = new FilterPresenter(controlsView, tripModel, filterModel);
filterPresenter.init();

const infoPresenter = new InfoPresenter(tripMainElement, tripModel, filterModel);
infoPresenter.init();

const newPointButtonElement = newPointButtonView.getElement();
newPointButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  newPointButtonElement.disabled = true;
  tripPresenter.createPoint(() => {
    newPointButtonElement.disabled = false;
  });
});

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

tabsView.setTabsClickHandler(tabsClickHandler);

tripPresenter.init();
