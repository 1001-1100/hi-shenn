const express = require("express")
const router = express.Router()
const app = express()

const bodyparser = require("body-parser");
const crypto = require("crypto")
const fs = require("fs");
const cookieparser = require("cookie-parser")
// const multer = require("multer");
const path = require("path");
//makes forms readabel as request.body/request.query
const nodeMailer = require('nodemailer')

const urlencoder = bodyparser.urlencoded({
    extended: true
});


const Tutee = require("../model/tutee");
const Tutor = require("../model/tutor");
const Request = require("../model/request");
const Matching = require("../model/matching");
const Subjects = require("../model/subjects");

// router.use(cookieparser())
router.use(urlencoder)

// everything else

router.get("/applyTutor", (req, res) => {
    console.log("GET /applyTutor")

    if (req.session.type == "tutee") {

        Tutor.checkAppEmail(req.session.email).then((app) => {
            if (app != null) {
                var error = "You have already sent in an application this year!"
                console.log(error)
                Tutee.getOneByEmail(req.session.email).then((user) => {
                    res.render("applyTutor.hbs", {
                        user, error
                    })
                })
            }
            else {
                Tutee.getOneByEmail(req.session.email).then((user) => {
                    res.render("applyTutor.hbs", {
                        user
                    })
                })
            }
        })


    }
    else {
        res.render("applyTutor.hbs")
    }


})

router.post("/applyTutorFinished", urlencoder, (req, res) => {
    console.log("POST /applyTutorFinished")
    //  var user = "Test"


    var terms = req.body.terms;
    var extracurricular = req.body.extracurricular;
    var ptsquestion = req.body.ptsQuestion;
    var sched = req.body.schedule;


    console.log("sched= " + sched);
    console.log("Extra= " + extracurricular);


    if (req.session.email == null) {
        var name = req.body.name;
        var idNum = req.body.idNum;
        var mobileNum = req.body.mobileNum;
        var email = req.body.email;
        var course = req.body.course;


        Tutor.checkAppEmail(email).then((app) => {
            if (app != null) {
                var error = "You have already sent in an application this year!"
                console.log(error)
                res.render("applyTutor.hbs", {
                    error
                })
            }
            else {
                Tutor.createNewTutorApp(
                    name, idNum, mobileNum, email, course, terms,
                    extracurricular, ptsquestion, sched
                ).then((user) => {
                    console.log(user)

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
                        subject: '[PTS System] New Tutor Application - No Account',//req.body.subject, // Subject line
                        // text: req.body.body, // plain text body
                        html: 'Dear <b>PTS Admin</b>, <br><br> There is a new tutor application submitted by <b>'
                            + email + '</b>. Thank you. <br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.redirect("/")
                    });


                });
            }
        })


    }
    else if (req.session.email != null) {
        Tutee.getOneByEmail(req.session.email).then((user) => {
            Tutor.createNewTutorApp(
                user.name, user.idNum, user.contactNum, user.email, user.course, terms,
                extracurricular, ptsquestion, sched
            ).then((user) => {

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
                    subject: '[PTS System] New Tutor Application - Tutee',//req.body.subject, // Subject line
                    // text: req.body.body, // plain text body
                    html: 'Dear <b>PTS Admin</b>, <br><br> There is a new tutor application submitted by Tutee: <b>'
                        + req.session.email + '</b>. Thank you. <br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.redirect("/")
                });

            });
        })

    }


})

// router.post("acceptTutee", urlencoder, (req, res) => {
//     console.log("Accept Tutee")
//
//     var id = req.body.id
//
//     Request.acceptRequestByID(id).then((requests) => {
//         console.log("request accepted")
//     })
//
//     res.redirect("/")
// })
//
// router.post("rejectTutee", urlencoder, (req, res) => {
//     console.log("Reject Tutee")
//
//     console.log("WHAT TO DO IF REJECTED???")
//
//     res.redirect("/")
// })

router.get("/profTutor", (req, res) => {
    console.log("GET /profTutor")

    Tutor.getOneByEmail(req.session.email).then((user) => {
        res.render("profTutor.hbs", {
            user
        })
    })

})

router.post("/editContactNumber", urlencoder, (req, res) => {
    console.log("POST /editContactNumber")

    var contact = req.body.tContact;

    Tutor.getOneByEmail(req.session.email).then((user) => {
        if (user != null) {
            Tutor.updateContact(req.session.email, contact).then((user) => {
                Tutor.getOneByEmail(req.session.email).then((user) => {
                    if (user != null) {
                        res.render("profTutor.hbs", {
                            user
                        })
                    }
                })
            })
        }
    })
})


router.post("/editPassword", urlencoder, (req, res) => {
    console.log("POST /editPassword")


    var oldPass = encrypt(req.body.oldPassword);
    var newPass = encrypt(req.body.newPassword);

    console.log(req.session.email)
    Tutor.getOneByEmail(req.session.email).then((user) => {
        if (user != null) {

            if (user.password === oldPass) {
                Tutor.updatePassword(req.session.email, newPass).then((user) => {
                    Tutor.getOneByEmail(req.session.email).then((user) => {
                        if (user != null) {
                            res.render("profTutor.hbs", {
                                user
                            })
                        }
                    })
                })
            }
            else {
                var error = "Invalid Password";
                console.log("WOHH INVALID")
                res.render("profTutor.hbs", {
                    user, error
                })
            }

        }
    })
})

function encrypt(text) {
    return crypto.createHash("md5").update(text).digest("hex")
}

// IAN'S STUFF
router.post("/acceptTutee", urlencoder, (req, res) => {
    console.log("POST /acceptTutee")
    Request.acceptRequestByID(req.body.id).then((request) => {
        Tutor.addTutee(req.session.email, req.body.email).then((user) => {

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
                to: request.email + "",//"pts@dlsu.edu.ph", // list of receivers
                subject: '[PTS System] Tutor Request Accepted by: ' + request.tutorName,//req.body.subject, // Subject line
                // text: req.body.body, // plain text body
                html: 'Dear <b>' + request.tuteeName + '</b>, '
                    + '<br><br> Your Tutor Request for subject/s <b>' + request.subjects + " has now been accepted by <b>"
                    + request.tutorName + "</b> your matching free times are as follow <b>" + request.freeTime 
                    + "</b> You may also log in to our website to see the Tutor Match details. Thank you."
                    + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                // res.redirect("/")
            });


            res.send({})
        })
    })
})

/*
Subjects.readSubjects().then((allSubjects)=>{
    Tutor.getAllTutors().then((tutors)=>{
      var matched = Matching.match(request, tutors, allSubjects);

      if(matched!= null){
          var matchTutor = matched[2];
          if(matched[0] === "complete"){
              console.log("Found Tutor" + matchTutor)
              // start
              Request.newMatch(request._id, matchTutor.name).then((updatedRequest)=>{
                  Tutor.addTutee(matchTutor.email, request.email).then((notNeeded)=>{
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
                                  + '<br><br> There is a new Tutor Request by <b>' + request.email
                                  + '</b> who was automatically matched to you and is requesting for help in the subjects <b>' + request.subjects + '</b> and is free on the following schedules <b>'
                                  + request.freeTime + '</b> Kindly log in to our website to accept or decline <b>' + request.tuteeName + '</b>. Thank you.'
                                  + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
                          };

                          transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {
                                  return console.log(error);
                              }
                              console.log('Message %s sent: %s', info.messageId, info.response);
                          });

                      })
                  })
              })
          }

      }
      else{
          console.log("No match Tutor. Need to manual match")
          matchError = "No tutor matched through automation. Please manual match this request";
      }
    })
  })
}

*/

router.post("/rejectTutee", urlencoder, (req, res) => {
    console.log("POST /rejectTutee")
    Request.rejectRequestByID(req.body.id).then((request) => {
        Tutee.getOneByName(request.tuteeName).then((tutee)=> {
            Tutor.removeTutee(req.session.email, tutee.email).then((notNeeded)=> {
                Tutor.getAllTutorsExceptOneTutorName(request.tutorName).then((tutors)=>{

                    Subjects.readSubjects().then((allSubjects)=>{
                        var matched = Matching.match(request, tutors, allSubjects);

                        if(matched!= null){
                            var matchTutor = matched[2];
                            if(matched[0] === "complete"){
                                console.log("Found Tutor" + matchTutor)
                                // start
                                Request.newMatch(request._id, matchTutor.name).then((updatedRequest)=>{
                                    Tutor.addTutee(matchTutor.email, request.email).then((notNeeded)=>{
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
                                                    + '<br><br> There is a new Tutor Request by <b>' + request.email
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
                                to: "pts@dlsu.edu.ph", // list of receivers
                                subject: '[PTS System] Rejected Tutor Request Needs Manual Matching',//req.body.subject, // Subject line
                                // text: req.body.body, // plain text body
                                html: 'Dear <b>PTS Admin</b>, <br><br> There is a Tutor Request which was rejected by Tutor <b>'
                                    + req.session.email + '. </b> Tutee <b>' + tutee.email
                                    + '</b> is requesting for a Tutor who teaches <b>' + request.subjects + '</b> and is free on the following schedules <b>'
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

                    // var matchTutor = Matching.match(request, tutors);
                    // if(matchTutor != null){
                    //     console.log("Found Tutor" + matchTutor)
                    //     Request.newMatch(request._id, matchTutor.name).then((updatedRequest)=>{
                    //         Tutor.addTutee(matchTutor.email, user.email).then((notNeeded)=>{
                    //             console.log("Successfully updated request")
                    //             res.redirect("/")
                    //         })
                    //     })
                    // }
                    // else{
                    //     console.log("No match Tutor. Need to manual match")


                    //     let transporter = nodeMailer.createTransport({
                    //         host: 'smtp.gmail.com',
                    //         port: 465,
                    //         secure: true,
                    //         service: "Gmail",
                    //         auth: {
                    //             user: 'officialSystemPTS@gmail.com', // make sure the public privacy in gmail is turned on
                    //             pass: 'PTS1234!'
                    //         }
                    //     });

                    //     let mailOptions = {
                    //         from: '"Peer Tutors Society System" <officialSystemPTS@gmail.com>', // sender address
                    //         to: "pts@dlsu.edu.ph", // list of receivers
                    //         subject: '[PTS System] Rejected Tutor Request Needs Manual Matching',//req.body.subject, // Subject line
                    //         // text: req.body.body, // plain text body
                    //         html: 'Dear <b>PTS Admin</b>, <br><br> There is a Tutor Request which was rejected by Tutor <b>'
                    //             + req.session.email + '. </b> Tutee <b>' + tutee.email
                    //             + '</b> is requesting for a Tutor who teaches <b>' + request.subjects + '</b> and is free on the following schedules <b>'
                    //             + request.freeTime + '</b> Please do find time to manual match this Tutor Request. Thank you. '
                    //             + '<br><br>Regards, <br> <b>Peer Tutors Society System</b>' // html body
                    //     };

                    //     transporter.sendMail(mailOptions, (error, info) => {
                    //         if (error) {
                    //             return console.log(error);
                    //         }
                    //         console.log('Message %s sent: %s', info.messageId, info.response);
                    //         res.redirect("/")
                    //     });

                    // }
                })
            })
        })



        // automatch but remove tutor from name

        // res.send({})
    })
})

/* END OF IAN */

/*ADDED BY SHENN ON DECEMBER 8*/
router.get("/tutorDetails", (req, res) => {
    console.log("GET /tutorDetailsForm")
    Tutor.getOneByEmail(req.session.email).then((user) => {
        res.render("tutorDetailsForm.hbs", {
            user
        })
    })
})

router.post("/sendDetails", urlencoder, (req, res) => {
    console.log("POST /editContactNumber")

    var membership = req.body.membership;
    var tutorTerm = req.body.tutorTerm;
    var tutorialTypes = req.body.tutorialType;
    var tuteeCount = req.body.tuteeCount; /*done*/
    var topics = req.body.subject /*done*/
    var sched = req.body.schedule; /*done*/

    if (membership == "Yes"){
        membership = true
    }else{
        membership = false
    }


    if (tutorTerm == "Yes")
        tutorTerm = true
    else tutorTerm = false

    if(!membership){
        // prompt before accept please
        // demote to tutee and then deactivate
        res.redirect("/")
    }

    /*
    console.log("Continue Membership: " + membership)
    console.log("Will tutor next term: " + tutorTerm)
    console.log("Tutorial Types: " + tutorialTypes)
    console.log("How many tutees: " + tuteeCount)
    console.log("Topics: " + topics)
    console.log("Updated Free Time: " + sched)
    */

    if (!membership || !tutorTerm){
        Tutor.updateTutorDetailsV2(req.session.email, membership, tutorTerm).then((user) => {
            res.redirect("/")
        })
    } else {
        Tutor.updateTutorDetails(req.session.email, sched, tuteeCount, topics, membership, tutorTerm, tutorialTypes).then((user) => {
            res.redirect("/")
        })
    }
})

router.post("/updateNewlyPromoted", urlencoder, (req, res) => {
    let isNewlyPromoted = req.body.isNewlyPromoted
    Tutor.updateNewlyPromoted(req.session.email,isNewlyPromoted).then((user)=>{
        res.send({})
    })
})

router.post("/getTutorSubjects", urlencoder, (req, res) => {

    var subjects = [];

    Tutor.getAllTutors().then((tutors)=>{
        for(var i=0; i<tutors.length; i++) {
            if (!tutors.subjects === "") {

                var tutorSubs = tutors.subjects.split(",");
                if (subjects.length===0 || subjects == null || subjects === "") {
                    for (var s = 0; s < tutorSubs.length; s++) {
                        subjects.push(tutorSubs[s])
                    }
                }
                else {
                    for (var s = 0; s < tutorSubs.length; s++) {
                        if (!subjects.includes(tutorSubs[s])) {
                            subjects.push(tutorSubs[s])

                        }
                    }
                }
            }
        }

        res.send({subjects})
    })


})


/*END OF ADDED BY SHENN*/

/*IAN SUBJECTS AJAX*/
router.post("/getAllSubjects", urlencoder, (req, res) => {
    // let subjects = require('../model/subjects').subjects
    Subjects.readSubjects().then((subjects) => {
        res.send({ subjects })
      })
})

// router.post("/getAllTutors", urlencoder, (req, res) => {
//     Tutor.getAllAvailableTutorsExceptSelf(req.session.email).then((tutors)=>{
//         res.send({tutors})
//     })
// })

function remove_duplicates(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;

}

router.post("/getAvailableTutorsAndSubjects", urlencoder, (req, res) => {
    let availableSubjects = []
    Subjects.readSubjects().then((subjects) => {
        Tutor.getAllAvailableTutorsExceptSelf(req.session.email).then((tutors) => {
            for (let i = 0; i < tutors.length; i++) {
                let tSubj = tutors[i].subjects
                console.log("TSUBJ : " + tSubj)
                if (tSubj != null) {
                    tSubj = tSubj.split(",")
                    availableSubjects = availableSubjects.concat(tSubj)
                }
            }
            console.log("AVAILABLE: " + availableSubjects)
            // other subjects is all the subjects in the subjects array
            // that are not in available subjects array
            let otherSubjects = []
            let toConcat = []
            for (let i = 0; i < subjects.length; i++) {
                let found = false
                for (let j = 0; j < availableSubjects.length; j++) {
                    if (subjects[i].includes(availableSubjects[j])) {
                        toConcat = toConcat.concat(subjects[i])
                        found = true
                    } else {
                        console.log("SUBJ FOUND NOT AVAIL: " + subjects[i])
                    }
                }
                if (!found) {
                    otherSubjects = otherSubjects.concat(subjects[i])
                }
            }
            availableSubjects = availableSubjects.concat(toConcat)

            // remove duplicates
            availableSubjects = remove_duplicates(availableSubjects)
            otherSubjects = remove_duplicates(otherSubjects)

            res.send({ tutors, availableSubjects, otherSubjects })
        })
    })

})

router.post("/getTutorsAJAX", urlencoder, (req, res) => {
    Tutee.getOneByEmail(req.session.email).then((tutee)=>{
        console.log(tutee.name)
        Tutor.getAllTutorsOfTutee(tutee.email).then((tutors)=>{
            console.log(tutors)
            res.send({tutors})
        })
    })
    
    // let subjects = require('../model/subjects').subjects
})

module.exports = router;

