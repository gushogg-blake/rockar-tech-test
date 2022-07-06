/*
* create a GraphQL resolver for a database table
* @param db sqlite3 database instance
* @param table {string} table name
* @param allowedFields {string[]} list of allowed fields to query on
*/
function createResolver(db, table, allowedFields) {
	/*
	* resolver
	* @param {Object} args GraphQL query args
	*/
	return async function(args) {
		const {identifier, identifierField} = args;
		
		if (!allowedFields.includes(identifierField)) {
			throw new Error("Field not supported for " + table + ": " + identifierField);
		}
		
		return await db.all("select * from " + table + " where `" + identifierField + "` = $identifier", {
			$identifier: identifier,
		});
	}
}

module.exports = function(db) {
	return {
		getCustomer: createResolver(db, "customer", ["email", "forename", "surname", "contact_number", "postcode"]),
		getProduct: createResolver(db, "product", ["vin", "colour", "make", "model", "price"]),
	};
}
