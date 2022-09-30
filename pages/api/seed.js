import User from '../../models/user';
import db from '../../lib/db';
import data from '../../data/data';

const handler = async (req, res) => {
	/** connect to database */
	await db.connect();

	/** delete all current users form the database */
	await User.deleteMany();

	/** insert new users to the database */
	await User.insertMany(data.users);

	/** disconnect from the database */
	await db.disconnect();

	/** acknowledgement message */
	res.send({ message: 'Database seeding ended successfully...' });
};

export default handler;
