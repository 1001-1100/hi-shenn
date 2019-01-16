const mongoose = require("mongoose");
var announcementSchema = mongoose.Schema({
    announcementName:{
        type: String,
        required: true,
        unique: true
    },
    announcementLink: {
        type: String,
        required: true
    },
    announcementInfo:{
      type: String,
      required: true
    }
});

var Announcement = mongoose.model("announcement", announcementSchema);
var exports = module.exports = {};

exports.schema = announcementSchema

exports.createNewAnnouncement = function(announcementName, announcementLink, announcementInfo){
    return new Promise(function(resolve, reject){
        var a = new Announcement({
            announcementName, announcementLink, announcementInfo
        })

        a.save().then((announcement)=>{
            console.log ("*ANNOUNCEMENT UPLOADED*")
            resolve(announcement)
        }, (err)=>{
            console.log ("*FAILED TO UPLOAD ANNOUNCEMENT*")
            console.log(err);
            reject(err);
        })
    })
}

exports.deleteAnnouncement = function(announcementName){
    return new Promise(function(resolve,reject){
      Announcement.deleteOne({
        announcementName: announcementName
      }).then((success)=>{
        console.log("Deleted announcement "+announcementName+" successfully.")
        resolve(success)
      }, (err)=>{
        console.log("Delete Failed")
        reject(err)
      })
    })
}

exports.getAllAnnouncements = function(){
  return new Promise(function(resolve, reject){
    console.log("GETTING ALL ANNOUNCEMENTS")
    
    Announcement.find({}).then((announcements)=>{
      console.log("Got all announcement")
      resolve(announcements)
    }, (err)=>{
      console.log("No announcement Exist")
      reject(err)
    })
  })
}

exports.updateAnnouncement = function (oldName, newName, newInfo) {
    return new Promise(function (resolve, reject) {
        Announcement.findOneAndUpdate(
            { announcementName:oldName },
            { $set:
                    { announcementName:newName,
                        announcementInfo:newInfo
                    }
            },
            { returnNewDocument: true }
        ).then((ann) => {
            if (ann != null) {
                resolve(ann)
            }
        }, (err) => {
            reject(err)
        })

    })

}