import mongoose = require("mongoose")

export interface IexitModel {
	name:string, 
	type:string, 
	value:string
}

export var exitSchema = 
new mongoose.Schema( {
            name:String, 
            type:String,
			value:mongoose.Schema.Types.Mixed
           }, 
            { _id : false })