const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { Options } = require('selenium-webdriver/chrome');

/**
 * this prestashop is slow!!! breaks without sleeps, sorry. 
 */
describe('Add to cart test', () => {
    // TODO: browserstack?
    // const driver = new Builder().forBrowser('firefox').build();
    const driver = new Builder().usingServer().withCapabilities({ 'browserName': 'chrome' }).build();
    const sleepBetweenSteps = 3000;


    it('automationpractice.com should display e-commerce site My Store', async () => {
        await driver.get('http://automationpractice.com/');
        await driver.sleep(sleepBetweenSteps);
        const title = await driver.getTitle();
        expect(title).to.equal('My Store');
    });

    it('should add product to cart from dashboard', async () => {
        const button = await driver.findElement(
            By.css('#homefeatured > .ajax_block_product:nth-child(1) .button:nth-child(1) > span')
        )
        // buttons are hidden - .click() won't work with many drivers
        await driver.executeScript("arguments[0].click();", button)
        await driver.sleep(sleepBetweenSteps);
        const closeButton = await driver.findElement(By.css('.layer_cart_product .cross'))
        closeButton.click()
        const cartQuantity = await driver.findElement(By.css('.ajax_cart_quantity')).getAttribute("innerHTML");
        expect(cartQuantity).to.equal('1');
    })

    it('should add second product to cart from dashboard', async () => {
        const button = await driver.findElement(
            By.css('.ajax_block_product:nth-child(2) .right-block .button-container a.ajax_add_to_cart_button')
        )
        await driver.executeScript("arguments[0].click();", button)
        await driver.sleep(sleepBetweenSteps);
        const closeButton = await driver.findElement(By.css('.layer_cart_product .cross'))
        closeButton.click()
        const cartQuantity = await driver.findElement(By.css('.ajax_cart_quantity')).getAttribute("innerHTML");
        expect(cartQuantity).to.equal('2');
    })

    it('add to cart should work on product page', async () => {
        await driver.get('http://automationpractice.com/index.php?id_product=1&controller=product')
        const cartButton = await driver.findElement(By.css('#add_to_cart button'));
        await driver.executeScript("arguments[0].click();", cartButton)
        await driver.sleep(sleepBetweenSteps);
        const closeButton = await driver.findElement(By.css('.layer_cart_product .cross'))
        closeButton.click()
        const cartQuantity = await driver.findElement(By.css('.ajax_cart_quantity')).getAttribute("innerHTML");
        expect(cartQuantity).to.equal('3');
    })

    it('cart should persist when navigating to cart page', async () => {
        const cartButton = await driver.findElement(By.css('.shopping_cart a'));
        await driver.executeScript("arguments[0].click();", cartButton)
        await driver.sleep(sleepBetweenSteps);
        const cartLabel = await driver.findElement(By.id('summary_products_quantity')).getAttribute('innerHTML');
        expect(cartLabel).to.equal('3 Products');
    })

    after(async () => driver.quit());
});