const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tutorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    idNum: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    contactNum: {
        type: String,
        // required: true,
        unique: true,
        trim: true
    },

    course: {
        type: String,
        // required: true,
        trim: true
    },

    campus: {
        type: String,
        default: null
    },

    freeTime: {
        type: String,
        // required: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        default: "45efa39c6bfcf5e4f30797d29332f431"
    },

    subjects: {
        type: String,
        // required: true
    },

    tutees: {
        type: [String],
        default: [],
        // required: true
    },

    tuteeCapacity: {
        type: Number,
        default: 0,
        // required: true
    },

    membershipExpiration: {
        type: Date,
        // required: true
    },

    tutorType: {
        type: String,
        default: "Tutor"
    },

    admin: {
        type: Boolean,
        default: false
    },

    superAdmin: {
        type: Boolean,
        default: false
    },

    termEnd: {
        type: Boolean,
        default: false
    },

    termStart: {
        type: Boolean,
        default: false
    },

    lastLogin: {
        type: Date,
        default: Date.now()
    },

    activeAccount: {
        type: Boolean,
        default: true
    },

    /*ADDED BY SHENN*/
    membership: {
        type: Boolean,
        default: true
    },

    tutorTerm: {
        type: Boolean,
        default: true
    },

    tutorialType: {
        type: String,
        default: "one"
    },

    newlyPromoted: {
        type: Boolean,
        default: true
    }

});

var tutorApplicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    idNum: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },

    contactNum: {
        type: String,
        required: true,
        // unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true
    },

    course: {
        type: String,
        required: true,
        trim: true
    },

    termsLeft: {
        type: Number,
        required: true,
        trim: true
    },

    extraCurricular: {
        type: String,
        required: true
    },

    shortAnswer: {
        type: String,
        required: true
    },

    freeTime: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    dateSubmitted: {
        type: Date,
        default: Date.now()
    }
});

var Tutor = mongoose.model("tutor", tutorSchema);
// module.exports = {Tutor};

var TutorApp = mongoose.model("tutorApp", tutorApplicationSchema);

var exports = module.exports = {};

// used to verify login (checking of matched user and password)
exports.login = function (email, password) {
    return new Promise(function (res, rej) {
        Tutor.findOne({
            email,
            password
        }).then((user) => {
            res(user)
        }, (err) => {
            console.log("User not found")
            rej(err)
        })
    })
}

exports.getOneByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutor/getOneByEmail-----")

        Tutor.findOne({
            email
        }).then((user) => {
            resolve(user)
        }, (err) => {
            console.log("*USER DOES NOT EXIST!*")
        })

    })
}

exports.checkAppEmail = function (emailAdd) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutor/getOneByEmail-----")

        TutorApp.findOne({
            email: emailAdd
        }).then((user) => {
            resolve(user)
        }, (err) => {
            console.log("*USER DOES NOT EXIST!*")
        })

    })
}

exports.createNewTutorApp = function (name, idNum, contactNum, email, course, termsLeft, extraCurricular, shortAnswer, freeTime) {
    return new Promise(function (resolve, reject) {

        console.log("-----model/tutor/createNewTutorApp-----")

        var status = "pending";

        var u = new TutorApp({ name, idNum, contactNum, email, course, termsLeft, extraCurricular, shortAnswer, freeTime, status })

        u.save().then((user) => {
            console.log("*NEW TUTOR APP CREATED CREATED!*")
            resolve(user)
        }, (err) => {
            console.log("*NEW TUTOR APP NOT CREATED!*")
            console.log(err);
        })
    })
}

exports.getAllTutorApps = function () {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTOR APPS")

        TutorApp.find({}).then((tutorApps) => {
            console.log("Got all tutor apps")
            resolve(tutorApps)
        }, (err) => {
            console.log("No Tutor apps Exist")
            reject(err)
        })
    })
}

exports.createNewTutor = function (name, idNum, email, contactNum, course, campus, freeTime, password) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutor/createNewTutor-----")

        var u = new Tutor({ name, idNum, email, contactNum, course, campus, freeTime, password })

        u.save().then((user) => {
            console.log("*NEW TUTOR CREATED!*")
            resolve(user)
        }, (err) => {
            console.log("*NEW USER NOT CREATED!*")
            console.log(err);
        })
    })
}

exports.updateContact = function (email, contactNum) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/editContact-----")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { contactNum } },
            { returnNewDocument: true }

        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })

    })
}


exports.updatePassword = function (email, password) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/editPassword-----")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { password } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })

    })
}

exports.getAllTutors = function () {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTORS")

        Tutor.find({ superAdmin: "false" }).then((tutors) => {
            console.log("Got all tutors")
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist")
            reject(err)
        })
    })
}

exports.getAllAllTutors = function () {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTORS")

        Tutor.find({}).then((tutors) => {
            console.log("Got all tutors")
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist")
            reject(err)
        })
    })
}

exports.getAllTutorsExceptOneTutorName = function (tutorName) {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTORS EXCEPT ONE TUTOR NAME")

        Tutor.find(
            { name: { $ne: tutorName } }
        ).then((tutors) => {
            console.log("Got all tutors" + tutors)
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist")
            reject(err)
        })

    })
}

exports.removeTutee = function (email, tuteeEmail) {
    return new Promise(function (resolve, reject) {
        console.log("REMOVE TUTEE")

        Tutor.findOneAndUpdate(
            { email },
            { $pull: { tutees: tuteeEmail } },
            { returnNewDocument: true }
        ).then((tutors) => {
            console.log("Got all tutors" + tutors)
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist")
            reject(err)
        })

    })
}

exports.updateTermEnd = function (termEnd) {
    return new Promise(function (resolve, reject) {
        console.log(termEnd)

        Tutor.updateMany(
            {},
            { $set: { termEnd } },
            { multi: true })
            .then((user) => {
                if (user != null) {
                    resolve(user)
                }
            }, (err) => {
                console.log("Error setting term end")
                reject(err)
            })
    })
}

exports.updateLastLogin = function (email) {
    return new Promise(function (resolve, reject) {
        console.log("Setting last login")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { lastLogin: Date.now() } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })
    })
}

exports.addTutee = function (email, tuteeEmail) {
    return new Promise(function (resolve, reject) {
        Tutor.findOne(
            {
                email,
                tutees: tuteeEmail
            }
        ).then((tutor) => {
            if (tutor == null) {
                console.log("WALANG TUTOR NA MAY TUTEE DIN SIYA")
                Tutor.findOneAndUpdate(
                    { email },
                    { $push: { tutees: tuteeEmail } }
                ).then((user) => {
                    if (user != null) {
                        resolve(user)
                    }
                })
            }
            else if (tutor != null) {
                console.log("ANDUN NA TUTOR " + tutor)
                resolve(tutor)
            }
        })



        //
        // Tutor.find({email}).then((tutor)=>{
        //     tutor.tutees.some(function (tuteeEmail) {
        //
        //     })
        // })
        //
        // var isInArray = user.friends.some(function (friend) {
        //     return friend.equals(about.id);
        // });
    })
}

exports.demoteAdmin = function (email) {
    return new Promise(function (resolve, reject) {
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    tutorType: "tutor",
                    admin: false
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                console.log("nice")
                resolve(user)
            }
        })
    })
}

exports.promoteTutor = function (email) {
    return new Promise(function (resolve, reject) {
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    tutorType: "admin",
                    admin: true
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })
    })
}

exports.demoteTutor = function (email) {
    return new Promise(function (resolve, reject) {
        Tutor.remove(
            { email }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })
    })
}

exports.activateTutor = function (email) {
    return new Promise(function (resolve, reject) {
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    activeAccount: true
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })
    })
}

exports.deactivateTutor = function (email) {
    return new Promise(function (resolve, reject) {
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    activeAccount: false
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })
    })
}

/* ADDED BY SHENN */
exports.updateSchedule = function (email, freeTime) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/updateSchedule-----")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { freeTime } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })

    })
}

exports.updateCapacity = function (email, tuteeCapacity) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/updateTuteeCapacity-----")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { tuteeCapacity } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })

    })
}

exports.updateSubjects = function (email, subjects) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/updateSubjects-----")

        Tutor.findOneAndUpdate(
            { email },
            { $set: { subjects } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        })

    })
}

/* IAN CHOOCHOO*/

exports.updateTermStart = function (termStart) {
    return new Promise(function (resolve, reject) {
        Tutor.updateMany(
            {},
            { $set: { termStart } },
            { multi: true })
            .then((user) => {
                if (user != null) {
                    resolve(user)
                }
            }, (err) => {
                console.log("Error setting term start")
                reject(err)
            })
    })
}

exports.updateTutorDetails = function (email, freeTime, tuteeCapacity, subjects, membership, tutorTerm, tutorialType) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/updateTutorDetails-----")
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    subjects,
                    tuteeCapacity,
                    freeTime,
                    membership,
                    tutorTerm,
                    tutorialType
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            resolve(user)
        }, (err) => {
            reject(err)
        })

    })
}

exports.updateTutorDetailsV2 = function (email, membership, tutorTerm) {
    return new Promise(function (resolve, reject) {
        console.log("-----model/tutee/updateTutorDetails-----")
        Tutor.findOneAndUpdate(
            { email },
            {
                $set: {
                    membership,
                    tutorTerm
                }
            },
            { returnNewDocument: true }
        ).then((user) => {
            resolve(user)
        }, (err) => {
            reject(err)
        })

    })
}

exports.updateNewlyPromoted = function (email, isNewlyPromoted) {
    return new Promise(function (resolve, reject) {
        Tutor.findOneAndUpdate(
            { email },
            { $set: { newlyPromoted: isNewlyPromoted } },
            { returnNewDocument: true }
        ).then((user) => {
            if (user != null) {
                resolve(user)
            }
        }, (err) => {
            reject(err)
        })
    })
}

exports.getAllAvailableTutorsExceptSelf = function (myemail) {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTORS")
        Tutor.find({
            email: {
                $ne: myemail
            },
            superAdmin: false,
            newlyPromoted: false,
            tutorTerm: true,
            membership: true,
            activeAccount: true
        }).then((tutors) => {
            console.log("Got all tutors")
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist")
            reject(err)
        })
    })
}

exports.getAllTutorsOfTutee = function (tutee) {
    return new Promise(function (resolve, reject) {
        console.log("GETTING ALL TUTORS")

        Tutor.find({
            tutees: {
                $in: tutee
            }
        }).then((tutors) => {
            console.log("Got all tutors of tutee")
            resolve(tutors)
        }, (err) => {
            console.log("No Tutors Exist for this tutee")
            reject(err)
        })
    })
}


/*END OF IAN*/