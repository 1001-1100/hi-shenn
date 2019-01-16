const express = require("express")
const path = require("path")
const hbs = require("hbs")
hbs.registerHelper("equal", require("handlebars-helper-equal"))
const nodeMailer = require('nodemailer')
const mongoose = require("mongoose")
const session= require("express-session")
const cookieparser = require("cookie-parser"); //for cookies also
const bodyparser = require("body-parser");
// const moment = require("moment")
const crypto = require("crypto")
// const dropdown = require("semantic-ui-dropdown")


/*                  SETUP               */


mongoose.Promise = global.Promise

mongoose.connect("mongodb://root:PTSTuteeMatcherS17@ds056009.mlab.com:56009/ptsmatcher", {
    useNewUrlParser: true
});

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
});


app.set("view engine", "hbs")
app.use(express.static(__dirname+"/static"));
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/resources"));
app.use(express.static(__dirname+"/model"));
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/controllers"));
app.use(express.static(__dirname+"/CurrentAdminPage"));

app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:"supersecrethash",
    name:"MP_Phase2",
    // 1 hour sessions
    cookie:{
        maxAge:1000*60*60
    }
}));

app.use(require("./controllers"));
hbs.registerPartials(__dirname+"/views/partials")
// HBS HELPER TO CHECK IF EMPTY STRING
hbs.registerHelper("isEmpty", (str)=>{
    return str == null  || str.toString() === ""
})

/*
hbs.registerHelper("getBest", (eval)=>{
    console.log(eval)
    return Math.max(eval.frequency, eval.punctuality, eval.preparedness, eval.explanation, eval.exercises,
        eval.relevance, eval.enthusiasm, eval.openness, eval.confidence, eval.knowledgeable,
        eval.voiceModulation, eval.questionAnswer, eval.effectiveness, eval.encouraging)
})

hbs.registerHelper("getWorst", (eval)=>{
    console.log(eval)
    return Math.min(eval.frequency, eval.punctuality, eval.preparedness, eval.explanation, eval.exercises,
        eval.relevance, eval.enthusiasm, eval.openness, eval.confidence, eval.knowledgeable,
        eval.voiceModulation, eval.questionAnswer, eval.effectiveness, eval.encouraging)
})
*/

// CHANGED
/*                  ROUTES               */
app.listen(process.env.PORT || 3000, ()=>{
    //clearDB()
    console.log("Now listening on port 3000...")
})