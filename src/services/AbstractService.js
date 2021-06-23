export default class AbstractService {
  constructor() {
    if (this.constructor === AbstractService) {
      throw new TypeError('Abstract class "AbstractService" cannot be instantiated directly');
    }
  }

  extractFromList(itemlist) {
    return itemlist.filter((item) => this.isCorrect(item.url_name) && !this.isIncorrect(item.url_name)).map((item) => item.url_name);
  }

  isCorrect() {
    throw new Error("isCorrect() is not implemented");
  }

  isIncorrect() {
    return false;
  }

  getDefaultList() {
    throw new Error("getDefaultList() is not implemented");
  }
}
