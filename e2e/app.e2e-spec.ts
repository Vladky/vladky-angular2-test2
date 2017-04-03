import { VladkyAngular2Test2Page } from './app.po';

describe('vladky-angular2-test2 App', function() {
  let page: VladkyAngular2Test2Page;

  beforeEach(() => {
    page = new VladkyAngular2Test2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
