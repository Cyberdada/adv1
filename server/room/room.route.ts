import * as express from "express";
import {roomSchema, IroomModel} from "./room.schema";
import mongoose = require("mongoose");



     
export function  save(req: express.Request, res: express.Response) {
var room = mongoose.model<IroomModel>("room", roomSchema);

if(req.body._id === null || req.body._id === undefined) {
    req.body._id = new mongoose.Types.ObjectId();
}


room.update({_id: req.body._id}, req.body, {upsert: true}, function(err, newItm) {
   
    if (err) {
        return res.json({status: 500, error: err});
    }  
        res.json(newItm);
});

}


export function load (req: express.Request, res: express.Response ) {

    var room = mongoose.model<IroomModel>("room", roomSchema);
    var q = room.find({}).sort("name");
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

export function loadById ( req: express.Request, res: express.Response ) {
    
    var room = mongoose.model<IroomModel>("room", roomSchema);
   room.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_article);   
});
}

export function loadByDungeonId ( req: express.Request, res: express.Response ) {
    var room = mongoose.model<IroomModel>("room", roomSchema);
    var q = room.find({"DungeonId" : req.params.dungeonId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}

