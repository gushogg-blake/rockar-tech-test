const express = require("express");
const sqlite = require("promised-sqlite3");
const {graphqlHTTP} = require("express-graphql");
const config = require("../config");
const schema = require("./schema");
const resolvers = require("./resolvers");

(async function() {
	const db = new sqlite.PromisedDatabase();
	
	await db.open(config.DB_FILENAME);
	
	const app = express();
	
	app.use("/graphql", graphqlHTTP({
		schema,
		rootValue: resolvers(db),
		graphiql: true,
	}));
	
	app.listen(3000);
})();
