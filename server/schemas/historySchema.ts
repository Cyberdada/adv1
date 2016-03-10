import mongoose = require("mongoose")

export var historySchema = 
new mongoose.Schema( {
            description:String, 
            modificationDate:Date,
            modifiedBy : { 
                name:String, 
                extid:String }}, 
            { _id : false })