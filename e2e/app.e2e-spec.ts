import { SootheworldPage } from './app.po';

describe('sootheworld App', function() {
  let page: SootheworldPage;

  beforeEach(() => {
    page = new SootheworldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
