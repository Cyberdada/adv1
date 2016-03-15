import mongoose = require("mongoose")
import {IactionModel, actionSchema} from "../schemas/actionSchema";
import {IflagModel, flagSchema} from "../schemas/flagSchema";
import {IexitModel, exitSchema} from "../schemas/exitSchema";


export interface IartifactModel extends mongoose.Document
{
    name:string;
	type:string;
	dungeonId:string;
	userId: string;
	roomId:string;
	flags:Array<IflagModel>;
	actions:Array<IactionModel>;
}

export var artifactSchema = new mongoose.Schema( {
	name: String, 
	type: String, 
	dungeonId: mongoose.Schema.Types.ObjectId, 
	userId: mongoose.Schema.Types.ObjectId, 
	roomId: mongoose.Schema.Types.ObjectId,
	flags: [flagSchema], 
	actions: [actionSchema]
})