import { GoogleSearchsAppPage } from './app.po';

describe('google-searchs-app App', function() {
  let page: GoogleSearchsAppPage;

  beforeEach(() => {
    page = new GoogleSearchsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
