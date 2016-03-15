import mongoose = require("mongoose")
import {IactionModel, actionSchema} from "../schemas/actionSchema";
import {IflagModel, flagSchema} from "../schemas/flagSchema";
import {IexitModel, exitSchema} from "../schemas/exitSchema";

export interface IroomModel extends mongoose.Document
{
	 name: string;
	dungeonId: string;
	picture: string;
	description: string;
	exits: Array<IexitModel>;
	type:string; 
	actions:Array<IactionModel>;
	flags: Array<IflagModel>;
}

export var roomSchema = new mongoose.Schema( {
	name: String,
	dungeonId: mongoose.Schema.Types.ObjectId,
	picture: String,
	description: String,
	exits: [exitSchema],
	type:String,
	actions: [actionSchema],
	flags: [flagSchema]
		})