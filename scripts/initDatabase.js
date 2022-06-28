const sqlite = require("promised-sqlite3");
const config = require("../config");

(async function() {
	const db = new sqlite.PromisedDatabase();
	
	await db.open(config.DB_FILENAME);
	
	await db.run(`
		create table customers (
			id integer primary key autoincrement,
			email varchar(128),
			forename varchar(128),
			surname varchar(128),
			contact_number varchar(64),
			postcode varchar(32)
		);
		
		create unique index customer_email on customers (email);
		create index customer_forename on customers (forename);
		create index customer_surname on customers (surname);
		create index customer_contact_number on customers (contact_number);
		create index customer_postcode on customers (postcode);
		
		create table products (
			id integer primary key autoincrement,
			vin varchar(64),
			colour varchar(32),
			make varchar(128),
			model varchar(128),
			price integer
		);
		
		create unique index products_vin on products (vin);
		create index products_colour on products (colour);
		create index products_make on products (make);
		create index products_model on products (model);
		create index products_price on products (price);
	`);
})();
