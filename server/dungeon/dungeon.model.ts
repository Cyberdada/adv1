
export class roomModel {
    name: string;
	dungeonId: string;
	picture: string;
	description: string;
	exits: Array<exitModel>;
	type: string;
	actions: Array<actionModel>;
	flags: Array<flagModel>;
}



export class exitModel {
	name: string;
	leadsTo: string;
	leadsToId: string;
}

export class dungeonModel {
	name: string;
	created: Date;
}

export class playerModel {
	name: string;
	dungeonId: string;
	picture: string;
	isActive: boolean;
	isAlive: boolean;
	isTemplate: boolean
	lastMove: Date;
	flags: Array<flagModel>;
	inventory: Array<artifactModel>;
	roomId: string;
}



export class artifactModel {
    name: string;
	type: string;
	flags: Array<flagModel>;
	actions: Array<actionModel>;
}



export class actionModel {
	verb: string;
	conditionsResults: Array<conditionsResultsModel>;
}


export class conditionsResultsModel {
	conditions: Array<conditionModel>;
	results: Array<resultModel>;
}

export class conditionModel {
	artifactId: string;
	flag: string;
	operator: string;

}

export class resultModel {
	command: string;
	artifactId: string;
	flag: string;
	value: any;
}


export class flagModel {
	name: string;
	type: string;
	value: any;
}


export class typeperc {
	name: string;
	probability: number;
}



  
  
  
