const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Path to the Chromium directory
const chromiumDir = path.join(process.env.HOME, 'uonwifi', 'chromium');

// Path to the Screenshots directory
const screenshotsDir = path.join(process.env.HOME, 'Pictures', 'Screenshots');

// Check if the Screenshots directory exists; if not, create it
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}



async function uonwifi(username, password) {
  const browser = await puppeteer.launch({
    executablePath: path.join(chromiumDir, 'chrome-headless-shell'),
    headless: true,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();

  try {
    const response = await page.goto('https://gstatic.com/generate_204', { waitUntil: 'networkidle2' });
    
    await page.type('#ft_un', username);
    await page.type('#ft_pd', password);
    await page.click('body > div > div > form > div:nth-child(8) > input[type=submit]');
    
    const screenshotPath = path.join(screenshotsDir, 'loggedin.png');
    await page.screenshot({ path: screenshotPath });
    
    console.log(`Screenshot saved to ${screenshotPath}`);
  } catch (error) {
    if (error.toString().includes('net::ERR_ABORTED')) {
      console.log('Already logged in!');
    } else {
      console.error('Error navigating to the page:', error);
    }
  } finally {
    await browser.close();
  }
}

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({
    executablePath: path.join(chromiumDir, 'chrome-headless-shell'),
    headless: true,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshotBuffer = await page.screenshot();

    const screenshotPath = path.join(screenshotsDir, `${Date.now()}.png`);
    fs.writeFileSync(screenshotPath, screenshotBuffer);

    console.log(`Screenshot saved to ${screenshotPath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

const command = process.argv[2];
const arg = process.argv[3];
const username = process.argv[3];
const password = process.argv[4];

if (command === 'login' && username && password) {
  uonwifi(username, password);
} else if (command === 'screenshot' && arg) {
  takeScreenshot(arg);
} else {
  console.log('Wrong argument or missing input!');
}
