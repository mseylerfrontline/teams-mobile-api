mongoose = require 'mongoose'

# Set up our schema and its types
userSchema = new mongoose.Schema {
	name: String
	key: String
	secret: String
	scope: [String]
}

module.exports = mongoose.model 'users', userSchema
