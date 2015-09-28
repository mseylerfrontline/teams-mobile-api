###
Converts url: "" schema to url: {} schema
###

config = require '../../config/config'
District = require '../districts'

mongoose = require 'mongoose'
db = mongoose.connection
mongoose.connect config.mongoURL

# District.find { teams: true }, (err, results) ->
#    for result in results
#       for key, account of result.accounts.toObject()
#          for page in account.pages
#             web = account.url
#          result.accounts[key].url =
#             web: web
#             android: ""
#             ios: ""
#       result.save (err) ->
#          console.log err

District.find {}, (err, results) ->
   console.log err
   for result in results
      result.id = result.num
      result.num = undefined
      console.log 'ya'
      result.save()
   console.log 'hmmmm'
