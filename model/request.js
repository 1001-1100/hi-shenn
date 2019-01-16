const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var requestSchema = new Schema({
    // requestID: {
    //     type: Number,
    //     required: true
    // },

    campus: {
        type: String,
        required: true
    },

    tuteeName: {
        type: String,
        required: true
    },

    idNum: {
        type: Number,
        required: true,
        trim: true,
        // unique: true,
        // default: 0
    },

    course: {
        type: String,
        required: true,
        trim: true,
        // default: null
    },

    contactNum: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        // default: null

    },

    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true
    },

    type: {
        type: String,
        required: true
    },

    subjects: {
        type: String,
        required: true
    },

    preferredTutor: {
        type: String,
        required: true
    },

    freeTime: {
        type: String,
        required: true
    },

    // academicYear: {
    //     type: String,
    //     required: true
    // },
    //
    // term: {
    //     type: String,
    //     required: true
    // },

    tutorName: {
        type: String,
        default: null
    },

    status: {
        type: String,
        default: "pending"
        // required: true
    },

    dateSubmitted: {
        type: Date,
        default: Date.now()
    },

    dateMatched: {
        type: Date,
        default: null
    }
});


var Request = mongoose.model("Request", requestSchema);
// module.exports = Request;
var exports = module.exports = {};
exports.schema = requestSchema

exports.createNewTutorRequest = function(campus, tuteeName, idNum, course, contactNum,
                                         email, type, subjects, preferredTutor, freeTime){
    return new Promise(function(resolve, reject){
        console.log ("-----model/request/createNewTutorRequest-----")

        var u = new Request(
            {
                campus, tuteeName, idNum, course, contactNum, email,
                type, subjects, preferredTutor, freeTime
            }
        )

        u.save().then((request)=>{
            resolve(request)
        }, (err)=>{
            console.log(err);
        })
    })
}

exports.getOneByEmail = function(emailAdd){
    return new Promise(function(resolve, reject){
        console.log ("-----model/request/getOneByEmail-----")

        Request.findOne({
            email : emailAdd
        }).then((user)=>{
            resolve(user)
        }, (err)=>{
            console.log ("*USER DOES NOT EXIST!*")
        })

    })
}

exports.getOneByID = function(_id){
    return new Promise(function(resolve, reject){
        console.log ("-----model/request/getOneByID-----")

        Request.findOne({
            _id
        }).then((request)=>{
            resolve(request)
        }, (err)=>{
            console.log ("*REQUEST DOES NOT EXIST!*")
            reject(err)
        })

    })
}

exports.getAllRequests = function(){
  return new Promise(function(resolve, reject){
    console.log("GETTING ALL REQUESTS")
    
    Request.find({}).then((requests)=>{
      console.log("Got all requests")
      resolve(requests)
    }, (err)=>{
      console.log("No requests Exist")
      reject(err)
    })
  })
}


exports.getLatestRequests = function(date){
    return new Promise(function(resolve, reject){
        console.log("Getting Newest Requests")


        Request.find({
            $or:[ {dateSubmitted:{ $gte: date}}, {status:"pending"}]

        }).then((evals)=>{
            resolve(evals)
        }, (err)=>{
            console.log("Error in comparing???");
            console.log(err);
            reject(err)
        })
    })
}

exports.newMatch = function(_id, tutorName){
    return new Promise(function(resolve, reject){

        Request.findOneAndUpdate(
            {_id},
            {$set:{status:"waiting", dateMatched:Date.now(), tutorName}},
            {returnNewDocument: true}
        ).then((request)=>{
            if(request != null){
                resolve(request)
            }
        })
    })
}


exports.newMatchThenSplit = function(_id, tutor, subjects){
    return new Promise(function(resolve, reject){

        // Request.findOne({_id}).then((reqForSubj)=>{
        //     let reqSubjs = reqForSubj.subjects.split(",");
        //     let tutorSubjs = subjects.split(",");
        //     let newReqSubjs = "";
        //
        //     for(let j=0; j<reqSubjs.length; j++){
        //         if(!tutorSubjs.includes(reqSubjs[j])){ // part of list
        //             if(newReqSubjs ===""){
        //                 newReqSubjs = reqSubjs[j];
        //             }
        //             else{
        //                 newReqSubjs += "," + reqSubjs[j];
        //             }
        //         }
        //     }

            Request.findOneAndUpdate(
                {_id},
                {$set:{status:"waiting", dateMatched:Date.now(), tutorName: tutor.name, subjects}},
                {returnNewDocument: true}
            ).then((request)=>{
                resolve(request)
            })

        // })


    })
}


exports.getWaitingRequestsFromTutorName = function(tutorName){
    return new Promise(function(resolve, reject){
        var status = "waiting";
        Request.find({
            tutorName,
            status
        }).then((tutorFromRequests)=>{
            if(tutorFromRequests != null){
                resolve(tutorFromRequests)
            }
        })
    })
}


exports.getAcceptedRequestsFromTutorName = function(tutorName){
    return new Promise(function(resolve, reject){
        var status = "accepted";
        Request.find(
            {tutorName,
            status}
        ).then((tutorFromRequests)=>{
            if(tutorFromRequests != null){
                resolve(tutorFromRequests)
            }
        })
    })
}

exports.getAcceptedRequestsFromTuteeName =function(tuteeName){
    return new Promise(function(resolve, reject){
        var status = "accepted";
        Request.find(
            {tuteeName,
            status}
        ).then((tuteeFromRequests)=>{
            if(tuteeFromRequests != null){
            resolve(tuteeFromRequests)
            }
        })
    })
}

exports.getNotAcceptedRequestsFromTuteeName =function(tuteeName){
    return new Promise(function(resolve, reject){
        Request.find(
            {tuteeName,
                // status:{$ne:"accepted"}
                $nor:[{status:"accepted"}, {status:"rejected"}]
            }
        ).then((tuteeFromRequests)=>{
            if(tuteeFromRequests != null){
            resolve(tuteeFromRequests)
        }
    })
    })
}

exports.acceptRequestByID = function(_id){
    return new Promise(function(resolve, reject){
        // var status = "accepted"
        // Request.findOneAndUpdate(
        //     {_id},
        //     {$set: {status}},
        //     {returnNewDocument: true}
        // ).then((request)=>{
        //     resolve(request)
        // }, (err)=>{
        //     reject(err)
        // })

        console.log("AcceptRequestByID")
        Request.findOne({_id}).then((request)=>{
            Request.find(
                {tutorName: request.tutorName,
                    tuteeName: request.tuteeName,
                    status: "accepted"}
                ).then((sameRequest)=>{
                    if(sameRequest[0] != null){
                        if(sameRequest[0].subjects.indexOf(request.subjects) > -1) {
                            console.log("CHECK??:" + sameRequest[0].subjects.indexOf(request.subjects))
                            console.log("THERE IS A SAME REQUEST TUTOR AND TUTEE" + sameRequest)
                            Request.findOneAndUpdate(
                                {_id: sameRequest[0]._id},
                                {$set: {subjects : sameRequest[0].subjects+","+request.subjects}},
                                {returnNewDocument: true}
                            ).then((latestRequest)=>{
                                console.log("Latest Request " + latestRequest)
                                Request.findOneAndDelete({_id}).then(()=>{
                                    resolve(latestRequest)

                                })
                            }, (err)=>{
                                reject(err)
                            })
                        }
                        else{
                            Request.findOneAndDelete({_id}).then((request)=>{
                                resolve(request)
                            })
                        }

                    }
                    else{
                        console.log("THERE IS NO SAME REQUEST")
                        var status = "accepted"
                        Request.findOneAndUpdate(
                            {_id},
                            {$set: {status}},
                            {returnNewDocument: true}
                        ).then((latestRequest)=>{
                            console.log("Latest Request " + latestRequest)
                            resolve(latestRequest)
                        }, (err)=>{
                            reject(err)
                        })
                    }
                })
        })
    })
}


exports.rejectRequestByID = function(_id){
    return new Promise(function(resolve, reject){
        var status = "rejected"
        Request.findOneAndUpdate(
            {_id},
            {$set: {status}},
            {returnNewDocument: true}
        ).then((request)=>{
            resolve(request)
        }, (err)=>{
            reject(err)
        })
    })
}