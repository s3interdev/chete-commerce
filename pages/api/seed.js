import User from '../../models/user';
import Product from '../../models/product';
import db from '../../lib/db';
import data from '../../data/data';

const handler = async (req, res) => {
	/** connect to database */
	await db.connect();

	/** delete all current users and products form the database */
	await User.deleteMany();
	await Product.deleteMany();

	/** insert new users and products to the database */
	await User.insertMany(data.users);
	await Product.insertMany(data.products);

	/** disconnect from the database */
	await db.disconnect();

	/** acknowledgement message */
	res.send({ message: 'Database seeding ended successfully...' });
};

export default handler;
