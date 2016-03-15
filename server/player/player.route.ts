import * as express from "express";
import {playerSchema, IplayerModel} from "./player.schema";
import mongoose = require("mongoose");



     
export function  save(req: express.Request, res: express.Response) {
var player = mongoose.model<IplayerModel>("player", playerSchema);

if(req.body._id === null || req.body._id === undefined) {
    req.body._id = new mongoose.Types.ObjectId();
}

player.update({_id:  req.body._id}, req.body, {upsert: true}, function(err, newItm) {
   
    if (err) {
        return res.json({status: 500, error: err});
    }  
        res.json(newItm);
});
}



export function copyFromTemplate (req: express.Request, res: express.Response ) {

    var player = mongoose.model<IplayerModel>("player", playerSchema);
    player.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
	var newPlayer = db_article;
	newPlayer._id = new mongoose.Types.ObjectId();
    newPlayer.inventory.forEach(itm => {
        itm._id =new mongoose.Types.ObjectId();
        itm.playerId = newPlayer._id;
        itm.roomId = newPlayer.roomId;
    });
	newPlayer.save();
	
    res.json(newPlayer);   
    });
    
}


export function load (req: express.Request, res: express.Response ) {

    var player = mongoose.model<IplayerModel>("player", playerSchema);
    var q = player.find({}).sort("name");
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

export function loadById ( req: express.Request, res: express.Response ) {
    
    var player = mongoose.model<IplayerModel>("player", playerSchema);
   player.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_article);   
});
}

export function loadByDungeonId ( req: express.Request, res: express.Response ) {
    var player = mongoose.model<IplayerModel>("player", playerSchema);
    var q = player.find({"dungeonId" : req.params.dungeonId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}

export function loadByRoomId ( req: express.Request, res: express.Response ) {
    var player = mongoose.model<IplayerModel>("player", playerSchema);
    var q = player.find({"roomId" : req.params.roomId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}
