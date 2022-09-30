import mongoose from 'mongoose';

/** initialize connection */
const connection = {};

/** connect to the database */
async function connect() {
	if (connection.isConnected) {
		console.log('already connected to the database...');
		return;
	}

	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;

		if (connection.isConnected === 1) {
			console.log('using previous database connection...');
			return;
		}

		await mongoose.disconnect();
	}

	const db = await mongoose.connect(process.env.MONGODB_URI);

	console.log('creating new database connection...');

	connection.isConnected = db.connections[0].readyState;
}

/** disconnect from the database */
async function disconnect() {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log('connection was not disconnected');
		}
	}
}

const db = { connect, disconnect };

export default db;
