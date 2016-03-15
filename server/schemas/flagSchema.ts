import mongoose = require("mongoose")

export interface IflagModel {
	name:string, 
	type:string, 
	value:string
}

export var flagSchema = 
new mongoose.Schema( {
            name:String, 
            type:String,
			value:mongoose.Schema.Types.Mixed
           }, 
            { _id : false })