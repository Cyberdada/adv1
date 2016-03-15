import mongoose = require("mongoose")

export interface IdungeonModel extends mongoose.Document
{
	author: string, 
	created: Date, 
	name: string, 
	maxUsers:number
}

export var dungeonSchema = 
new mongoose.Schema( {
			author:String,
            created: { type: Date, default: Date.now },
			name:String, 
			maxUsers: Number
		})