const productList = [
  {
    title: 'Sunny Blue',
    description:
      'I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me. You could not possibly have come at a better time, my dear Watson, he said cordially.',
    image: '/blue.jpg',
    price: 50.0,
    color: '#5173a6',
  },

  {
    title: 'Long Summers',
    description:
      'The painter laughed. I don’t think there will be any difficulty about that. Sit down again, Harry. And now, Dorian, get up on the platform, and don’t move about too much, or pay any attention to what Lord Henry says. He has a very bad influence over all his friends, with the single exception of myself.',
    image: '/bluegreen.jpg',
    price: 30.0,
    color: '#195b80',
  },

  {
    title: 'Afternoon in the Sun',
    description:
      'Have you really a very bad influence, Lord Henry? As bad as Basil says? There is no such thing as a good influence, Mr. Gray. All influence is immoral—immoral from the scientific point of view. Why? Because to influence a person is to give him one’s own soul. He does not think his natural thoughts, or burn with his natural passions. His virtues are not real to him. His sins, if there are such things as sins, are borrowed. He becomes an echo of some one else’s music, an actor of a part that has not been written for him.',
    image: '/bougainvillea.jpg',
    price: 35.0,
    color: '#ef6849',
  },

  {
    title: 'City Treasures',
    description:
      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    image: '/face.jpg',
    price: 65.0,
    color: '#f7c200',
  },

  {
    title: 'Welcome',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    image: '/flowers.jpg',
    price: 70.0,
    color: '#f37aa7',
  },

  {
    title: 'Bright',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    image: '/white.jpg',
    price: 45.0,
    color: '#033000',
  },

  {
    title: 'Mystery',
    description:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    image: '/dark.jpg',
    price: 65.0,
    color: '#6b6660',
  },

  {
    title: 'Desert Noon',
    description:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: '/green.jpg',
    price: 40.0,
    color: '#0e4e4a',
  },

  {
    title: 'Solid Colors',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/brown.jpg',
    price: 40.0,
    color: '#942b26',
  },

  {
    title: 'Exploring Sights',
    description:
      'My dear fellow, said Sherlock Holmes as we sat on either side of the fire in his lodgings at Baker Street, life is infinitely stranger than anything which the mind of man could invent. We would not dare to conceive the things which are really mere commonplaces of existence. If we could fly out of that window hand in hand, hover over this great city, gently remove the roofs, and peep in at the queer things which are going on, the strange coincidences, the plannings, the cross-purposes, the wonderful chains of events, working through generations, and leading to the most outré results, it would make all fiction with its conventionalities and foreseen conclusions most stale and unprofitable.',
    image: '/ornate.jpg',
    price: 80.0,
    color: '#b3c2b4',
  },

  {
    title: 'Vacation Home',
    description:
      'They were not welcomed home very cordially by their mother. Mrs. Bennet wondered at their coming, and thought them very wrong to give so much trouble, and was sure Jane would have caught cold again. But their father, though very laconic in his expressions of pleasure, was really glad to see them; he had felt their importance in the family circle. The evening conversation, when they were all assembled, had lost much of its animation, and almost all its sense by the absence of Jane and Elizabeth.',
    image: '/cyan.jpg',
    price: 30.0,
    color: '#00b3b9',
  },

  {
    title: 'Old and Interesting',
    description:
      'When the dancing recommenced, however, and Darcy approached to claim her hand, Charlotte could not help cautioning her in a whisper, not to be a simpleton, and allow her fancy for Wickham to make her appear unpleasant in the eyes of a man ten times his consequence. Elizabeth made no answer, and took her place in the set, amazed at the dignity to which she was arrived in being allowed to stand opposite to Mr. Darcy, and reading in her neighbours’ looks, their equal amazement in beholding it.',
    image: '/stone.jpg',
    price: 50.0,
    color: '#793d09',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products
		${sql(productList, 'title', 'description', 'image', 'color', 'price')}
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
