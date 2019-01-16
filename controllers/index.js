const express = require("express")
const hbs = require("hbs");
const bodyparser = require("body-parser")
const session= require("express-session")
const path = require("path")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodeMailer = require('nodemailer')


const router = express.Router()

const Tutee = require("../model/tutee")
const Tutor = require("../model/tutor")
const Request = require("../model/request")
const Evaluation = require("../model/evaluation")
const Feedback = require("../model/feedback")
const Announcement = require("../model/announcement")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.use("/tutee", require("./tutee"))
router.use("/tutor", require("./tutor"))
router.use("/admin", require("./admin"))

// app.use(cookieparser())



// GET ALL PUBLIC MEMES
router.get("/", async (req,res)=>{
    console.log("GET /")

    // res.render("index.hbs")
    if(req.session.email == null){
        Announcement.getAllAnnouncements().then((announcements)=>{
            res.render("index.hbs", {
                announcements
            })
        })
    }
    else{
        if(req.session.type === "tutee"){
            Tutee.getOneByEmail(req.session.email).then((user)=> {
                console.log("LOGGING IN: "+user.name)
                if (user != null && user.activeAccount) {
                    console.log("LOGGING IN: "+user.name)
                    Request.getAcceptedRequestsFromTuteeName(user.name).then((tutors)=>{
                        Request.getNotAcceptedRequestsFromTuteeName(user.name).then((requests)=>{
                            Announcement.getAllAnnouncements().then((announcements)=>{
                                res.render("tuteeHome.hbs", {
                                    user, tutors, requests, announcements
                                })
                            })
                        })
                    })
                }
                else{
                    Announcement.getAllAnnouncements().then((announcements)=>{
                        res.render("index.hbs", {
                            announcements
                        })
                    })

                }
            })
        }
        else{
            Tutor.getOneByEmail(req.session.email).then((user)=>{
                if(user != null && user.activeAccount){
                    var lastLogin = user.lastLogin

                    console.log( " GOT ONE EMAIL TUTOR")

                    Request.getWaitingRequestsFromTutorName(user.name).then((waitingTutees)=>{ // all those that are pending
                        Request.getAcceptedRequestsFromTutorName(user.name).then((acceptedTutees)=>{
                            Request.getAcceptedRequestsFromTuteeName(user.name).then((acceptedTutors)=>{
                                Announcement.getAllAnnouncements().then((announcements)=>{



                                    console.log( " LOGGING IN: " + waitingTutees)

                                    if(!user.admin && !user.superAdmin){
                                        res.render("tutorHome.hbs", {
                                            user, acceptedTutees, waitingTutees, acceptedTutors, announcements
                                        })
                                    }
                                    else if(!user.superAdmin){
                                        Evaluation.getLatestEvaluations(lastLogin).then((evals)=>{
                                            Request.getLatestRequests(lastLogin).then((reqs)=>{
                                                Feedback.getLatestFeedbacks(lastLogin).then((feeds)=>{
                                                    res.render("tutorHome.hbs", {
                                                        user, acceptedTutees, waitingTutees, acceptedTutors, announcements
                                                    })
                                                })
                                            })
                                        })
                                    }
                                    else if(user.superAdmin){
                                        var tuteeTool = true
                                        Tutee.getAllTutees().then((tutee) => {
                                            Tutor.getAllTutors().then((tutor) => {
                                                Tutor.getAllTutorApps().then((tutorApp) => {
                                                    Request.getAllRequests().then((request) => {
                                                        Feedback.getAllFeedback().then((feedback) => {
                                                            Evaluation.getAllEvaluations().then((evaluation) => {
                                                                Announcement.getAllAnnouncements().then((announcement) => {
                                                                    Tutor.getOneByEmail(req.session.email).then((user) => {
                                                                        res.render("adminPage.hbs", {
                                                                            user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tuteeTool
                                                                        })
                                                                    })
                                                                }, (err) => {
                                                                    console.log("announcements error")
                                                                })
                                                            }, (err) => {
                                                                console.log("evaluations error")
                                                            })
                                                        }, (err) => {
                                                            console.log("feedbacks error")
                                                        })
                                                    }, (err) => {
                                                        console.log("requests error")
                                                    })
                                                }, (err) => {
                                                    console.log("tutor apps error")
                                                })
                                            }, (err) => {
                                                console.log("tutors error")
                                            })
                                        }, (err) => {
                                            console.log("tutees error")
                                        })
                                    }
                                })
                            })
                        })
                    })


                }
                else{
                    Announcement.getAllAnnouncements().then((announcements)=>{
                        res.render("index.hbs", {
                            announcements
                        })
                    })
                }
            })
        }
    }
})

router.get("/loginPage", (req, res)=>{
    console.log("GET /login")
    res.render("login.hbs")
})

router.post("/login", urlencoder, (req, res)=>{
    console.log("POST /login")

    var email = req.body.email;
    var password = encrypt(req.body.password);
//    var admin;
    console.log("Name "+ email)
    console.log("Password "+ password)

    Tutor.login(email, password).then((user) => { //check if valid tutor account
        if(user != null) {
            req.session.email = email;
            req.session.type = user.tutorType;

            console.log(user.tutorType)
            res.redirect("/")
        }
        else { //check if valid tutee account
            Tutee.login(email, password).then((user) => {
                if(user != null){
                    req.session.email = email;
                    req.session.type = "tutee";
                    res.redirect("/")
                }
                else{
                    var message = "Invalid login credentials";
                    res.render("login.hbs", {
                        message
                    })
                }
            })
        }
    })
})


router.get("/signUpPage", (req, res)=>{
    console.log("GET /signup")

    res.render("signup.hbs")
})

router.post("/signUp", urlencoder, (req, res)=>{
    console.log("POST /signUp")


    var firstName = req.body.firstName;
    var lastName= req.body.lastName;
    var idNumber = req.body.idNumber;
    var campus = req.body.campus;
    var course = req.body.course;
    var mobileNumber = req.body.mobNumber;
    var email= req.body.email;
    var password= req.body.password;
    var name = firstName + " " + lastName;
    var message = "Email exists";

    // var confirm= req.body.confirmPassword;
    console.log(firstName)
    console.log(lastName)
    console.log(idNumber)
    console.log(campus)
    console.log(course)
    console.log(mobileNumber)
    console.log(email)
    console.log(password)
    password = encrypt(password);

    Tutee.getOneByEmail(
        email
    ).then((user)=>{
        if(user == null){
            Tutor.getOneByEmail(
                email
            ).then((user)=>{
                if(user == null){
                    Tutee.createNewTutee(
                        name,
                        email,
                        password,
                        idNumber,
                        mobileNumber,
                        campus,
                        course
                    ).then((user)=>{
                        console.log("Created tutee" + user)
                        req.session.email = email;
                        req.session.type = "Tutee";
                        res.redirect("/")
                    })
                }
                else{
                    res.render("signup.hbs", {
                        message
                    })
                }
            }, (err)=>{
                message = "Error Signing up1"
                res.render("signup.hbs", {
                    message
                })
            })
        }
        else{
            res.render("signup.hbs", {
                message
            })
        }
    }, (err)=>{
        message = "Error Signing up2"
        res.render("signup.hbs", {
            message
        })
    })

})

router.get("/feedbackPage",(req,res)=>{
    console.log("GET /feedbackPage")

    Tutee.getOneByEmail(req.session.email).then((user)=> {
        // console.log(user)
        if (user != null) {
            res.render("feedback.hbs", {
                user
            })
        }
        else{
            Tutor.getOneByEmail(req.session.email).then((user)=>{
                if(user != null){
                    res.render("feedback.hbs", {
                        user
                    })
                }
            })
        }
    })

    // res.render("feedback.hbs")

})

router.post("/feedbackFinish", urlencoder, (req,res)=>{
    console.log("POST /feedbackFinish")

    var concernedTopic = req.body.concernedTopic;
    var complaints = req.body.complaints;
    var suggestions = req.body.suggestions;
    var others = req.body.others;

    // console.log(tutorName)
    // console.log(complaints)
    // console.log(suggestions)
    // console.log(others)


    Feedback.createNewFeedback(
        req.session.email, concernedTopic,
        complaints, suggestions, others).then((feedback)=>{

            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                service: "Gmail",
                auth: {
                    user: 'officialSystemPTS@gmail.com', // make sure the public privacy in gmail is turned on
                    pass: 'PTS1234!'
                }
            });

            let mailOptions = {
                from: '"Peer Tutors Society System" <officialSystemPTS@gmail.com>', // sender address
                to: "pts@dlsu.edu.ph", // list of receivers
                subject: '[PTS System] New Feedback',//req.body.subject, // Subject line
                // text: req.body.body, // plain text body
                html: 'Dear <b>PTS Admin</b>, <br><br> There is a new feedback submitted by <b>'
                    + req.session.email + ' </b>regarding <b>' + concernedTopic
                    + '</b>. Thank you. <br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.redirect("/")
            });

    })




})




router.get("/prompt", (req, res)=>{
    console.log("GET /prompt")
    var message = "You need to be Logged in before requesting for a tutor"

    res.render("login.hbs", {
        message
    })
})
// end of Adrians routing


// start of delbs routing
router.get("/logout", (req, res)=>{
    console.log("GET /logout")


    Tutor.getOneByEmail(req.session.email).then((tutor)=>{
        if(tutor != null){
            Tutor.updateLastLogin(req.session.email).then((notNeeded)=>{
                console.log("Updated Login")
                req.session.destroy((err)=> {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Destroyed sesh")
                    }
                });
                res.redirect("/")
            })
        }
        else{
            Tutee.updateLastLogin(req.session.email).then((notNeeded)=>{
                req.session.destroy((err)=> {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Destroyed sesh")
                    }
                });
                res.redirect("/")
            })
        }
    })
})
// end of delbs routing

// start of shenn routing
router.get("/evalForm",(req,res)=>{
    console.log("GET /evalForm")

    var user = "Shenn"
    res.render("evalForm.hbs", {
        user
    })
})

router.get("/evalFinish",(req,res)=>{
    console.log("GET /evalFinish")

    var user = "Shenn"
    if(user === "tutor"){
        res.redirect("/tutor")
    }

    else{
        res.redirect("/tutee")
        // res.render("")
    }
})

// newest additions
function encrypt(text) {
    return crypto.createHash("md5").update(text).digest("hex")
}

module.exports = router
