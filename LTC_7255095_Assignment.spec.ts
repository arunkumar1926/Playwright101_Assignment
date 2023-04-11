import {chromium, expect, test} from "@playwright/test"

(async () => {
    const capabilities = {
      'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'playwright101_assignment',
        'name': 'playwright101_assignment',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true
      }
    }
  
   const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })}) ()


test("Assignment Task: Test Scenario 1", async ({page}) => {

    //Navigate to the page and click on expected link
    await page.goto("https://www.lambdatest.com/selenium-playground");
    //const testURL = await page.locator("//a[contains(text(),'Simple Form Demo')]").click();
    
    await page.click("text=Simple Form Demo");
    const testURL = "https://www.lambdatest.com/selenium-playground/simple-form-demo";
    const enterMessage = "Welcome to LambdaTest";

    expect(page).toHaveURL(testURL);
    
    //Fill the message and validate the same
    await page.locator("input#user-message").fill(enterMessage);
    await page.waitForTimeout(5000);
    await page.locator("#showInput").click();
    await page.waitForTimeout(10000);

    await expect(page.locator("id=message")).toHaveText(enterMessage);
})


test("Assignment Task: Test Scenario 2", async ({page}) => {

    //Navigate to the page and click on expected link
    await page.goto("https://www.lambdatest.com/selenium-playground");
    //const testLink = page.locator("//a[contains(text(),'Drag & Drop Sliders')]");
    
    const testLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
    await testLink.scrollIntoViewIfNeeded();
    await testLink.click();
    await page.waitForTimeout(5000);
    
    //const source = page.locator("//input[@value='15']");
    //const target = page.locator("//output[text()='95']");

    //Push the slider from default value to expected value
    let targetValue = "95";
    await page.locator('#slider3').getByRole('slider').fill(targetValue);
    const verifyValue = await page.locator('#rangeSuccess').textContent();
    await page.waitForTimeout(10000);

    expect(targetValue).toBe(verifyValue)
    if(targetValue == verifyValue)
        console.log("Values are matching")


    /*await page.locator("//input[@value='15']").hover();
    await page.mouse.down();
    await page.locator("//output[text()='95']").hover();
    await page.mouse.up();*/

    /*if(source){
        while(!isCompleted){
            await source.dragTo(target);
            isCompleted = true;
        }

    }*/

})


test("Assignment Task: Test Scenario 3", async ({page}) => {

    //Navigate to the page and click on expected link
    await page.goto("https://www.lambdatest.com/selenium-playground");
    await page.getByRole('link', { name: 'Input Form Submit' }).click();
    
    const submitBtn = page.getByRole('button', { name: 'Submit' });
    const successMessage = "Thanks for contacting us, we will get back to you shortly."

    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();
    
    //Read the text from error message
    page.on("dialog", async (alert) => {
        const text = await alert.defaultValue();
        console.log(text);
    })

    //Fill the form by entering data in all the required fields
    await page.locator("#name").fill("LambdaTest Playwright");
    await page.locator("#inputEmail4").fill("playwrightassign101@mailinator.com");

    await page.locator("input[type='password']").fill("Password@1234");
    
    await page.locator("#company").fill("ABC Private Limited");

    await page.locator("#websitename").fill("https://www.lambdatest.com/");
    await page.locator("select[name='country']").click();
    
    //Use selectoption to select the country from the dropdown
    await page.selectOption("select[name='country']", {
        value: "US"});

       await page.getByPlaceholder('City').fill("Denver");
    //await page.locator("#inputCity").fill("Denver");

    //Fill the form by using type action to enter data in the fields
    await page.locator("#inputAddress1").type("11765 Baker Street");
    await page.locator("#inputAddress2").type("II Main Lane");

    await page.locator("#inputState").type("Colorado");   
    await page.locator("#inputZip").type("80203");   


    //Submit the form and validate the thank you message 
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();
    await page.waitForTimeout(5000);

    expect(page.locator("//p[@class='success-msg hidden']")).toHaveText(successMessage);

})