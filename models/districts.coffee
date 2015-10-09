mongoose = require 'mongoose'

# Set up our schema and its types
districtSchema = new mongoose.Schema {
	name: String
	altName: String
	id: String
	num: String

	accounts:

		parent:
			url: String
			pages: [
				{
					name: String
					icon: String
					enabled: Boolean
					url:
						web: String
						android:
							app: String
							fallback: String
						ios:
							app: String
							fallback: String
				}
			]

		student:
			url: String
			pages: [
				{
					name: String
					icon: String
					enabled: Boolean
					url:
						web: String
						android:
							app: String
							fallback: String
						ios:
							app: String
							fallback: String
				}
			]

		# substitute:
		# 	url: String
		# 	pages: [
		# 		{
		# 			name: String
		# 			icon: String
		# 			enabled: Boolean
		# 			url:
		# 				web: String
		# 				android:
		# 					app: String
		# 					fallback: String
		# 				ios:
		# 					app: String
		# 					fallback: String
		# 		}
		# 	]
		#
		# principal:
		# 	url: String
		# 	pages: [
		# 		{
		# 			name: String
		# 			icon: String
		# 			enabled: Boolean
		# 			url:
		# 				web: String
		# 				android:
		# 					app: String
		# 					fallback: String
		# 				ios:
		# 					app: String
		# 					fallback: String
		# 		}
		# 	]
		# employee:
		# 	url: String
		# 	pages: [
		# 		{
		# 			name: String
		# 			icon: String
		# 			enabled: Boolean
		# 			url:
		# 				web: String
		# 				android:
		# 					app: String
		# 					fallback: String
		# 				ios:
		# 					app: String
		# 					fallback: String
		# 		}
		# 	]
		#
		# teacher:
		# 	url: String
		# 	pages: [
		# 		{
		# 			name: String
		# 			icon: String
		# 			enabled: Boolean
		# 			url:
		# 				web: String
		# 				android:
		# 					app: String
		# 					fallback: String
		# 				ios:
		# 					app: String
		# 					fallback: String
		# 		}
		# 	]

	loc:
		type: {type: String}
		coordinates: Array
}


module.exports = mongoose.model 'districts', districtSchema
