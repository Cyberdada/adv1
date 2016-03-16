import mongoose = require("mongoose")

export interface IexitModel {
	name:string, 
	leadsToRoomId:string
}

export var exitSchema = 
new mongoose.Schema( {
            name:String, 
			leadsToRoomId:mongoose.Schema.Types.Mixed
           }, 
            { _id : false })