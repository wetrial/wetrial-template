// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  launch: {
    // headless: false,
    // devtools: true,
    defaultViewport: {
      width: 1900,
      height: 1000,
    },
    // args: [
    //   '--disable-gpu',
    //   '--disable-dev-shm-usage',
    //   '--disable-setuid-sandbox',
    //   '--no-first-run',
    //   '--no-sandbox',
    //   '--no-zygote',
    //   '--single-process',
    // ],
  },
};
