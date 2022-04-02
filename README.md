# Next.js E-commerce Store

> This is an Upleveled bootcamp project: build a (mockup) e-commerce store

![products overview page](https://user-images.githubusercontent.com/94120252/155329232-60af305f-71c9-40a1-bb81-019c217c6cb2.png)

## Technologies

- Next.js
- Emotion for CSS-in-JSX
- Postgres migrations for the database
- Jest-Puppeteer for unit and end-to-end testing
- Heroku for the deployment

## Assignment description

- products page with links to all the products, using dynamic routing
- page for each single product with an 'add to cart' button and quantity input
- cart page showing the product names and prices of the added items with the option to delete them. Plus, a total price and checkout button
- checkout page showing the total, asking for (required) shipping and payment info, and a 'confirm order' button
- thankyou page
- a header showing the amount of items in the cart

- use cookies to store cart information
- write some pages/components in TypeScript
- create a postgreSQL database and table(s)
- write unit tests and E2E tests

## Setup instructions

Clone the repository and install all dependencies

```
git clone https://github.com/jae-kat/ecommerce-mockup
cd ecommerce-mockup
yarn
```

Setup a database with postgres on your computer:

```
psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Create a .env file with the info the database needs: look at the .env.example file to see what info you have to provide

Use migrations:
`yarn migrate up`

## Deployment instructions

Create an account on Heroku. Create a new app and connect to your Github repository, enable automatic deploys. In the overview tab click 'Configure Add-On': select "Heroku Postgres"

![mobile screen product page](https://user-images.githubusercontent.com/94120252/155329350-87f9fe0d-415f-47e4-923a-1775137c595c.png)
![cart page](https://user-images.githubusercontent.com/94120252/155329330-11157153-d492-4a85-90e1-5a84ae7f3024.png)
