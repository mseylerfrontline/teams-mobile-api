# Don't worry about this file yet. It's for a future implementation of push notifications

apn = require 'apn'
gcm = require 'gcm'

apnConnection = new apn.Connection {

}

device = new apn.Device 'token'
