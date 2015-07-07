Districts = require '../models/districts'
Errors = require './errors'

exports.getDistricts = (req,res) ->

   if req.query.longitude and req.query.latitude # If we have both longitude and latitude parameters

      geoJSONpoint = # Set up our GeoJSON data object
         type: 'Point'
         coordinates: [
            req.query.longitude,
            req.query.latitude
         ]

      # Find districts with TEAMS in the given location, only get their name, altName, and URLs
      Districts.find { teams: true, loc: { $near: { $geometry: geoJSONpoint, $maxDistance: 1000 } } }, "name altName accounts", (err, data) ->
         if err
            Errors.internalFind(res, "district")
         else
            res.send {
               status: "success"
               data: {
                  pageInfo: {
                     totalResults: data.length,
                     resultsPerPage: data.length
                  },
                  districts: data
               }
            } #Standard 200 response with JSON object

   else if req.query.name #If we have just the district's full name (not alt)

      Districts.find { teams: true, name: req.query.name }, "name altName accounts", (err, data) ->
         if err
            Errors.internalFind(res, "district")
         else
            res.send {
               status: "success"
               data: {
                  pageInfo: {
                     totalResults: data.length,
                     resultsPerPage: data.length
                  },
                  districts: data
               }
            }

   else #No paramters, get all the districts with teams

      Districts.find { teams: true }, "name altName accounts", { sort: { name: 1 } }, (err, data) ->
         if err
            Errors.internalFind(res, "district")
         else
            res.send {
               status: "success"
               data: {
                  pageInfo: {
                     totalResults: data.length,
                     resultsPerPage: data.length
                  },
                  districts: data
               }
            }

exports.getDistrict = (req,res) ->
   return

exports.putDistrict = (req,res) ->
   return
