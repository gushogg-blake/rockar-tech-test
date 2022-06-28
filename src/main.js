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
		getCustomer(identifier: String!, identifierField: String!): Customer
		getProduct(identifier: String!, identifierField: String!): Product
	}
`);

const rootValue = {
	async getCustomer(args) {
		console.log(args);
		
		return {
			forename: "test",
		};
	},
	
	async getProduct(args) {
		console.log(args);
		
		return null;
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
