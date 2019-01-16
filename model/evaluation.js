const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var evaluationSchema = new Schema({

    tutorName: {
        type: String,
        required: true
    },

    tuteeName: {
        type: String,
        required: true
    },

    hearPTS:{
        type: String
    },

    average: {
        type: Number,
        required: true
    },

    comments: {
        type: String
    },

    message: {
        type: String
    },

    frequency: {
        type: Number
    },

    punctuality: {
        type: Number
    },

    preparedness: {
        type: Number
    },

    explanation: {
        type: Number
    },

    exercises: {
        type: Number
    },

    relevance: {
        type: Number
    },

    enthusiasm: {
        type: Number
    },

    openness: {
        type: Number
    },

    confidence: {
        type: Number
    },

    knowledgable: {
        type: Number
    },

    voiceModulation: {
        type: Number
    },

    questionAnswer: {
        type: Number
    },

    effectiveness: {
        type: Number
    },

    encouraging: {
        type: Number
    },

    dateSubmitted: {
        type: Date,
        default: Date.now()
    }

});

var Evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = Evaluation;
var exports = module.exports = {};
exports.schema = evaluationSchema

exports.getAllEvaluations = function(){
  return new Promise(function(resolve, reject){
    console.log("GETTING ALL EVALUATIONS")
    
    Evaluation.find({}).then((evaluations)=>{
      console.log("Got all evaluations")
      resolve(evaluations)
    }, (err)=>{
      console.log("No evaluations Exist")
      reject(err)
    })
  })
}

// divide by 14 for average
exports.createNewEvaluation = function(tutorName, tuteeName, hearPTS, comments, message, frequency, punctuality, preparedness, explanation,
                                       exercises, relevance, enthusiasm, openness, confidence, knowledgable, voiceModulation, questionAnswer, effectiveness, encouraging){
    return new Promise(function(resolve, reject){
        console.log("Creating new Evaluation")
        var average = (parseInt(frequency, 10) + parseInt(punctuality, 10) + parseInt(preparedness, 10) + parseInt(explanation, 10) + parseInt(exercises, 10) + parseInt(relevance, 10) +parseInt(enthusiasm, 10) + parseInt(openness, 10) + parseInt(confidence, 10) + parseInt(knowledgable, 10) + parseInt(voiceModulation, 10) + parseInt(questionAnswer, 10) + parseInt(effectiveness, 10) + parseInt(encouraging, 10)) / 14;

        var u = new Evaluation({
            tutorName, tuteeName, hearPTS, average, comments, message, frequency, punctuality, preparedness, explanation,
            exercises, relevance, enthusiasm, openness, confidence, knowledgable, voiceModulation, questionAnswer, effectiveness, encouraging
        })

        console.log(u)

        u.save().then((eval)=>{
            resolve(eval);
        }, (err)=>{
            reject(err);
        })
    })
}

exports.getLatestEvaluations = function(date){
    return new Promise(function(resolve, reject){
        console.log("Getting Newest Evaluations")

        Evaluation.find({
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