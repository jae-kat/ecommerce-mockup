const productList = [
  {
    title: 'Sturdy Oak',
    description:
      'I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me. You could not possibly have come at a better time, my dear Watson, he said cordially.',
    image: '/wood-table.jpg',
    alt: 'A large wooden table with strong black metal legs on a terrace.',
    price: 250.0,
  },

  {
    title: 'Small Oak',
    description:
      'The painter laughed. I don’t think there will be any difficulty about that. Sit down again, Harry. And now, Dorian, get up on the platform, and don’t move about too much, or pay any attention to what Lord Henry says. He has a very bad influence over all his friends, with the single exception of myself.',
    image: '/table-small.jpg',
    alt: 'A wood table with delicate black metal legs.',
    price: 130.0,
  },

  {
    title: 'Tripod Set',
    description:
      'Have you really a very bad influence, Lord Henry? As bad as Basil says? There is no such thing as a good influence, Mr. Gray. All influence is immoral—immoral from the scientific point of view. Why? Because to influence a person is to give him one’s own soul. He does not think his natural thoughts, or burn with his natural passions. His virtues are not real to him. His sins, if there are such things as sins, are borrowed. He becomes an echo of some one else’s music, an actor of a part that has not been written for him.',
    image: '/plant-stools.jpg',
    alt: 'Three-legged wooden stools, one a little bigger than the other with a potted plant on top.',
    price: 75.0,
  },

  {
    title: 'Side Table Narrow',
    description:
      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    image: '/stool.jpg',
    alt: 'A small wooden stool with a book and a small pot plant in front of a sofa.',
    price: 65.0,
  },

  {
    title: 'The Circle',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    image: '/mirror.jpg',
    alt: 'Large round mirror with a light wood frame hanging above a wooden bench in an entry hall.',
    price: 70.0,
  },

  {
    title: 'The Triangle',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    image: '/triangle-shelf.jpg',
    alt: 'A small, wooden triangle shelf on a wall.',
    price: 35.0,
  },

  {
    title: 'Standing Lamp',
    description:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    image: '/standing-lamp.jpg',
    alt: 'A tall standing lamp made of bronze metal. It is next to an armchair in front of large windows.',
    price: 65.0,
  },

  {
    title: 'Hanging Lamp',
    description:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: '/hanging-lamp.jpg',
    alt: 'A set of three hanging lampshades over a dinner table. They are made of thin wood slats and have a rounded pear shape.',
    price: 30.0,
  },

  {
    title: 'Glowing Coals',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/red-armchair.jpg',
    alt: 'A comfortable armchair in a lively muted red color with two pillows on top.',
    price: 90.0,
  },

  {
    title: 'Palm green',
    description:
      'My dear fellow, said Sherlock Holmes as we sat on either side of the fire in his lodgings at Baker Street, life is infinitely stranger than anything which the mind of man could invent. We would not dare to conceive the things which are really mere commonplaces of existence. If we could fly out of that window hand in hand, hover over this great city, gently remove the roofs, and peep in at the queer things which are going on, the strange coincidences, the plannings, the cross-purposes, the wonderful chains of events, working through generations, and leading to the most outré results, it would make all fiction with its conventionalities and foreseen conclusions most stale and unprofitable.',
    image: '/green-armchair.jpg',
    alt: 'A large chair with wooden legs and armrests, and dark green upholstery.',
    price: 95.0,
  },

  {
    title: 'Sturdy Shelf',
    description:
      'The whole thing was rather amusing, and I propounded the thing as a mock problem to Poirot on the following morning. He seemed interested, and questioned me rather narrowly as to the rents of flats in various localities. “A curious story,” he said thoughtfully. “Excuse me, Hastings, I must take a short stroll.”',
    image: '/wood-shelf.jpg',
    alt: 'A set of two wooden boards fixed to the wall with ocean-themed decor on them.',
    price: 45.0,
  },

  {
    title: 'Sleek Shelf',
    description:
      'Now that war and the problems of war are things of the past, I think I may safely venture to reveal to the world the part which my friend Poirot played in a moment of national crisis. The secret has been well guarded. Not a whisper of it reached the Press. But, now that the need for secrecy has gone by, I feel it is only just that England should know the debt it owes to my quaint little friend, whose marvellous brain so ably averted a great catastrophe.',
    image: '/wall-shelf.jpg',
    alt: 'A light wooden board fixed to the wall on thin metal brackets.',
    price: 30.0,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products
		${sql(productList, 'title', 'description', 'image', 'price', 'alt')}
	`;
};

exports.down = async (sql) => {
  for (const product of productList) {
    await sql`
			DELETE FROM
				products
			WHERE
				title = ${product.title} AND
				description = ${product.description} AND
				image = ${product.image} AND
        price = ${product.price} AND
        alt = ${product.alt}
	`;
  }
};
