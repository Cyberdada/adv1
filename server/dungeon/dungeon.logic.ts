/// <reference path="../types/lodash.d.ts" />


// Code for autopopulating dungeon. Not relevant anynore. 
import {dungeonModel, roomModel, typeperc} from  './dungeon.model';
import  * as lodash from "lodash";
const MAXROOMS = 10000;
const MINROOMS = 1;

export class dungeonLogic {
	
	
	public createDungeon(totalRooms: number, types:Array<typeperc>) 
	{
		
		if (totalRooms > MAXROOMS) {
			throw "To many rooms.... Maximum is " + MAXROOMS; 
		}
		
		if (totalRooms < MINROOMS) {
			throw "To few rooms.... Minimum is " + MINROOMS; 
		}
		
		
		var nofsInRow = Math.floor(Math.sqrt(totalRooms));

		var rooms:Array<roomModel> =new  Array<roomModel>();

		for(var i = 0;i < totalRooms; i++)
		{
			let newRoom : roomModel =new roomModel;	
			newRoom.index = i;
			newRoom.north = i < nofsInRow ? -1: i - nofsInRow; 
			newRoom.south = i + nofsInRow > totalRooms -1 ? -1: i + nofsInRow;           
			newRoom.east = i % nofsInRow  === nofsInRow -1 ? -1: i + 1;
			newRoom.west = i % nofsInRow  === 0 ? -1: i - 1;
            newRoom.type = this.setType(types);
			rooms.push(newRoom);
		}
		
	}
	
	private setType(types:Array<typeperc>):string {
	    
		let totsum =_.sumBy(types, 'probability');
		let stop =_.random(0,totsum);
		let current = 0;
		let retval = "";
		types.some(itm => {
			 if(_.inRange(stop, current, current + itm.probability)) {
				 retval = itm.name;
				return true;		 
			 }
			 current += itm.probability;			 
		});
	 return retval; 
	}
	
	
	
	
}