require("dotenv").config();

const {
	DB_FILENAME = "./db.sqlite",
} = process.env;

module.exports = {
	DB_FILENAME,
};
