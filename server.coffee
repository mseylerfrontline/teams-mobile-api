# Import native Node modules
http = require 'http'
path = require 'path'
url = require 'url'
fs = require 'fs'

# Get config data (environment-specific)
config = require './config/config'

# Import our controllers
districts = require './controllers/districts'
devices = require './controllers/devices'
users = require './controllers/users'
auth = require './controllers/auth'

# Set up mongodb
mongoose = require 'mongoose'
db = mongoose.connection
mongoose.connect config.mongoURL

# Import and set up express (routing library)
express = require 'express'
bodyParser = require 'body-parser'
app = express()

# Set up form body parsing with Express
app.use bodyParser.urlencoded({ extended: false })
app.use bodyParser.json()

# Permit Cross-Origin requests
app.all '*', (req, res, next) ->
	res.header 'Access-Control-Allow-Origin', '*'
	res.header 'Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'
	res.header 'Access-Control-Allow-Headers', 'Content-Type'
	next()

# Set parent middleware URL (all URLs descend form /mobile/v1)
v1 = express.Router()
app.use '/mobile/v1', v1

v1.route '/districts'
	.get(auth.isAuthenticated, districts.getDistricts)
	.put(auth.isAuthenticated, districts.putDistrict)

v1.route '/districts/:district_id'
	.get(auth.isAuthenticated, districts.getDistrict)

v1.route '/devices'
	.get(auth.isAuthenticated, devices.getDevices)
	.post(auth.isAuthenticated, devices.postDevice)

v1.route '/devices/:device_id'
	.get(auth.isAuthenticated, devices.getDevice)
	.put(auth.isAuthenticated, devices.putDevice)
	.delete(auth.isAuthenticated, devices.deleteDevice)

v1.route '/users'
	.post(auth.isAuthenticated, users.postUser)

app.listen config.port, config.ip
