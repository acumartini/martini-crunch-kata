import { MartiniCrunchKataPage } from './app.po';

describe('martini-crunch-kata App', function() {
  let page: MartiniCrunchKataPage;

  beforeEach(() => {
    page = new MartiniCrunchKataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
