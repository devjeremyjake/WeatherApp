require('dotenv').config();

export default {
	// rest of config...
	extra: {
		SECRET_KEY: process.env.SECRET_KEY,
	},
};
