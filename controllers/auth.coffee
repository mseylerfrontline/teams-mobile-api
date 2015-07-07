Errors = require './errors'
User = require '../models/users'

exports.isAuthenticated = (req, res, next) ->

   if !req.query.key
      Errors.missingParam(res, 'auth', 'key')
      return

   else
      User.findOne {key: req.query.key}, (err,user) ->

         if err
            Errors.internalFind(res, "auth")
            return

         else if !user
            Errors.failedAuth(res, "auth")
            return

         else if user.secret and !req.query.secret
            Errors.missingParam(res, 'auth', 'secret')
            return

         else if user.secret is not req.query.secret
            Errors.failedAuth(res, "auth")
            return

         else

            switch req.route.path

               when "/districts"
                  switch req.method
                     when "GET"
                        checkPermission("read:districts", user.scope)
                     when "PUT"
                        checkPermission("write:districts", user.scope)

               when "/users"
                  switch req.method
                     when "POST"
                        checkPermission("write:users", user.scope)

               else
                  next()

   checkPermission = (permission, scope) ->
      if permission in scope then next() else Errors.needPermission(res, "auth")
      return
