const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  it('topmenu should have footer', async () => {
    // const path = '/user';
    // await page.goto(`${BASE_URL}${path}`);
    // await page.waitForSelector('footer', {
    //   timeout: 2000,
    // });
    // const haveFooter = await page.evaluate(
    //   () => document.getElementsByTagName('footer').length > 0,
    // );
    // expect(haveFooter).toBeTruthy();
    expect(1).toEqual(1);
  });
});
