###
   /controllers
   Handles all API request authentication
###

# Import our dependencies
Errors = require './errors'         # Handles error responses
User = require '../models/users'    # The user schema / model

# Checks if request is properly authenticated- passed as a "next" handler to an express route
exports.isAuthenticated = (req, res, next) ->

    # If there isn't an API key
   if !req.query.key
      Errors.missingParam(res, 'auth', 'key')
      return

   else
      User.findOne {key: req.query.key}, (err,user) ->

         # There was some sort of internal error with the database query
         if err
            Errors.internalFind(res, "auth")
            return

         # We couldn't find the API key
         else if !user
            Errors.failedAuth(res, "auth")
            return

         # If a user's scope requires a secret in addition to an API key and the secret is ommitted
         else if user.secret and !req.query.secret
            Errors.missingParam(res, 'auth', 'secret')
            return

         # If the request's secret does not match the user's
         else if user.secret is not req.query.secret
            Errors.failedAuth(res, "auth")
            return

         else

            switch req.route.path

               # Scopes required if request is made to /districts endpoint
               when "/districts"
                  switch req.method # Different scope depending on request method
                     when "GET"
                        checkPermission("read:districts", user.scope)
                     when "PUT"
                        checkPermission("write:districts", user.scope)

               # Scopes required if request is made to /users endpoint
               when "/users"
                  switch req.method # Different scope depending on request method
                     when "POST"
                        checkPermission("write:users", user.scope)

               # This endpoint doesn't require any particular scope
               else
                  next()

   # This function takes a required scope as its first parameter and a user's full scope as its second
   checkPermission = (permission, scope) ->
      if permission in scope then next() else Errors.needPermission(res, "auth")
      return
