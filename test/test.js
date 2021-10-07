const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

/**
 * this prestashop is slow!!! breaks without sleeps, sorry
 */
describe('HomepageTest', () => {
    // TODO: browserstack?
    const driver = new Builder().forBrowser('chrome').build();
    const sleepBetweenSteps = 4000;

    it('automationpractice.com should display e-commerce site My Store', async () => {
        await driver.get('http://automationpractice.com/');
        await driver.sleep(sleepBetweenSteps);
        const title = await driver.getTitle();
        expect(title).to.equal('My Store');
    });

    it('should add product to cart from dashboard', async () => {
        const button = await driver.findElement(
            By.css('.ajax_block_product .right-block .button-container a.ajax_add_to_cart_button')
        )
        button.click();
        await driver.sleep(sleepBetweenSteps);
        const closeButton = await driver.findElement(By.css('.layer_cart_product .cross'))
        closeButton.click()
        await driver.sleep(sleepBetweenSteps);
        const cartQuantity = await driver.findElement(By.css('.ajax_cart_quantity')).getAttribute("innerHTML");
        expect(cartQuantity).to.equal('1');
    })

    it('should add second product to cart from dashboard', async () => {
        const button = await driver.findElement(
            By.css('.ajax_block_product:nth-child(2) .right-block .button-container a.ajax_add_to_cart_button')
        )
        button.click();
        await driver.sleep(sleepBetweenSteps);
        const closeButton = await driver.findElement(By.css('.layer_cart_product .cross'))
        closeButton.click()
        await driver.sleep(sleepBetweenSteps);
        const cartQuantity = await driver.findElement(By.css('.ajax_cart_quantity')).getAttribute("innerHTML");
        expect(cartQuantity).to.equal('2');
    })

    it('cart should persist when navigating to cart page', async () => {
        const cartButton = await driver.findElement(By.css('.shopping_cart a'));
        cartButton.click()
        await driver.sleep(sleepBetweenSteps);
        const cartLabel = await driver.findElement(By.id('summary_products_quantity')).getAttribute('innerHTML');
        expect(cartLabel).to.equal('2 Products');
    })

    after(async () => driver.quit());
});
