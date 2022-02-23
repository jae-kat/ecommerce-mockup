Create a readme with:
Title
Description
List of all technologies used
1 or 2 screenshots
Setup instructions
Deployment instructions

# Next.js E-commerce Store

> This is an Upleveled bootcamp project: build a (fake) e-commerce store on your own

<img src="/products-screen.png" alt="products overview page" height="150px" />

## Technologies used

Next.js
emotion for css-in-jsx
postgres migrations for the database
jest for unit testing
heroku for the deployment

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

## Setup instructions

Clone the repository and install all dependencies
`git clone https://github.com/jae-kat/ecommerce-mockup`
`cd ecommerce-mockup`
`yarn`

Setup a database with postgres on your computer:

`psql <login>`
`CREATE DATABASE <database name>;`
`CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';`
`GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;`

Create a .env file with the info the database needs: look at the .env.example file to see what info you have to provide

Use migrations:
`yarn migrate up`

## Deployment instructions

create an account on Heroku
create a new app and connect to your Github repository, enable automatic deploys
in the overview tab click 'Configure Add-On': select "Heroku Postgres"

> <img src="/cart-screen.png" alt="cart overview page" height="150px" />
> <img src="/mobile-product-screen.png" alt="products overview page" height="250px" />
