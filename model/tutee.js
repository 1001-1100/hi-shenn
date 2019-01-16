const mongoose = require("mongoose");


var tuteeSchema = mongoose.Schema({
    campus:{
        type: String,
        default: null
    },

    name: {
        type: String,
        required: true,
        trim: true
    },
    
    idNum: {
        type: Number,
        // required: true,
        trim: true,
        // unique: true,
        default: 0
    },

    course: {
        type: String,
        // required: true,
        trim: true,
        default: null
    },

    contactNum: {
        type: String,
        // required: true,
        // unique: true,
        trim: true,
        default: null

    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    password: {
        type: String,
        required: true,
        trim: true
    },
    //
    
    typeOfTutorial:{
        type: String,
        default: null
    },

    subjects: {
        type: String,
        // required: true,
        default: null
    },

    preferredTutor:  {
        type: String,
        default: null
    },

    freeTime: {
        type: String,
        default: null
        // required: true
    },

    termEnd:{
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
    }

});

delete mongoose.connection.models['tutee'];
delete mongoose.connection.models['Tutee'];

var Tutee = mongoose.model("tutee", tuteeSchema);

var exports = module.exports = {};

exports.schema = tuteeSchema

// used to verify login (checking of matched user and password)
exports.login = function (email, password){
    return new Promise(function(res, rej){
        Tutee.findOne(
            {email,
             password
            }
        ).then((user)=>{
            // console.log("User " + founduser.name + " Found")
            res(user)
        }, (err)=>{
            console.log("User not found")
            rej(err)
        })  
    }) 
}

exports.getOneByName = function(name){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/getOneByName-----")

        Tutee.findOne({
            name
        }).then((user)=>{
            if(user != null){
                console.log ("*GOT ONE USER!*")
            }
            else{
                console.log ("*USER DOES NOT EXIST!*")
            }
            resolve(user)
        }, (err)=>{
            console.log ("*USER DOES NOT EXIST!*")
        })

    })
}

exports.getOneByEmail = function(emailAdd){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/getOneByEmail-----" + emailAdd)

        Tutee.findOne({
            email : emailAdd
        }).then((user)=>{
            if(user != null){
                console.log ("*GOT ONE USER!*")
            }
            else{
                console.log ("*USER DOES NOT EXIST!*")
            }
            resolve(user)
        }, (err)=>{
            console.log ("*USER DOES NOT EXIST!*")
        })

    })
}

exports.createNewTutee = function(name, email, password, idNum, contactNum, campus, course){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/createNew-----")

        var u = new Tutee({
            email, name, password, idNum, contactNum, campus, course
        })

        u.save().then((user)=>{
            console.log ("*NEW TUTEE CREATED!*")
            resolve(user)
        }, (err)=>{
            console.log ("*NEW USER NOT CREATED!*")
            console.log(err);
        })
    })
}

exports.createNewTuteeWithSchedule = function(name, email, password, idNum, contactNum, campus, course, freeTime){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/createNew-----")

        var u = new Tutee({
            email, name, password, idNum, contactNum, campus, course, freeTime
        })

        u.save().then((user)=>{
            console.log ("*NEW TUTEE CREATED!*")
            resolve(user)
        }, (err)=>{
            console.log ("*NEW USER NOT CREATED!*")
            console.log(err);
        })
    })
}

exports.updateContact = function(email, contactNum){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/editContact-----")

        Tutee.findOneAndUpdate(
            {email},
            {$set:{contactNum}},
            {returnNewDocument: true}

        ).then((user)=>{
            if(user!= null){
                resolve(user)
            }
        })

    })
}


exports.updatePassword = function(email, password){
    return new Promise(function(resolve, reject){
        console.log ("-----model/tutee/editPassword-----")

        Tutee.findOneAndUpdate(
            {email},
            {$set:{password}},
            {returnNewDocument: true}
        ).then((user)=>{
            if(user!= null){
            resolve(user)
            }
        })

    })
}

exports.getAllTutees = function(){
  return new Promise(function(resolve, reject){
    console.log("GETTING ALL TUTEES")
    
    Tutee.find({}).then((tutees)=>{
      console.log("Got all tutees")
      resolve(tutees)
    }, (err)=>{
      console.log("No Tutees Exist")
      reject(err)
    })
  })
}

exports.updateTermEnd = function(termEnd){
    return new Promise(function(resolve,reject){
        console.log(termEnd)

        Tutee.updateMany(
            {},
            {$set:{termEnd}},
            {multi: true})
        .then((user)=>{
            if(user!=null){
                resolve(user)
            }
        }, (err)=>{
          console.log("Error setting term end")
          reject(err)
        })
    })
}

exports.updateFreeTime = function(email, freeTime){
    return new Promise(function(resolve, reject){
        console.log("Update Free Time")

        Tutee.findOneAndUpdate(
            {email},
            {$set:{freeTime}},
            {returnNewDocument: true}
        ).then((user)=>{
            resolve(user)
        })

    })
}

exports.updateLastLogin = function(email){
    return new Promise(function(resolve, reject){
        console.log("Setting last login")

        Tutee.findOneAndUpdate(
            {email},
            {$set: {lastLogin: Date.now()}},
            {returnNewDocument: true}
        ).then((user)=>{
            if(user != null){
            resolve(user)
        }
    })
    })
}

exports.activateTutee = function(email){
    return new Promise(function(resolve, reject){
        Tutee.findOneAndUpdate(
            {email},
            {$set: {
                activeAccount:true
            }},
            {returnNewDocument: true}
        ).then((user)=>{
            if(user!= null){
                resolve(user)
            }
        })
    })
}

exports.deactivateTutee = function(email){
    return new Promise(function(resolve, reject){
        Tutee.findOneAndUpdate(
            {email},
            {$set: {
                activeAccount:false
            }},
            {returnNewDocument: true}
        ).then((user)=>{
            if(user!= null){
                resolve(user)
            }
        })
    })
}

exports.removeTutee = function(email){
    return new Promise(function(resolve, reject){
        Tutee.remove(
            {email}
        ).then((user)=>{
            if(user!= null){
                resolve(user)
            }
        })
    })
}
