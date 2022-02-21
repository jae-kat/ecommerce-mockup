exports.up = async (sql) => {
  await sql`
	CREATE TABLE products (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		title varchar(40) NOT NULL,
		description varchar(700) NOT NULL,
		image varchar(20) NOT NULL,
		price integer NOT NULL,
		alt varchar(200)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE products
	`;
};
