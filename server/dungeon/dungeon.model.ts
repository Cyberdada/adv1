export class roomModel
{
	name: string;
	description: string;
	exits: Array<string>;
	type:string; 
	index:number;
	dungeonId: string;
	picture: string;
}

export class dungeonModel 
{
	name:string;
	created: Date;	
}


export class artifactModel
{
	name:string;
	location: string;
	locationType: number;
	flags:Array<flagModel>;
	actions:Array<actionModel>;
	
}


export class actionModel {
	name:string;
	
}

export class flagModel 
{
	name:string;
	type:string;
	value:any;
	
}


export class typeperc 
{
	name:string;
	probability: number;
}


export class playerModel
{
	name: string;
	coins:number;
	armorClass:number;
	dexterity:number;
	charisma:number;
	health:number;
	strength: number;
}


export class monsterModel
{
	name: string;
	coins:number;
	armorClass:number;
	dexterity:number;
	charisma:number;
	health:number;
	strength: number;
	inventory: Array<artifactModel>;
}
  
  
  