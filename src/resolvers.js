module.exports = function(db) {
	return {
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
				throw new Error("Field not supported for product: " + identifierField);
			}
			
			return await db.all("select * from product where `" + identifierField + "` = $identifier", {
				$identifier: identifier,
			});
		},
	};
}
