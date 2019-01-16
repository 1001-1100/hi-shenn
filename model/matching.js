// pseudocode




// tutors is an array of all tutors
// request is the request object made by the tutee
exports.match = function(request, tutors, allSubjects){
    // subject being requested

    let rSubject = request.subjects
    console.log(rSubject)


    let subjCount = request.subjects.split(",").length;

    for(let z =0; z<tutors.length; z++){
        if(tutors[z].name === request.preferredTutor){
            let tutor = tutors[z];


            if (canTeach(tutor) && notMaxLoad(tutor)){
                // let prefTeach = isTeaching(rSubject,tutor);
                let prefTeach = getSubjects(rSubject, tutor, allSubjects).split(",").length;
                console.log(prefTeach + " vs " + subjCount)
                if(prefTeach === subjCount){
                    if(matchingFreeTime(request,tutor) !== 0){
                        return ["complete", "preferred", tutor]
                    }
                }
                else if(prefTeach !== 0){
                    if(matchingFreeTime(request,tutor) !== 0){

                        return ["split", "preferred", tutor, getSubjects(rSubject, tutor, allSubjects), ""+getRemainingSubjects(rSubject, tutor, allSubjects)]
                    }
                }
                else{
                    console.log("getSubjects ===0")
                }
            }
            else{
                console.log("pref cant teach && not max load")
            }
        }
    }


    let tutorsNumOfSubjectsTeaching =[];
    let tutorsNumOfFreeTime =[];

    for(let z=0; z<tutors.length; z++){
        let tutor = tutors[z];


        if (canTeach(tutor) && notMaxLoad(tutor)){
            // let prefTeach = isTeaching(rSubject,tutor);
            if(getSubjects(rSubject, tutor, allSubjects) !== ""){
                let prefTeach = getSubjects(rSubject, tutor, allSubjects).split(",").length;
                console.log(prefTeach + " vs " + subjCount)
                if(prefTeach === subjCount){
                    if(matchingFreeTime(request,tutor) !== 0){
                        return ["complete", "notPreferred", tutor]
                    }
                    else{
                        tutorsNumOfSubjectsTeaching.push(0)
                        tutorsNumOfFreeTime.push(0)
                    }
                }
                else if(prefTeach !== 0){
                    if(matchingFreeTime(request,tutor) !== 0){
                        tutorsNumOfSubjectsTeaching.push(prefTeach)
                        tutorsNumOfFreeTime.push(matchingFreeTime(request,tutor))

                        // return ["split", "notPreferred", tutor, getSubjects(rSubject, tutor), ""+getRemainingSubjects(rSubject, tutor)]
                    }
                    else{
                        tutorsNumOfSubjectsTeaching.push(0)
                        tutorsNumOfFreeTime.push(0)
                    }
                }
                else if(prefTeach === 0){
                    tutorsNumOfSubjectsTeaching.push(0);
                    tutorsNumOfFreeTime.push(0)
                    console.log("getSubjects ===0")
                }
            }
            else{
                tutorsNumOfSubjectsTeaching.push(0)
                tutorsNumOfFreeTime.push(0)
            }
        }
        else{
            tutorsNumOfSubjectsTeaching.push(0);
            tutorsNumOfFreeTime.push(0)
            // console.log("pref cant teach && not max load")
        }
    }


    console.log(tutorsNumOfSubjectsTeaching.length + " : LENGTH : " + tutors.length);
    console.log(tutorsNumOfFreeTime.length + " : LENGTH : " + tutors.length);

    let max = 0;
    for(let x=1; x<tutors.length; x++){
        console.log(tutors[max] + " vs  " +tutors[x].name);
        console.log(tutorsNumOfSubjectsTeaching[max] + "<" + tutorsNumOfSubjectsTeaching[x]);
        console.log(tutorsNumOfSubjectsTeaching[max] < tutorsNumOfSubjectsTeaching[x]);
        console.log();
        if(tutorsNumOfSubjectsTeaching[max] < tutorsNumOfSubjectsTeaching[x]){
            max = x;
        }
        else if(tutorsNumOfSubjectsTeaching[max] === tutorsNumOfSubjectsTeaching[x]){
            if(tutorsNumOfFreeTime[max] < tutorsNumOfFreeTime[x]){
                max = x;
            }
        }
    }

    return ["split", "notPreferred", tutors[max], getSubjects(rSubject, tutors[max], allSubjects), ""+getRemainingSubjects(rSubject, tutors[max], allSubjects)]


    /*
    // let flag = true;
    //
    // while(flag){

    let timeSlots =[];
    let tutorTeachNum = [];


    // else, loop through other tutors to find a match
    for (let i=0;i<tutors.length;i++){
        let tutor = tutors[i];
        // console.log(tutor)
        console.log("TUTOR NAME" + tutors[i].name);
        console.log();
        if (canTeach(tutor) && notMaxLoad(tutor)){
            let prefTeach = getSubjects(rSubject,tutor).split(",").map(function(a){return a.trim()}).length;
            tutorTeachNum.push(prefTeach);
            timeSlots.push(matchingFreeTime(request,tutor));
            console.log(timeSlots[i] + " timeslots matching with Tutor: " + tutors[i].name);
            console.log();
        }
        else{
            tutorTeachNum.push(0);
            timeSlots.push(0);
        }
    }
        let tempSubj = subjCount;
        let filterTutors = [];

        let filtered = 0;

        while(filtered === 0){

            if(tempSubj === 0){
                break;
            }

            for (let s=0; s<tutors.length; s++){
                console.log(tutors[s].name + " can teach " + tutorTeachNum[s] + " of subjects youre requesting for. But I am requesting for " + tempSubj + " subjects");
                console.log();
                if(tutorTeachNum[s] === tempSubj){
                    filtered++;
                    filterTutors.push(s);
                }
            }


            tempSubj--;
        }

        for(let f=0; f<filtered; f++){
            console.log("Filtered " + tutors[filterTutors[f]].name)
        }

        if(filtered === 1){
            if(timeSlots[filterTutors[0]] !== 0){
                if(tempSubj+1 === subjCount){
                    return ["complete", "notPreferred", tutors[filterTutors[0]]];
                }
                else{
                    return ["split", "notPreferred", tutors[filterTutors[0]], ""+getSubjects(rSubject, tutors[filterTutors[0]]), ""+getRemainingSubjects(rSubject, tutors[filterTutors[0]])];
                }
            }
            else{
                for(let i = 0; i < tutors.length; i++){
                    if ( tutors[i] === tutors[filterTutors[0]]) {
                        tutors.splice(i, 1);
                    }
                }

                return null;
                // what if no timeslot match
            }
        }
        else if(filtered !== 0){

            if(tempSubj+1 === subjCount){

                console.log("can teach all")

                let max = 0; // maxCount for timeslots //index of filterTutors

                for(let f=1; f<filtered; f++){
                    if(timeSlots[filterTutors[max] < timeSlots[filterTutors[f]]]){
                        max = f;
                    }
                }

                return ["complete", "notPreferred", tutors[max]];
                // go through tutors and pick one
                // no need to split
            }
            else{
                console.log("cannot teach all")


                let max = 0; // maxCount for timeslots //index of filterTutors

                for(let f=1; f<filtered; f++){
                    console.log("if statement" + "" + timeSlots[filterTutors[max]] < timeSlots[filterTutors[f]]  + "");
                    if(timeSlots[filterTutors[max]] < timeSlots[filterTutors[f]]){
                        max = f;
                    }
                }

                return ["split", "notPreferred", tutors[max], ""+getSubjects(rSubject, tutors[filterTutors[max]]), ""+getRemainingSubjects(rSubject, tutors[filterTutors[max]])];

                // go through tutors and pick one
                // split the request
            }
        }
        else{
            return null; // no tutors teach the subject at all!!!!!!!
        }
    // }

*/


    // let max = 0;
    // for (let i=1; i<timeSlots.length; i++){
    //     if(timeSlots[i] > timeSlots[max]){
    //         max = i;
    //     }
    // }

    // if(timeSlots[max] !== 0){
    //     console.log(timeSlots[max] + " timeslots matching with Tutor: " + tutors[max]);
    //     return tutors[max];
    // }
    // else{
    //     return null
    // }

    // if null is returned, assume na walang namatch and notify nlang na we'll be doing manual matching
    // return null
}



// function to check if tutor is teaching certain subject
// considers similar subject name, just follow how the subjects are declared (see subjects.js)
// function isTeaching(subjects, tutor) {
//     let tutorSubjects = tutor.subjects
//     // let similarSubjects = findSimilarSubjects(subjects)
//
//     // loop through similar subjects (includes original subject), if tutor is teaching any of those subjects return true
//
//     if (tutorSubjects != null) {
//
//         tutorSubjects = tutorSubjects.split(",");
//         var rSubjects = subjects.split(",");
//
//         // [[ALGE, DASALGO], [ARCHORG, ARCORG], [MOBIDEV]]
//
//         var similarSubjects = []
//
//         for (var i = 0; i < rSubjects.length; i++) {
//             similarSubjects += findSimilarSubjects(rSubjects[i])
//         }
//
//         var count = 0;
//
//
//         for (let j = 0; j < tutorSubjects.length; j++) {
//             if (similarSubjects.includes(tutorSubjects[j])) {
//                 count++
//             }
//         }
//
//
//         return count;
//
//     }
//     else{
//         return false
//     }
// }


function getSubjects(subjects, tutor, allSubjects) {
    let tutorSubjects = tutor.subjects
    // let similarSubjects = findSimilarSubjects(subjects)

    // loop through similar subjects (includes original subject), if tutor is teaching any of those subjects return true


    if (tutorSubjects != null && subjects != null) {

        tutorSubjects = tutorSubjects.split(",");
        var rSubjects = subjects.split(",");

        var similarSubjects = ""

        for (var i = 0; i < rSubjects.length; i++) {
            if(similarSubjects.length === 0){
                if(findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects))
                    similarSubjects += findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects)
            }
            else{
                if(findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects))
                    similarSubjects += "," + findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects)

            }
        }


        console.log(similarSubjects + " with Tutor " + tutor.name)
        console.log()


        return similarSubjects.trim()

    }
    else{
        return "";
    }
}


function getRemainingSubjects(subjects, tutor, allSubjects) {
    let tutorSubjects = tutor.subjects
    // let similarSubjects = findSimilarSubjects(subjects)

    // loop through similar subjects (includes original subject), if tutor is teaching any of those subjects return true

    if (tutorSubjects != null) {

        tutorSubjects = tutorSubjects.split(",");
        var rSubjects = subjects.split(",");

        var similarSubjects = []

        for (var i = 0; i < rSubjects.length; i++) {
            if(similarSubjects.length === 0){
                if(!findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects)){
                    similarSubjects += rSubjects[i];
                }
            }
            else{
                if(!findSimilarSubjects(rSubjects[i], tutorSubjects, allSubjects)){
                    similarSubjects += "," + rSubjects[i];
                }

            }
        }


        console.log(similarSubjects + " Remaining ")
        console.log()

        return similarSubjects

    }
    else{
        return "";
    }
}


// helper function to find similar subjects given a subject string, references subjects array from separate file
// let subjects = require('./subjects').readSubjects

function findSimilarSubjects(subject, tutorSubjects, allSubjects){
    for(var i = 0; i < allSubjects.length; i++) {
        // subject is array of grouped allSubjects, just group the similar ones (see allSubjects.js)
        var subjectGrp = allSubjects[i];

        // console.log(subjectGrp + " includes " + subject + " is: " + subjectGrp.includes(subject));
        // console.log();

        if (subjectGrp.includes(subject)){
            if(tutorSubjects != null){
                for(let s=0; s<tutorSubjects.length; s++){
                    if(subjectGrp.includes(tutorSubjects[s])){
                        for(let x = 0; x<subjectGrp.length; x++){
                            if(subjectGrp[x] === subject){
                                return subjectGrp[x];
                            }
                        }
                    }
                }
            }
            else{
                return false;
            }
        }
    }

    return false;
    // if done correctly, this function should always return an array of subjects (kahit isa lang sa array, meaning unique subject)
}

// function findSimilarSubjects(subject){
//     for(var i = 0; i < subjects.length; i++) {
//         // subject is array of grouped subjects, just group the similar ones (see subjects.js)
//         var subjectGrp = subjects[i];
//
//         // console.log(subjectGrp + " includes " + subject + " is: " + subjectGrp.includes(subject));
//         // console.log();
//
//         if (subjectGrp.includes(subject)){
//             for(let x = 0; x<subjectGrp.length; x++){
//                 if(subjectGrp[x] === subject)
//                     return subjectGrp[x];
//             }
//
//         }
//     }
//
//     return false;
//     // if done correctly, this function should always return an array of subjects (kahit isa lang sa array, meaning unique subject)
// }

// // function to check if requested free time is within range of tutors free time
// function matchingFreeTime(request, tutor){
//     // im not sure how you stored time, so mej pseudo code lang rn
//     let reqFreeTime = request.freeTime
//     let tutorFreeTime = tutor.freeTime
//
//     console.log("request Free Time: " + reqFreeTime)
//     console.log("tutor Free Time: " + tutorFreeTime)
//
//     reqFreeTime = reqFreeTime.split(",")
//     tutorFreeTime = tutorFreeTime.split(",")
//     var ctr = 0;
//
//     for(var i=0; i<reqFreeTime.length; i++){
//
//         for(var j=0; j<tutorFreeTime.length; j++){
//             console.log(reqFreeTime[i] + " vs " + tutorFreeTime[j])
//             if(reqFreeTime[i] === tutorFreeTime[j]){
//                 ctr++
//             }
//         }
//
//
//
//     }
//     if(ctr == 0){
//         console.log("Free Time error")
//         return false
//     }
//     else{
//         return true;
//     }
// }

function matchingFreeTime(request, tutor){
    // im not sure how you stored time, so mej pseudo code lang rn
    let reqFreeTime = request.freeTime
    let tutorFreeTime = tutor.freeTime

    // console.log("request Free Time: " + reqFreeTime)
    // console.log("tutor Free Time: " + tutorFreeTime)

    reqFreeTime = reqFreeTime.split(",")
    tutorFreeTime = tutorFreeTime.split(",")
    var ctr = 0;

    for(var i=0; i<reqFreeTime.length; i++){

        for(var j=0; j<tutorFreeTime.length; j++){
            // console.log(reqFreeTime[i] + " vs " + tutorFreeTime[j])
            if(reqFreeTime[i] === tutorFreeTime[j]){
                ctr++
            }
        }



    }
    if(ctr === 0){
        console.log("Free Time error")
        return 0;
    }
    else{
        return ctr;
    }
}

function canTeach(tutor){
    if(!tutor.newlyPromoted && tutor.tutorTerm && tutor.activeAccount){
        return true;
    }
    else{
        return false;
    }
}

function notMaxLoad(tutor){

    // console.log("Tutees.length" + tutor.tutees.length);

    if(tutor.tuteeCapacity > tutor.tutees.length){
        return true
    }
    else{
        return false
    }
}

// module.exports = match;