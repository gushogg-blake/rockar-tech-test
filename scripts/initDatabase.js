const sqlite = require("promised-sqlite3");
const config = require("../config");

(async function() {
	const db = new sqlite.PromisedDatabase();
	
	await db.open(config.DB_FILENAME);
	
	// create schema and insert initial data
	
	/*
	NOTE the sqlite package doesn't support multiple queries so splitting the
	string by ; to separate them. Not recommended for use in real-world code
	as the ; character may appear anywhere in the string -- I have checked this
	manually and am only doing it this way in the interests of time.
	*/
	
	const queries = `
		drop table if exists customer;
		drop table if exists product;
		
		create table customer (
			id integer primary key autoincrement,
			email varchar(128),
			forename varchar(128),
			surname varchar(128),
			contact_number varchar(64),
			postcode varchar(32)
		);
		
		create unique index customer_email on customer (email);
		create index customer_forename on customer (forename);
		create index customer_surname on customer (surname);
		create index customer_contact_number on customer (contact_number);
		create index customer_postcode on customer (postcode);
		
		create table product (
			id integer primary key autoincrement,
			vin varchar(64),
			colour varchar(32),
			make varchar(128),
			model varchar(128),
			price integer
		);
		
		create unique index product_vin on product (vin);
		create index product_colour on product (colour);
		create index product_make on product (make);
		create index product_model on product (model);
		create index product_price on product (price);
		
		insert into customer
		(email, forename, surname, contact_number, postcode)
		values
		("tom.harding1974@gmail.co.uk", "Tom", "Harding", "07938244758", "SS26GH"),
		("drosmanahmed@pharmaceuticalsglobal.org", "Osman", "Ahmed", "+91719548839", "396210"),
		("dominic.sutton@rockar.com", "Dominic", "Sutton", "+44 (0) 7950 244 036", "W12 7SL");
		
		insert into product
		(vin, colour, make, model, price)
		values
		("WVGCV7AX7AW000784", "Red", "Ford", "Fiesta", 10000),
		("5TBRV54138S478794", "Green", "Mitsubishi", "Eclipse", 35000),
		("SALSH23447A102751", "Blue", "BMW", "4 Series", 22000),
		("1G6DP567X50115827", "Black", "Jaguar", "XE", 43000),
		("1C6RR6LT9DS578427", "White", "Landrover", "Evoque", 52000);
	`.split(";").map(s => s.trim()).filter(Boolean);
	
	for (const q of queries) {
		await db.run(q);
	}
	
	db.close();
})();
