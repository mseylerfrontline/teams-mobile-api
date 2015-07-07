###
   Failed Errors (client error)
###

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
   Internal Errors (server error)
###

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



String::capitalizeFirstLetter = ->
   this.charAt(0).toUpperCase() + this.slice(1)
