import mongoose = require("mongoose")
import {IactionModel, actionSchema} from "../schemas/actionSchema";
import {IflagModel, flagSchema} from "../schemas/flagSchema";
import {IartifactModel, artifactSchema} from "../artifact/artifact.schema";


export interface IplayerModel extends mongoose.Document
{
	name: string;
	dungeonId: string;
	picture: string;
	isActive: boolean;
	isAlive: boolean;
	isTemplate: boolean
	lastMove: Date;
	flags: Array<IflagModel>;
	inventory: Array<IartifactModel>;
	roomId: string;
}

export var playerSchema = 
new mongoose.Schema( {
				name: String,
	dungeonId: mongoose.Schema.Types.ObjectId,
	picture: String,
	isActive: Boolean,
	isAlive: Boolean,
	isTemplate: Boolean,
	lastMove: Date,
	flags: [flagSchema],
	inventory: [artifactSchema],
	roomId: mongoose.Schema.Types.ObjectId
		})