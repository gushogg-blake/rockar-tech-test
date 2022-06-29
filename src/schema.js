const {buildSchema} = require("graphql");

module.exports = buildSchema(`
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
