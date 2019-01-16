const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var feedbackSchema = new Schema({

    submitter:{
        type: String
    },

    concernedTopic: {
        type: String,
    },

    complaints: {
        type: String
    },

    suggestions: {
        type: String
    },

    others: {
        type: String
    },

    dateSubmitted: {
        type: Date,
        default: Date.now()
    }
});

var Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
var exports = module.exports = {};
exports.schema = feedbackSchema

exports.createNewFeedback = function(submitter, concernedTopic, complaints, suggestions, others){
    return new Promise(function(resolve, reject){
        console.log ("-----model/feedback/createNewFeedback-----" + concernedTopic + "HEHE")

        var u = new Feedback(
            {
                submitter, concernedTopic, complaints, suggestions, others
            })

        console.log(u)

        u.save().then((feedback)=>{
            resolve(feedback)
        }, (err)=>{
            console.log(err);
        })
    })
}

exports.getAllFeedback = function(){
  return new Promise(function(resolve, reject){
    console.log("GETTING ALL FEEDBACK")
    
    Feedback.find({}).then((feedbacks)=>{
      console.log("Got all feedbacks")
      resolve(feedbacks)
    }, (err)=>{
      console.log("No feedbacks Exist")
      reject(err)
    })
  })
}

exports.getLatestFeedbacks = function(date){
    return new Promise(function(resolve, reject){
        console.log("Getting Newest Feedbacks")

        Feedback.find({
            dateSubmitted:{ $gte: date}
        }).then((evals)=>{
            resolve(evals)
        }, (err)=>{
            console.log("Error in comparing???");
            console.log(err);
            reject(err)
        })
    })
}