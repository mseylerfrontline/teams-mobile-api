# Internal dependencies
Device = require '../models/devices'
Errors = require './errors'

exports.getDevices = (req,res) ->

   Device.find {}, "name id dev", (err, data) ->
      if err
         Errors.internalFind(res, "device")
      else
         res.send {
            status: "success"
            data: {
               pageInfo: {
                  totalResults: data.length,
                  resultsPerPage: data.length
               },
               devices: data
            }
         }


exports.getDevice = (req,res) ->

   Device.findOne {id: req.params.device_id}, "name id dev", (err, data) ->
      if err
         Errors.internalFind(res, "device")
      else
         res.send {
            status: "success"
            data: {
               device: data
            }
         }

exports.putDevice = (req,res) ->

   Device.update {id: req.params.device_id}, {name: req.body.name, dev: req.body.dev}, (err) ->
      if err
         Errors.internalPut(res, "device")
      else
         res.send {
            status: "success"
            data: {}
         }

exports.deleteDevice = (req,res) ->

   Device.remove {id: req.params.device_id}, (err) ->
      if err
         Errors.internalRemove(res, "device")
      else
         res.send {
            status: "success"
            data: {}
         }

exports.postDevice = (req,res) ->

   if !req.body.name
      Errors.missingBody(res, "device", "name")
      return

   else if !req.body.id
      Errors.missingBody(res, "device", "id")
      return

   else
      data = new Device {
         name: req.body.name
         id: req.body.id
         dev: req.body.dev
      }

      data.save (err,device) ->
         if err
            switch err.code
               when 11000
                  Errors.duplicateBody(res, "device", "id")
               else
                  Errors.internalSave(res, "device")
         else
            res.send {
               status: "success"
               data: {
                  device: {
                     id: device.id
                     name: device.name
                  }
               }
            }
