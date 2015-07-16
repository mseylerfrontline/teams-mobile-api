# Node modules
hat = require 'hat'

# Internal dependencies
User = require '../models/users'
Errors = require './errors'

exports.postUser = (req,res) ->

   # Handle scopes based on type shortcuts
   switch req.body.type
      when "district"
         scope = ["write:districts", "read:districts"]
         secret = true
      when "admin"
         scope = ["write:users", "read:users", "write:districts", "read:districts"]
         secret = true
      when "public"
         scope = ["read:districts"]
         secret = false

   # Making sure we have valid parameters
   if !req.body.name
      Errors.missingBody(res, "user", "name")
      return

   else if !req.body.type
      Errors.missingBody(res, "user", "type")
      return

   else if !scope
      Errors.invalidBody(res, "user", "type", req.query.type)
      return

   # No errors
   else
      data = new User {
         name: req.body.name
         key: hat()
         secret: if secret then hat() else null
         scope: scope
      }

      data.save (err,user) ->
         if err
            Errors.internalSave(res, "user")
            return

         else
            res.send {
               status: "success"
               data: {
                  user: {
                     key: user.key
                     secret: user.secret
                  }
               }
            }
