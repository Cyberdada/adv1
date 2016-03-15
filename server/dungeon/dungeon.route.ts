import * as express from "express";
import {dungeonSchema, IdungeonModel} from "./dungeon.schema";
import mongoose = require("mongoose");



     
export function  save(req: express.Request, res: express.Response) {
var dungeon = mongoose.model<IdungeonModel>("dungeon", dungeonSchema);


if(req.body._id === null || req.body._id === undefined) {
    req.body._id = new mongoose.Types.ObjectId();
}

dungeon.update({_id:  req.body._id}, req.body, {upsert: true}, function(err, newItm) {
   
    if (err) {
        return res.json({status: 500, error: err});
    }  
        res.json(newItm);
});

}


export function load (req: express.Request, res: express.Response ) {
    console.log("getting dungeons");
    var dungeon = mongoose.model<IdungeonModel>("dungeon", dungeonSchema);
    var q = dungeon.find({}).sort("name");
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

export function loadById ( req: express.Request, res: express.Response ) {
    
     var dungeon = mongoose.model<IdungeonModel>("dungeon", dungeonSchema);
   dungeon.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_article);   
});
}
