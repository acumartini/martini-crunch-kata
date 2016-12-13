import { browser, element, by } from 'protractor';

export class MartiniCrunchKataPage {

  navigateTo() {
    return browser.get('/');
  }

  getGraphNodes() {
    return element.all(by.className('order-graph-node'));
  }

  getLeafNodes() {
    return element.all(by.className('order-graph-leaf'));
  }

  getCrunchBalls() {
    return element.all(by.className('crunch-ball'));
  }

}
