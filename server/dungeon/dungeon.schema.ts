import mongoose = require("mongoose")

export interface IdungeonModel extends mongoose.Document
{
	author: string, 
	created: Date, 
	name: string
}

export var dungeonSchema = 
new mongoose.Schema( {
			author:String,
            created:Date,
			name:String
		})