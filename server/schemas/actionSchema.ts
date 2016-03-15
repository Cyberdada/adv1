import mongoose = require("mongoose")

export interface IactionModel extends mongoose.Document
{
	verb:string, 
	conditionsResults: Array<IconditionsResultModel>;	
}

export interface IconditionsResultModel {
	conditions:Array<IconditionModel>;
	results:Array<IresultModel>;		
}

export interface IconditionModel {
	artifactId:string;
	flag:string;
	operator:string;
}

export interface IresultModel {
	command:string;
	artifactId:string;
	flag:string;
	value:any;
}


export var conditionsResultsSchema = 
new mongoose.Schema(
{
	conditions: [{ artifactId:mongoose.Schema.Types.ObjectId,
				  flag:String, 
				  operator:String 
		         }], 
    results: [{
		command:String, 
		artifactId: mongoose.Schema.Types.ObjectId, 
		flag:String,
		value:mongoose.Schema.Types.Mixed
	}]
	}, 
{_id:false});

export var actionSchema = 
new mongoose.Schema( {
            verb:String,
			conditionsResults:[conditionsResultsSchema]
		}, 
            { _id : false })