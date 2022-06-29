const express = require("express");
const sqlite = require("promised-sqlite3");
const {buildSchema} = require("graphql");
const {graphqlHTTP} = require("express-graphql");
const config = require("../config");

const db = new sqlite.PromisedDatabase();

const schema = buildSchema(`
	type Customer {
		email: String
		forename: String
		surname: String
		contact_number: String
		postcode: String
	}
	
	type Product {
		vin: String
		colour: String
		make: String
		model: String
		price: Int
	}
	
	type Query {
		getCustomer(identifier: String!, identifierField: String!): [Customer]
		getProduct(identifier: String!, identifierField: String!): [Product]
	}
`);

const rootValue = {
	async getCustomer(args) {
		const fields = ["email", "forename", "surname", "contact_number", "postcode"];
		const {identifier, identifierField} = args;
		
		if (!fields.includes(identifierField)) {
			throw new Error("Field not supported for customer: " + identifierField);
		}
		
		return await db.all("select * from customer where `" + identifierField + "` = $identifier", {
			$identifier: identifier,
		});
	},
	
	async getProduct(args) {
		const fields = ["vin", "colour", "make", "model", "price"];
		const {identifier, identifierField} = args;
		
		if (!fields.includes(identifierField)) {
			throw new Error("Field not supported for customer: " + identifierField);
		}
		
		return await db.all("select * from product where `" + identifierField + "` = $identifier", {
			$identifier: identifier,
		});
	},
};

const app = express();

app.use("/graphql", graphqlHTTP({
	schema,
	rootValue,
	graphiql: true,
}));

(async function() {
	await db.open(config.DB_FILENAME);
	
	app.listen(3000);
})();
