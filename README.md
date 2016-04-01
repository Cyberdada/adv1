# adv1
Trying to build a Rest Api for text adventures...

###API


HTTP | Path | Description
-----|------|------------
POST|```/api/dungeons```|Add/update Dungeon  (update if _id is included, else add) 
GET|```/api/dungeons```|Get all Dungeons
GET|```/api/dungeons/:id```|Get a particular Dungeon
GET|```/api/dungeons/:id/players```|Get all players for a particular Dungeon
GET|```/api/dungeons/:id/rooms/```| Get all rooms for a particular Dungeon
POST|```/api/players/```| Add/update Player  (update if _id is included, else add) 
GET|```/api/players/```| Get all Players
GET|```/api/players/:id```| Get a particular Player
POST|```api/players/:id```|Copy a Player from template, and return copy
POST |```api/rooms```| Add/update Room  (update if _id is included, else add) 
GET |```api/rooms```| Get all Room
GET |```api/rooms:id```| Get a particular Room
GET |```api/rooms:id/players```| Get all players in a particular Room
GET | ```api//dungeons/:id/artifacts/```| get all artifacts in a Dungeon
GET |```/api/room/:id/artifacts/ ``` | get all artifacts in a Room
POST| ```/api/artifacts/```|Add/update Artifact  (update if _id is included, else add) 
GET| ```/api/artifacts/```|Get all Artifacts
GET| ```/api/artifacts/:id```|Get a particular Artifact



####Datastructures

**Dungeon**
```javascript
{
  "_id": "string"     //BSON ObjectId
	"author": "string", 
	"name": "string", 
	"maxUsers":"12"
}
```
**Room**
```javascript
{ 
    "_id":"string",  //BSON ObjectId
   "name": "string",
   "dungeonId": "string",
   "picture": "string",    ///path to url image
   "description": "string",
   "exits":  [{
      "name":"string", 
       "leadsToRoomId": "string"} ], // bson objectId
   "type":"string"; 
  "actions": [ {
	    "verb" : "string", 
	    "conditionResults": [
	       "conditions": [
	       {
	           "artifactId": "string", //Bson objectID
	           "flag": "string", 
	           "operator": "string"
	       }], 
	    "results": [{
	       "command": "string", 
	       "artifactId": "string", 
	       "flag": "string", 
	       "value": "mixed" 
	  }]] 
	  }], 
  "flags": [
	 { 
	    "name": "string", 
	    "type": "string", 
	    "value": "mixed"
	 }
	 ];
```
**Player**
```javascript
         "_id": "string"     //BSON ObjectId
	"name": "string",
	"dungeonId": "string",
	"picture": "string" //uri of picture
	"isActive": "boolean";
	"isAlive": "boolean";
	"isTemplate": "boolean"
	"lastMove": "Date";
  "flags": [
	 { 
	    "name": "string", 
	    "type": "string", 
	    "value": "mixed"
	 }],
	"inventory":[Artifact],
	"roomId": "string"
```

**Artifact**
```javascript
     "_id": "string"     //BSON ObjectId
     "name":"string", 
	"type":"string",
	"dungeonId":"string",
	"userId": "string",
	"roomId":"string",
	 "flags": [
	 { 
	    "name": "string", 
	    "type": "string", 
	    "value": "mixed"
	 }],
  "actions": [ {
	    "verb" : "string", 
	    "conditionResults": [
	       "conditions": [
	       {
	           "artifactId": "string", //Bson objectID
	           "flag": "string", 
	           "operator": "string"
	       }], 
	    "results": [{
	       "command": "string", 
	       "artifactId": "string", 
	       "flag": "string", 
	       "value": "mixed" 
	  }]] 
	  }] 
```

Commands available in results: 
set 
destroy 
create
inc 
dec
message
	

**This is how the conditions/results should work**

When selecting a verb 
given that a set of conditions is ok 
(noun.flag operator value ) 

ex: 
take axe

given that 
axe.canBeTaken = true 

and 

inventory.freevolume > axe.volume

inventory add axe

ex 2: 

eat bread

bread.isEdible = true

destroy bread

player.hunger dec 10



