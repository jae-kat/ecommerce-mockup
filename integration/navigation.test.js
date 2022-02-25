const baseUrl = 'https://bootcamp-ecommerce-mockup.herokuapp.com';

test('Add to cart, change quantity and remove from cart', async () => {
  // go to the website
  await page.goto(`${baseUrl}/`);
  expect(page.url()).toBe(`${baseUrl}/`);
  await expect(page).toMatch('Guts & Jannsen Interiors');
  // go to the shop
  await expect(page).toClick('[data-test-id="products-link"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/products`);
  await expect(page).toMatch('Spring Collection 2022');
  // add a product to the cart
  await expect(page).toClick('[data-test-id="buy-product-3"]');
  // go to the cart
  await expect(page).toClick('[data-test-id="cart-link"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/cart`);
  // check if the amount number in the header is now 1
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    Number: 1,
  });
  // click on the product in the cart and go to the product page
  await expect(page).toClick('[data-test-id="go-to-product-3"]');
  await page.waitForNavigation();
  await expect(page.url()).toBe(`${baseUrl}/products/3`);
  // increase the quantity
  await expect(page).toClick('[data-test-id="add-one"]');
  await expect(page).toMatchElement('[data-test-id="product-quantity"]', {
    Number: 2,
  });
  // decrease the quantity
  await expect(page).toClick('[data-test-id="remove-one"]');
  await expect(page).toMatchElement('[data-test-id="product-quantity"]', {
    Number: 1,
  });
  // go to the cart
  await expect(page).toClick('[data-test-id="cart-link"]');
  await page.waitForNavigation();
  // delete the item from the cart
  await expect(page).toClick('[data-test-id="cart-product-remove-3"]');
  // check if cart is now empty
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    Number: 0,
  });
  await expect(page).toMatch('There are currently no products in your cart');
});

test('Checkout flow, payment page, thank you page', async () => {
  // go to the shop
  await page.goto(`${baseUrl}/products`);
  // go to one of the product pages
  await expect(page).toClick('[data-test-id="learn-more-5"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/products/5`);
  // add the product
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
  await expect(page).toMatchElement('[data-test-id="cart-count"]', {
    Number: 1,
  });
  // go to the cart
  await expect(page).toClick('[data-test-id="cart-link"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/cart`);
  // go to checkout
  await expect(page).toClick('[data-test-id="cart-checkout"]');
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/checkout`);
  // can't confirm order when fields are empty
  await expect(page).toClick('button');
  expect(page.url()).toBe(`${baseUrl}/checkout`);
});
