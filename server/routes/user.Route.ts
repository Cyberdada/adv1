import  * as express from "express";
import mongoose = require("mongoose");
import {IUser, CurrentUser, ProjectPermission} from '../../src/app/models/theModels';


 interface IUserModel extends IUser, mongoose.Document { }
 
 
  
 var userSchema = new mongoose.Schema( 
     {
        name: String,
       extId:String, 
       projects: [{
           projectId:mongoose.Schema.Types.ObjectId,
           projectName:String, 
           permission: {level:Number, name:String}, 
           _id:false
        }] , 
       history:  {
            description:String, 
            modificationDate:Date,
            modifiedBy : { 
                name:String, 
                extId:String }
            }
     }
 ) 

 
export function  save(req: express.Request, res: express.Response) {
var project = mongoose.model<IUserModel>("User", userSchema);
var id; 
console.log("id");
console.log(req.body_id);
if(req.body_id === null || req.body_id === undefined) {
    id = new mongoose.Types.ObjectId();
}
console.log(id);
project.update({_id: id}, req.body, {upsert: true}, function(err, projects) {
   
    if (err) {
     
        console.log(err);
        return res.json({status: 500, error: err});
    }  
        res.json(projects);
});

}

export function load (req: express.Request, res: express.Response ) {
    console.log("getting users");
    var user = mongoose.model<IUserModel>("User", userSchema);
    var q = user.find({}).sort("name");
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

export function loadById ( req: express.Request, res: express.Response ) {
    
    var user = mongoose.model<IUserModel>("User", userSchema);
    user.findById(req.params.id, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    res.json(db_article);   
});
}

export function loadByProjectAndPermission ( req: express.Request, res: express.Response ) {
    var user = mongoose.model<IUserModel>("User", userSchema);
    mongoose.set('debug', true);  
    var q = user.find({}).sort("name");
  
    q.where("projects").elemMatch(function(elem:any) {
        elem.where('projectId',  new mongoose.Types.ObjectId(req.params.projectid) )
        elem.gte('permission.level',req.params.permissionlevel )
    })
    
  
    q.exec(function (err, db_articles) {
    if(err) { 
         return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
    
}

function findProject(usr: IUser ):string {
     let pid = "";
    usr.projects.forEach(itm => {
       if (itm.permission.level > 1) {
           pid =itm.projectId;
           return false;
       } 
    });
    console.log("resuklt" + pid);
    return pid;
}


function authedProjects(usr: IUser) : ProjectPermission[] {
    let retval  = new Array<ProjectPermission>();
    usr.projects.forEach(itm => {
        if(itm.permission.level > 0 ){
            retval.push(itm);
        }
    })
    
    return retval;
}

export function login  ( req: express.Request, res: express.Response ) {
       console.log("login");
   
    var user = mongoose.model<IUserModel>("User", userSchema);
    var currentUser = new CurrentUser;
    user.find({"extId":req.params.extId}, function(err, db_article) {
       console.log("p" + req.params.extId);
      console.log(JSON.stringify(db_article));
      if(db_article.length === 0) {
          currentUser.authed = false;
      }   
      else
      {
          currentUser.authed = true;
          currentUser.extId = db_article[0].extId;
          currentUser.currentProject = findProject(db_article[0]);
          currentUser.authedProjects =  authedProjects(db_article[0]);
      }    
      res.json(currentUser);   
   });
  
 
}

