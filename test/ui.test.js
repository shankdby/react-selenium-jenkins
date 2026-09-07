// test/ui.test.js
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

describe('React application UI tests (Selenium WebDriverJS + Mocha + Chai)', function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get(APP_URL);
    await driver.wait(until.elementLocated(By.id('app-title')), 30000);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the React app and display the correct heading', async function () {
    const heading = await driver.findElement(By.id('app-title')).getText();
    expect(heading).to.contain('DevOps Experiment 5');
  });

  it('should have the expected browser page title', async function () {
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.contain('React Selenium');
  });

  it('should render the subtitle describing the testing stack', async function () {
    const subtitle = await driver.findElement(By.id('app-subtitle')).getText();
    expect(subtitle).to.contain('Selenium WebDriverJS');
  });

  it('should increment the counter when the button is clicked twice', async function () {
    const button = await driver.findElement(By.id('increment-btn'));
    await button.click();
    await button.click();
    const value = await driver.findElement(By.id('count-value')).getText();
    expect(value).to.equal('2');
  });
});
