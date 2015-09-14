###
   /controllers
   Handles JSON responses to API request errors
###


###
   4xx
   Failed Errors (client error)
###

# If the client missed a required parameter
exports.missingParam = (res, domain, param) ->
   res.status(400).send {
      status: "failed"
      errors: [
         {
            status: "400"
            domain: domain
            reason: "required"
            message: "Required parameter: #{param}"
            locationType: "parameter"
            location: param
         }
      ]
   }

# If the client gave an invalid parameter value
exports.invalidParam = (res, domain, param, input) ->
   res.status(400).send {
      status: "failed"
      errors: [
         {
            status: "400"
            domain: domain
            reason: "invalid"
            message: "Invalid '#{param} value': #{input}"
            locationType: "parameter"
            location: param
         }
      ]
   }

# If the client misses a necessary part of the JSON body
exports.missingBody = (res, domain, key) ->
   res.status(400).send {
      status: "failed"
      errors: [
         {
            status: "400"
            domain: domain
            reason: "required"
            message: "Required body key: #{key}"
            locationType: "body"
            location: key
         }
      ]
   }

# If the client has an invalid value for a necessary part of the JSON body
exports.duplicateBody = (res, domain, key) ->
   res.status(400).send {
      status: "failed"
      errors: [
         {
            status: "400"
            domain: domain
            reason: "duplicate"
            message: "Invalid #{key} value: #{key} is not unique"
            locationType: "body"
            location: key
         }
      ]
   }

# If the client has entered a value that is unique and already present
exports.duplicate = (res, domain, key, input) ->
   res.status(400).send {
      status: "failed"
      errors: [
         {
            status: "400"
            domain: domain
            reason: "invalid"
            message: "Invalid '#{key} value': #{input}"
            locationType: "body"
            location: key
         }
      ]
   }

# If the client does not have a correct key / secret combination
exports.failedAuth = (res, domain) ->
   res.status(403).send {
      status: "failed"
      errors: [
         {
            status: "403"
            domain: domain
            reason: "forbidden"
            message: "Couldn't find user with key or invalid secret"
         }
      ]
   }

# If the client is missing a necessary scope for a request
exports.needPermission = (res, domain) ->
   res.status(403).send {
      status: "failed"
      errors: [
         {
            status: "403"
            domain: domain
            reason: "forbidden"
            message: "Missing permission to perform action"
         }
      ]
   }

###
   5xx
   Internal Errors (server error)
###

# Mongo threw an error when saving (POST)
exports.internalSave = (res, domain) ->
   res.status(500).send {
      status: "error"
      errors: [
         {
            status: "500"
            domain: domain
            reason: "unknown"
            message: "Couldn't save #{domain}"
         }
      ]
   }

# Mongo threw an error when finding (GET)
exports.internalFind = (res, domain) ->
   res.status(500).send {
      status: "error"
      errors: [
         {
            status: "500"
            domain: domain
            reason: "unknown"
            message: "Couldn't find #{domain}"
         }
      ]
   }

# Mongo threw an error when putting (PUT)
exports.internalPut = (res, domain) ->
   res.status(500).send {
      status: "error"
      errors: [
         {
            status: "500"
            domain: domain
            reason: "unknown"
            message: "Couldn't put #{domain}"
         }
      ]
   }

# Mongo threw an error when removing (DELETE)
exports.internalRemove = (res, domain) ->
   res.status(500).send {
      status: "error"
      errors: [
         {
            status: "500"
            domain: domain
            reason: "unknown"
            message: "Couldn't remove #{domain}"
         }
      ]
   }


String::capitalizeFirstLetter = ->
   this.charAt(0).toUpperCase() + this.slice(1)
