const mongoose = require('mongoose');
// const mongoURI = process.env.DB_LOCAL;

const connectToMongo = async () => {
	try {
		await mongoose.connect(process.env.DB_LOCAL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
		});
		console.log('DB Connected');
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectToMongo;