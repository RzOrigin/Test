const puppeteer = require('puppeteer');

const awaitTime = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  })
}

const getTime = () => {
  const date = new Date();
  return date.getTime();
}

const URL = 'http://67.205.150.25';

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      // '--use-file-for-fake-video-capture=./1.y4m',
      '--ignore-certificate-errors',
      '--unsafely-treat-insecure-origin-as-secure=' + URL
    ],
    devtools: true,
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const NUM_BROWSERS = 8;
  for (let index = 0; index < NUM_BROWSERS; index++) {
    console.log(index + ' : ' + getTime());
    const page = await browser.newPage();
    await page.goto('http://67.205.150.25/media/stream/2/2');
    let counter = 0
    while (counter < 3) {
      try {
        await awaitTime(1000);
        const startVideoButton = "#startVideoButton";
        await page.click(startVideoButton);
      }
      catch (err) {
        console.log('Failed #' + counter);
        counter++;
      }
    }
    // if (index === 0) { // waiting for first room to be created
    //   await awaitTime(1000);
    // }
  }
  console.log('End begin' + ' : ' + getTime());
  await awaitTime(60000);
  console.log('End end' + ' : ' + getTime());
  await browser.close();
})();


const oldCode = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      // '--use-file-for-fake-video-capture=./1.y4m',
      '--ignore-certificate-errors',
      '--unsafely-treat-insecure-origin-as-secure=' + URL
    ],
    devtools: true,
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage();
  await page.goto('http://67.205.150.25/media/stream/2/2');
  console.log(getTime());
  await awaitTime(2000);
  // console.log(getTime());
  // const startVideoButton = "#startVideoButton";
  // await page.click(startVideoButton);
  await awaitTime(1000);
  console.log(getTime());
  await page.screenshot({ path: 'example2.png' });

  // await browser.close();
}