const express = require("express")
const router = express.Router()
const app = express()

const bodyparser = require("body-parser");
const crypto = require("crypto")
const fs = require("fs");
const cookieparser = require("cookie-parser")
// const multer = require("multer");
const path = require("path");
// makes forms readabel as request.body/request.query
const nodeMailer = require('nodemailer')
const urlencoder = bodyparser.urlencoded({
    extended: true
});


const Tutee = require("../model/tutee");
const Tutor = require("../model/tutor");
const Request = require("../model/request");
const Feedback = require("../model/feedback");
const Evaluation = require("../model/evaluation");
const Matching = require("../model/matching");
const Subjects = require("../model/subjects");


// router.use(cookieparser())
router.use(urlencoder)

// everything else
// start of Adrians routing

router.get("/tutee", (req, res)=>{
    console.log("GET /tutee")

    Tutee.getOneByEmail(req.session.email).then((user)=> {
        // console.log(user)
        if (user != null) {
            res.render("tuteeHome.hbs", {
                user
            })
        }
    })
    // res.render("tuteeHome.hbs", {
    //
    // })
})


router.get("/tutorRequest", (req, res)=>{
    console.log("GET /requestTutor")

    Tutee.getOneByEmail(req.session.email).then((user)=> {
        if (user != null) {
            res.render("requestTutor.hbs", {
                user
            })
        }
        else{
            Tutor.getOneByEmail(req.session.email).then((user)=>{
                if(user != null){
                    res.render("requestTutor.hbs", {
                        user
                    })
                }
                else{
                    res.redirect("/")
                }

            })
        }
    })

})

router.post("/submitTutorRequest", urlencoder, (req, res)=>{
    console.log("POST /submitTutorRequest")

    // var campus = req.body.campus;
    // var name = req.body.name;
    // var email = req.body.email;
    var mobile = req.body.mobile;
    // var id = req.body.id;
    // var course = req.body.course;
    var type = req.body.type;
    var subject = req.body.subject;
    var tutor = req.body.tutor;
    var schedule = req.body.schedule;


    console.log(subject);
    console.log(schedule);


    Tutee.getOneByEmail(req.session.email).then((user)=>{
        if(user != null){
            Subjects.readSubjects().then((allSubjects)=>{
                Request.createNewTutorRequest(
                    user.campus, user.name, user.idNum, user.course, mobile, user.email, type, subject, tutor, schedule
                ).then((request)=>{
                    if(request != null){
                        Tutee.updateFreeTime(req.session.email, schedule).then((check)=>{

                            // let flag
                            // while(flag)
                            Tutor.getAllTutors().then((tutors)=>{
                                var matched = Matching.match(request, tutors, allSubjects);

                                if(matched!= null){
                                    var matchTutor = matched[2];
                                    if(matched[0] === "complete"){
                                        console.log("Found Tutor" + matchTutor)
                                        // start
                                        Request.newMatch(request._id, matchTutor.name).then((updatedRequest)=>{
                                            Tutor.addTutee(matchTutor.email, user.email).then((notNeeded)=>{
                                                console.log("Successfully updated request")

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
                                                    to: matchTutor.email + "",//"pts@dlsu.edu.ph", // list of receivers
                                                    subject: '[PTS System] New Tutor Request Match by: ' + request.tuteeName,//req.body.subject, // Subject line
                                                    // text: req.body.body, // plain text body
                                                    html: 'Dear <b>' + matchTutor.name + '</b>, '
                                                        + '<br><br> There is a new Tutor Request by <b>' + req.session.email
                                                        + '</b> who was automatically matched to you and is requesting for help in the subjects <b>' + request.subjects + '</b> and is free on the following schedules <b>'
                                                        + request.freeTime + '</b> Kindly log in to our website to accept or decline <b>' + request.tuteeName + '</b>. Thank you.'
                                                        + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
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
                                        // end
                                    }
                                    else if(matched[0] === "split"){

                                        Request.newMatchThenSplit(request._id, matchTutor, matched[3]).then((noNeedAgain)=>{
                                            let campus = request.campus;
                                            let tuteeName = request.tuteeName;
                                            let idNum = request.idNum;
                                            let course = request.course;
                                            let contactNum = request.contactNum;
                                            let email = request.email;
                                            let type = request.type;
                                            let subjects = matched[4];
                                            let preferredTutor = request.preferredTutor;
                                            let freeTime = request.freeTime;
                                            Request.createNewTutorRequest(campus, tuteeName, idNum, course, contactNum, email, type, subjects, preferredTutor, freeTime).then((latestRequest)=>{
                                                Tutor.addTutee(matchTutor.email, user.email).then((notNeeded)=>{
                                                    console.log("Successfully matched then split request")

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
                                                        to: matchTutor.email + "",//"pts@dlsu.edu.ph", // list of receivers
                                                        subject: '[PTS System] New Tutor Request Match by: ',//req.body.subject, // Subject line
                                                        // text: req.body.body, // plain text body
                                                        html: 'Dear <b>' + matchTutor.name + '</b>, '
                                                            + '<br><br> There is a new Tutor Request by <b>' + req.session.email
                                                            + '</b> who was automatically matched to you and is requesting for help in the subjects <b>' + request.subjects + '</b> and is free on the following schedules <b>'
                                                            + request.freeTime + '</b> Kindly log in to our website to accept or decline <b>' + request.tuteeName + '</b>. Thank you.'
                                                            + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
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
                                        })
                                    }

                                }
                                else{
                                    console.log("No match Tutor. Need to manual match")
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
                                        to: "adrian_mendoza@dlsu.edu.ph",//"pts@dlsu.edu.ph", // list of receivers
                                        subject: '[PTS System] Tutor Request Needs Manual Matching',//req.body.subject, // Subject line
                                        // text: req.body.body, // plain text body
                                        html: 'Dear <b>PTS Admin</b>, '
                                            + '<br><br> There is a Tutor Request by <b>' + req.session.email
                                            + '</b> and is requesting for a Tutor who teaches <b>' + request.subjects + '</b> and is free on the following schedules <b>'
                                            + request.freeTime + '</b> Please do find time to manual match this Tutor Request. Thank you. '
                                            + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
                                    };

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log('Message %s sent: %s', info.messageId, info.response);
                                        res.redirect("/")
                                    });
                                }
                            })
                        })
                    }
                    else{
                        console.log(request)
                    }
                })
            })
        }

    });


})


router.get("/profStudent",(req,res)=>{
    console.log("GET /profStudent")

    Tutee.getOneByEmail(req.session.email).then((user)=>{
        if(user != null){
            res.render("profStudent.hbs", {
                user
            })
        }
    })

})

router.post("/editContactNumber", urlencoder, (req, res)=>{
    console.log("POST /editContactNumber")

    var contact = req.body.tContact;

    Tutee.getOneByEmail(req.session.email).then((user)=>{
        if(user != null){

            Tutee.updateContact(req.session.email, contact).then((user)=>{
                Tutee.getOneByEmail(req.session.email).then((user)=>{
                    if(user != null){
                        res.render("profStudent.hbs", {
                            user
                        })
                    }
                })
            })
        }
    })
})

router.post("/editPassword", urlencoder, (req, res)=>{
    console.log("POST /editPassword")


    var oldPass = encrypt(req.body.oldPassword);
    var newPass = encrypt(req.body.newPassword);

    Tutee.getOneByEmail(req.session.email).then((user)=>{
        if(user != null){

            if(user.password === oldPass){

                Tutee.updatePassword(req.session.email, newPass).then((user)=>{
                    Tutee.getOneByEmail(req.session.email).then((user)=>{
                        if(user != null){
                            res.render("profStudent.hbs", {
                                user
                            })
                        }
                    })
                })
            }
            else{
                var error = "Invalid Password";
                console.log("WOHH INVALID")
                res.render("profStudent.hbs", {
                    user, error
                })
            }

    }
    })
})

router.get("/evaluate", (req, res)=>{
    console.log("Get /evaluate")

    Tutee.getOneByEmail(req.session.email).then((user)=>{
        res.render("evalForm.hbs", {
            user
        })
    })
})

router.post("/evaluateTutor", urlencoder, (req, res)=>{
    console.log("POST /evaluateTutor")



    Tutee.getOneByEmail(req.session.email).then((user)=>{
        var name = user.name;
        var tutor = req.body.tutor;
        var subject = req.body.subject;
        var hearPTS = req.body.hearPTS;

        var frequency = req.body.frequency;
        var punctuality = req.body.punctuality;
        var preparedness = req.body.preparedness;
        var explanation = req.body.explanation;
        var exercises = req.body.exercises;
        var relevance = req.body.relevance;
        var enthusiasm = req.body.enthusiasm;
        var openness = req.body.openness;
        var confidence = req.body.confidence;

        var knowledgable = req.body.knowledgable;
        var voiceModulation = req.body.voiceModulation;
        var qa = req.body.qa;
        var effectiveness = req.body.effectiveness;
        var encouraging = req.body.encouraging;
        var comments = req.body.comments;
        var message = req.body.message;

        console.log("Name: " + name)
        console.log("Tutor: " + tutor)
        console.log("Subject Tackled: " + subject)
        console.log("Hear PTS: " + hearPTS)

        console.log("Frequency: " + frequency)
        console.log("Punctuality: " + punctuality)
        console.log("Preparedness: " + preparedness)
        console.log("Explanation: " + explanation)
        console.log("Exercises: " + exercises)
        console.log("Relevance: " + relevance)
        console.log("Enthusiasm: " + enthusiasm)
        console.log("Openness: " + openness)
        console.log("Confidence: " + confidence)

        console.log("Knowledgable: " + knowledgable)
        console.log("Voice Modulation: " + voiceModulation)
        console.log("Q & A: " + qa)
        console.log("Effectiveness: " + effectiveness)
        console.log("Encouraging: " + encouraging)
        console.log("Comments: " + comments)
        console.log("Message: " + message)

        Evaluation.createNewEvaluation(tutor, name, hearPTS, comments, message, frequency, punctuality, preparedness, explanation,
            exercises, relevance, enthusiasm, openness, confidence, knowledgable, voiceModulation, qa, effectiveness, encouraging).then(()=>{
            res.redirect("/")
        }, (err) =>{
                console.log(err)
        })


    })



})


function encrypt(text) {
    return crypto.createHash("md5").update(text).digest("hex")
}

module.exports = router;