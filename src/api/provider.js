import {nanoid} from 'nanoid';
import {extend} from '../utils/utils';
import {TripModel} from '../model/';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
     .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return extend(acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
         .then((destinations) => {
           this._store.setDestinations(destinations);
           return destinations;
         });
    }

    const storeDestinations = this._store.getDestinations();

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
         .then((offers) => {
           this._store.setOffers(TripModel.adaptOffersToServer(offers));
           return offers;
         });
    }

    const storeOffers = Object.values(this._store.getOffers());

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (Provider.isOnline()) {
      return this._api.getPoints()
         .then((points) => {
           const items = createStoreStructure(points.map(TripModel.adaptPointToServer));
           this._store.setPoints(items);
           return points;
         });
    }

    const storePoints = Object.values(this._store.getPoints());

    return Promise.resolve(storePoints.map(TripModel.adaptPointToClient));
  }

  updatePoint(point) {
    if (Provider.isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setPoint(updatedPoint.id, TripModel.adaptPointToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setPoint(point.id, TripModel.adaptPointToServer(extend(point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (Provider.isOnline()) {
      return this._api.addPoint(point)
         .then((newPoint) => {
           this._store.setPoint(newPoint.id, TripModel.adaptPointToServer(newPoint));
           return newPoint;
         });
    }

    const localNewPointId = nanoid();
    const localNewPoint = extend(point, {id: localNewPointId});

    this._store.setPoint(localNewPoint.id, TripModel.adaptPointToServer(localNewPoint));

    return Promise.resolve(localNewPoint);
  }

  deletePoint(point) {
    if (Provider.isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removePoint(point.id));
    }

    this._store.removeItem(point.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storePoints = Object.values(this._store.getPoints());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.getPoints(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
