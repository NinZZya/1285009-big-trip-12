import {extend} from '../utils/utils';


const Key = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};


export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getPoints() {
    return this._getItems()[Key.POINTS];
  }

  getDestinations() {
    return this._getItems()[Key.DESTINATIONS];
  }

  getOffers() {
    return this._getItems()[Key.OFFERS];
  }

  setItem(key, value) {
    const store = this._getItems();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            extend(store, {
              [key]: value,
            })
        )
    );
  }

  setPoint(id, point) {
    const storedPoints = this.getPoints();

    this.setPoints(extend(storedPoints, {
      [id]: point,
    }));
  }

  setPoints(points) {
    this.setItem(Key.POINTS, points);
  }

  setOffers(offers) {
    this.setItem(Key.OFFERS, offers);
  }

  setDestinations(destinations) {
    this.setItem(Key.DESTINATIONS, destinations);
  }

  removePoint(id) {
    const storedPoints = this.getPoints();
    delete storedPoints[id];
    this.setPoints(storedPoints);
  }

  _getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }
}
