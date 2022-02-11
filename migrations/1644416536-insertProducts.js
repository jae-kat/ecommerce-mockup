const productList = [
  {
    title: 'Happy-go-Lucky',
    slogan: 'Ready-made lemonade',
    description:
      'Life has been giving you lemons? And you don´t have the time to squeeze all of them? This homemade, organic lemonade will give you everything you need to weather the ups and downs of life.',
    image:
      'https://images.unsplash.com/photo-1606943932434-2f21e1c54ef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80',
    price: 5,
    color: '#ebcd53',
  },

  {
    title: 'Wisdom',
    slogan: 'Weißheit mit dem Löffel essen!',
    description:
      "You feel like you're always making the wrong choices? Like you can't keep up with the people around you? You'll notice a difference after eating just a couple of spoonfuls of our delicious wisdom. The recipe has been handed down for generations and proven effective over and over again.",
    image:
      'https://images.unsplash.com/photo-1615589484252-c70def71bb4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
    price: 3,
    color: '#d8361e',
  },

  {
    title: 'Confidence',
    slogan: 'Cool as a Cucumber',
    description:
      'Tired of faking it? Wanna be one of the cool kids this season? We recommend this *limited* summer edition of chill for all those of you longing for the calm, self-confident demeanor of the truly confident.',
    image:
      'https://images.unsplash.com/photo-1532086853747-99450c17fa2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    price: 3,
    color: '#67be7b',
  },

  {
    title: 'Vivid Dreams',
    slogan: 'Jelly Beans for the Adventurous',
    description:
      'Our Vivid Dreams Jelly Beans have been an unbeaten bestseller since their debut. We keep adding new flavors for those of you brave enough to try all different kinds of dreams.',
    image:
      'https://images.unsplash.com/photo-1581798269145-7512508289b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=552&q=80',
    price: 4,
    color: '#6f0da2',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products
		${sql(productList, 'title', 'slogan', 'description', 'image', 'color', 'price')}
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
        price = ${product.price} AND
        color = ${product.color}
	`;
  }
};
