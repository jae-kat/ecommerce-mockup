exports.up = async (sql) => {
  await sql`
	CREATE TABLE products (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		title varchar(40) NOT NULL,
		slogan varchar(50) NOT NULL,
		description varchar(300) NOT NULL,
		image varchar(200) NOT NULL,
		price integer NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE products
	`;
};
