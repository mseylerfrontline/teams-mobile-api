mongoose = require 'mongoose'

# Set up our schema and its types
deviceSchema = new mongoose.Schema
	name: String
	dev:
		type: Boolean
		default: false
	id:
		type: String
		unique: true
		index: true

module.exports = mongoose.model 'devices', deviceSchema
