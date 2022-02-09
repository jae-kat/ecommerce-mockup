const productList = [
  {
    title: 'Strength of Character',
    slogan: 'Ready-made lemonade',
    description:
      'Life has been giving you lemons? And you don´t have the time to squeeze all of them? This homemade, organic lemonade will give you everything you need to weather the ups and downs of life.',
    image:
      'https://www.motelamiio.com/out/pictures/generated/product/1/737_921_80/whitagram-image-113_bearb.jpg',
    price: 5,
  },

  {
    title: 'Wisdom',
    slogan: 'Weißheit mit dem Löffel essen!',
    description:
      "You feel like you're always making the wrong choices? Like you can't keep up with the people around you? You'll notice a difference after eating just a couple of spoonfuls of our delicious wisdom. The recipe has been handed down for generations and proven effective over and over again.",
    image:
      'https://www.motelamiio.com/out/pictures/generated/product/1/737_921_80/whitagram-image-149_bearb.jpg',
    price: 3,
  },

  {
    title: 'Ultimate Coolness',
    slogan: 'Cool as a Cucumber',
    description:
      'Wanna be a cool kid? We recommend this *limited* summer edition of chill for all those of you longing for the calm, self-confident demeanor of the truly cool.',
    image:
      'https://www.motelamiio.com/out/pictures/generated/product/2/600_750_80/motelamio-areia-mueslischale-azure-4.jpg',
    price: 3,
  },

  {
    title: 'Vivid Dreams',
    slogan: 'Jelly Beans for the Adventurous',
    description:
      'Our Vivid Dreams Jelly Beans have been an unbeaten bestseller since their debut. We keep adding new flavors for those of you adventurous enough to try all different kinds of dreams.',
    image:
      'https://www.motelamiio.com/out/pictures/generated/product/2/600_750_80/motel-a-miio-joao-rose-blue-speckled-s-6446_bearb.jpg',
    price: 4,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products
		${sql(productList, 'title', 'slogan', 'description', 'image', 'price')}
	`;
};

exports.down = async (sql) => {
  for (const product of productList) {
    await sql`
			DELETE FROM
				products
			WHERE
				title = ${product.title} AND
				slogan = ${product.slogan} AND
				description = ${product.description} AND
				image = ${product.image} AND
        price = ${product.price}
	`;
  }
};
