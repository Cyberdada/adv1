import * as express from "express";
import {artifactSchema, IartifactModel} from "./artifact.schema";
import mongoose = require("mongoose");



     
export function  save(req: express.Request, res: express.Response) {
var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);


if(req.body._id === null || req.body._id === undefined) {
    req.body._id = new mongoose.Types.ObjectId();
}

artifact.update({_id: req.body._id}, req.body, {upsert: true}, function(err, newItm) {
   
    if (err) {
        return res.json({status: 500, error: err});
    }  
        res.json(newItm);
});

}


export function load (req: express.Request, res: express.Response ) {

    var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);
    var q = artifact.find({}).sort("name");
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

export function loadById ( req: express.Request, res: express.Response ) {
    
    var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);
   artifact.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_article);   
});
}

export function loadByUserId ( req: express.Request, res: express.Response ) {
    var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);
    var q = artifact.find({"userId" : req.params.userId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}

export function loadByDungeonId ( req: express.Request, res: express.Response ) {
    var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);
    var q = artifact.find({"dungeonId" : req.params.userId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}



export function loadByRoomId ( req: express.Request, res: express.Response ) {
    var artifact = mongoose.model<IartifactModel>("artifact", artifactSchema);
    var q = artifact.find({"roomId" : req.params.userId }).sort("name")
    .sort("name")
    q.exec(function (err, db_articles) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_articles);   
});
}
