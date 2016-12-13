import { MartiniCrunchKataPage } from './app.po';
import {} from 'jasmine';


describe('martini-crunch-kata App', function() {
  let page: MartiniCrunchKataPage;

  beforeEach(() => {
    page = new MartiniCrunchKataPage();
  });

  it('should render 8 graph nodes', () => {
    page.navigateTo();
    expect(page.getGraphNodes().count()).toEqual(8, '8 graph nodes rendered')
  });

  it('should render 21 leaf nodes', () => {
    page.navigateTo();
    expect(page.getLeafNodes().count()).toEqual(21, '21 leaf nodes rendered')
  });

  it('should render 3 crunch balls', () => {
    page.navigateTo();
    expect(page.getCrunchBalls().count()).toEqual(3, '3 crunch rendered')
  });

});
