const express = require("express")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")


const router = express.Router()

const Tutee = require("../model/tutee")
const Tutor = require("../model/tutor")
const Request = require("../model/request")
const Feedback = require("../model/feedback")
const Evaluation = require("../model/evaluation")
const Announcement = require("../model/announcement")
const Matching = require("../model/matching");
const Subjects = require("../model/subjects");

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended: true
})

const UPLOAD_PATH = path.resolve(__dirname, "../resources/announcements")
const upload = multer({
  dest: UPLOAD_PATH,
  limits: {
    filesize: 100000,
    files: 2
  }
})

router.use("/tutee", require("./tutee"))
router.use("/tutor", require("./tutor"))



router.get("/adminPage", (req, res) => {
  console.log("GET /adminpage")
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
})

router.post("/addAnnouncement", upload.single("announcementImg"), urlencoder, (req, res) => {
  console.log("POST /addAnnouncement")
  var announcementName = req.body.announcementName
  var announcementInfo = req.body.announcementInfo
  var announcementImg = req.file.filename
  var announcementTool = true

  Announcement.createNewAnnouncement(announcementName, announcementImg, announcementInfo).then((addedAnnouncement) => {
    Tutee.getAllTutees().then((tutee) => {
      Tutor.getAllTutors().then((tutor) => {
        Tutor.getAllTutorApps().then((tutorApp) => {
          Request.getAllRequests().then((request) => {
            Feedback.getAllFeedback().then((feedback) => {
              Evaluation.getAllEvaluations().then((evaluation) => {
                Announcement.getAllAnnouncements().then((announcement) => {
                  Tutor.getOneByEmail(req.session.email).then((user) => {
                    res.render("adminPage.hbs", {
                      user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, announcementTool
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
  }, (err) => { // error with adding announcement
    var error = "Announcement name already used!"

    Tutee.getAllTutees().then((tutee) => {
      Tutor.getAllTutors().then((tutor) => {
        Tutor.getAllTutorApps().then((tutorApp) => {
          Request.getAllRequests().then((request) => {
            Feedback.getAllFeedback().then((feedback) => {
              Evaluation.getAllEvaluations().then((evaluation) => {
                Announcement.getAllAnnouncements().then((announcement) => {
                  Tutor.getOneByEmail(req.session.email).then((user) => {
                    res.render("adminPage.hbs", {
                      user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, announcementTool, error
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
  })
})

router.post("/deleteAnnouncement", urlencoder, (req, res) => {
  console.log("POST /deleteAnnouncement")
  var announcementName = req.body.specificAnnouncementName
  var announcementTool = true

  Announcement.deleteAnnouncement(announcementName).then((removedAnnouncement) =>
    Tutee.getAllTutees().then((tutee) => {
      Tutor.getAllTutors().then((tutor) => {
        Tutor.getAllTutorApps().then((tutorApp) => {
          Request.getAllRequests().then((request) => {
            Feedback.getAllFeedback().then((feedback) => {
              Evaluation.getAllEvaluations().then((evaluation) => {
                Announcement.getAllAnnouncements().then((announcement) => {
                  Tutor.getOneByEmail(req.session.email).then((user) => {
                    res.render("adminPage.hbs", {
                      user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, announcementTool
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
  )
})

router.post("/termEndStatus", urlencoder, (req, res) => {
  var termEnd = req.body.termEnd;
  console.log(termEnd)

  var evaluateTool = true

  Tutee.updateTermEnd(termEnd).then((userTerm) => {
    Tutor.updateTermEnd(termEnd).then((usersTerms) => {
      Tutee.getAllTutees().then((tutee) => {
        Tutor.getAllTutors().then((tutor) => {
          Tutor.getAllTutorApps().then((tutorApp) => {
            Request.getAllRequests().then((request) => {
              Feedback.getAllFeedback().then((feedback) => {
                Evaluation.getAllEvaluations().then((evaluation) => {
                  Announcement.getAllAnnouncements().then((announcement) => {
                    Tutor.getOneByEmail(req.session.email).then((user) => {
                      res.render("adminPage.hbs", {
                        user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp
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
    }, (err) => {
      console.log("update all tutors error")
    })
  }, (err) => {
    console.log("update all tutees error")
  })
})

router.post("/demoteAdmin", urlencoder, (req, res) => {
  var email = req.body.specificTutorEmail
  console.log(email)

  var tutorTool = true;
  var demoteAdminSuccess = true;

  Tutor.demoteAdmin(email).then((updatedUser) =>
    Tutee.getAllTutees().then((tutee) => {
      Tutor.getAllTutors().then((tutor) => {
        Tutor.getAllTutorApps().then((tutorApp) => {
          Request.getAllRequests().then((request) => {
            Feedback.getAllFeedback().then((feedback) => {
              Evaluation.getAllEvaluations().then((evaluation) => {
                Announcement.getAllAnnouncements().then((announcement) => {
                  Tutor.getOneByEmail(req.session.email).then((user) => {
                    res.render("adminPage.hbs", {
                      user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tutorTool, demoteAdminSuccess, email
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
  )
})

router.post("/promoteTutor", urlencoder, (req, res) => {
  var email = req.body.specificTutorEmail
  console.log(email)
  var tutorTool = true;
  var promoteTutorSuccess = true;


  Tutor.promoteTutor(email).then((updatedUser) =>
    Tutee.getAllTutees().then((tutee) => {
      Tutor.getAllTutors().then((tutor) => {
        Tutor.getAllTutorApps().then((tutorApp) => {
          Request.getAllRequests().then((request) => {
            Feedback.getAllFeedback().then((feedback) => {
              Evaluation.getAllEvaluations().then((evaluation) => {
                Announcement.getAllAnnouncements().then((announcement) => {
                  Tutor.getOneByEmail(req.session.email).then((user) => {
                    res.render("adminPage.hbs", {
                      user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tutorTool, promoteTutorSuccess, email
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
  )
})

router.post("/demoteTutor", urlencoder, (req, res) => {
  var email = req.body.specificTutorEmail
  console.log(email)

  var tuteeTool = true;
  var demoteTutorSuccess = true;

  Tutor.getOneByEmail(email).then((user) => {

    if (user != null) {
      if (user.freeTime.toString() !== "") {
        Tutee.createNewTuteeWithSchedule(
          user.name,
          user.email,
          user.password,
          user.idNum,
          user.contactNum,
          user.campus,
          user.course,
          user.freeTime
        )
      }
      else {
        Tutee.createNewTutee(
          user.name,
          user.email,
          user.password,
          user.idNum,
          user.contactNum,
          user.campus,
          user.course
        )
      }

      Tutor.demoteTutor(email).then((removedUser) => {
        Tutee.getAllTutees().then((tutee) => {
          Tutor.getAllTutors().then((tutor) => {
            Tutor.getAllTutorApps().then((tutorApp) => {
              Request.getAllRequests().then((request) => {
                Feedback.getAllFeedback().then((feedback) => {
                  Evaluation.getAllEvaluations().then((evaluation) => {
                    Announcement.getAllAnnouncements().then((announcement) => {
                      Tutor.getOneByEmail(req.session.email).then((user) => {
                        res.render("adminPage.hbs", {
                          user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tuteeTool, demoteTutorSuccess, email
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
      }, (err) => {
        console.log("demote tutor error")
      })
      // }, (err) => {
      //   console.log("create new tutee error")
      // })
    }
  })

})

router.post("/promoteTutee", urlencoder, (req, res) => {
  var email = req.body.specificTuteeEmail;

  console.log(email)

  var tutorTool = true;
  var promoteTuteeSuccess = true;


  Tutee.getOneByEmail(email).then((user) => {
    if (user != null) {
      Tutor.createNewTutor(
        user.name,
        user.idNum,
        user.email,
        user.contactNum,
        user.course,
        user.campus,
        user.freeTime,
        user.password
      ).then((newTutee) => {
        Tutee.removeTutee(email).then((removedUser) => {
          Tutee.getAllTutees().then((tutee) => {
            Tutor.getAllTutors().then((tutor) => {
              Tutor.getAllTutorApps().then((tutorApp) => {
                Request.getAllRequests().then((request) => {
                  Feedback.getAllFeedback().then((feedback) => {
                    Evaluation.getAllEvaluations().then((evaluation) => {
                      Announcement.getAllAnnouncements().then((announcement) => {
                        Tutor.getOneByEmail(req.session.email).then((user) => {
                          res.render("adminPage.hbs", {
                            user,
                            tutee,
                            tutor,
                            request,
                            feedback,
                            evaluation,
                            announcement,
                            tutorApp,
                            tutorTool,
                            promoteTuteeSuccess,
                            email
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
        }, (err) => {
          console.log("demote tutor error")
        })
      }, (err) => {
        console.log("create new tutee error")
      })
    }
  })


})

router.post("/toggleActiveTutor", urlencoder, (req, res) => {
  var email = req.body.specificTutorEmail
  var isActive = req.body.specificTutorActive
  console.log(email)
  var tutorTool = true

  if (isActive === "true") {
    Tutor.deactivateTutor(email).then((updatedUser) =>
      Tutee.getAllTutees().then((tutee) => {
        Tutor.getAllTutors().then((tutor) => {
          Tutor.getAllTutorApps().then((tutorApp) => {
            Request.getAllRequests().then((request) => {
              Feedback.getAllFeedback().then((feedback) => {
                Evaluation.getAllEvaluations().then((evaluation) => {
                  Announcement.getAllAnnouncements().then((announcement) => {
                    Tutor.getOneByEmail(req.session.email).then((user) => {
                      res.render("adminPage.hbs", {
                        user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tutorTool
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
    )
  }

  else {
    Tutor.activateTutor(email).then((updatedUser) =>
      Tutee.getAllTutees().then((tutee) => {
        Tutor.getAllTutors().then((tutor) => {
          Tutor.getAllTutorApps().then((tutorApp) => {
            Request.getAllRequests().then((request) => {
              Feedback.getAllFeedback().then((feedback) => {
                Evaluation.getAllEvaluations().then((evaluation) => {
                  Announcement.getAllAnnouncements().then((announcement) => {
                    Tutor.getOneByEmail(req.session.email).then((user) => {
                      res.render("adminPage.hbs", {
                        user, tutee, tutor, request, feedback, evaluation, announcement, tutorApp, tutorTool
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
    )
  }

})

router.post("/toggleActiveTutee", urlencoder, (req, res) => {
  var email = req.body.specificTuteeEmail
  var isActive = req.body.specificTuteeActive
  console.log(email)
  var tuteeTool = true

  if (isActive === "true") {
    Tutee.deactivateTutee(email).then((updatedUser) =>
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
    )
  }

  else {
    Tutee.activateTutee(email).then((updatedUser) =>
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
    )
  }
})

router.post("/autoMatch", urlencoder, (req, res) => {
  console.log("AUTO MATCH PLEASE " + req.body.manualRequestID)
  // Tutor.updateTermStart(req.body.toggleVal).then((user) => {
  //     res.send({})
  // })

  var id = req.body.manualRequestID;
  var matchError = "";
  var requestTool = true;
  var autoMatched = "";


  Request.getOneByID(id).then((request)=>{
      if(request != null){
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
      else{
          matchError = "Invalid requestID";
      }
  })


  Tutee.getAllTutees().then((tutee) => {
    Tutor.getAllTutors().then((tutor) => {
      Tutor.getAllTutorApps().then((tutorApp) => {
        Request.getAllRequests().then((request) => {
          Feedback.getAllFeedback().then((feedback) => {
            Evaluation.getAllEvaluations().then((evaluation) => {
              Announcement.getAllAnnouncements().then((announcement) => {
                Tutor.getOneByEmail(req.session.email).then((user) => {
                    console.log(id)
                    res.render("adminPage.hbs", {
                        user, tutee, tutor, request, feedback, evaluation, announcement,
                        tutorApp, requestTool,
                        matchError, autoMatched, id
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

})

router.post("/manualMatch", urlencoder, (req, res) => {
  console.log("MANUAL MATCH PLEASE " + req.body.manualRequestID)
  // Tutor.updateTermStart(req.body.toggleVal).then((user) => {
  //     res.send({})
  // })

  var id = req.body.manualRequestID;

  Request.getOneByID(id).then((request) => {
    if (request != null) {
      if (request.tutorName != null) {
        Tutor.getOneByEmail(req.session.email).then((user) => {
          Tutor.getAllTutors().then((tutor) => {
            console.log("Tutors:" + tutor)
            console.log("Requests:" + request)
            res.render("manualMatch.hbs", {
              request, tutor, user
            })
          })
        })

      }
      else {
        Tutor.getOneByEmail(req.session.email).then((user) => {
          Tutor.getAllTutors().then((tutor) => {
            res.render("manualMatch.hbs", {
              request, tutor, user
            })
          })
        })
      }
    }

  })
})

router.post("/manualMatchSuccess", urlencoder, (req, res) => {
  console.log("MANUAL MATCH SUCESS" + req.body.tutorEmail)
  console.log("MANUAL MATCH SUCESS" + req.body.requestID)

  Request.getOneByID(req.body.requestID).then((request) => {
    Tutor.getOneByEmail(req.body.tutorEmail).then((matchTutor) => {
      Request.newMatch(request._id, matchTutor.name).then((updatedRequest) => {
        Tutor.addTutee(matchTutor.email, request.email).then((notNeeded) => {
          console.log("Successfully manual matched")
          // go to admin page???
          res.redirect("/")
        })
      })
    })
  })



  // res.redirect("/")
})


/* IAN */
router.post("/termStartStatus", urlencoder, (req, res) => {
  console.log("PORKKKKK " + req.body.toggleVal)
  Tutor.updateTermStart(req.body.toggleVal).then((user) => {
    res.send({})
  })
})

router.post("/termEndStatusAJAX", urlencoder, (req, res) => {
  console.log("UPDATING TEND to " + req.body.toggleVal)
  Tutor.updateTermEnd(req.body.toggleVal).then((user) => {
    Tutee.updateTermEnd(req.body.toggleVal).then((user) => {
      res.send({})
    })
  })
})

router.get("/superAdminPage", (req, res) => {
  Tutor.getOneByEmail(req.session.email).then((user) => {
    res.render("superAdminPage.hbs", {
      user
    })
  }, (err) => {
    console.log("tutor error")
  })
})

router.post("/getSubjects", (req, res) => {
  Subjects.readSubjects().then((subjects) => {
    res.send({ subjects })
  })
})

router.post("/updateAnnouncement", urlencoder, (req, res) => {
  Announcement.updateAnnouncement(req.body.oldName, req.body.newName, req.body.newInfo).then((ann) => {
    res.send({})
  })
})

router.post("/evalSummary", urlencoder, (req, res) => {
  Evaluation.getAllEvaluations().then((evals)=>{
    res.render("evalSummary.hbs",{
      evals
    })
  })
})

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

router.get("/backBtn", (req, res) => {
  Tutor.getOneByEmail(req.session.email).then((user) => {
    res.render("superAdminPage.hbs", {
      user
    })
  }, (err) => {
    console.log("tutor error")
  })
})


module.exports = router
