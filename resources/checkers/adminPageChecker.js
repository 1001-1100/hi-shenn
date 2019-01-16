
$(document).ready(function(){

    $(".detailsToggle").click(toggleTutorDetailsForm)
    $(".evalToggle").click(toggleEvalForm)

    $(".sendEvaluationsButton").click(function(){
        event.preventDefault()

        if($(".sendEvaluationsButton").val() === "Turn Off Evaluations"){
            var modal = document.getElementById('turnOffModal');
            modal.style.display ="block";
        }
        else{
            var modal = document.getElementById('turnOnModal');
            modal.style.display ="block";
        }

    })

    $("#evaluationOpenButtonModal").click(function(){

        var modal = document.getElementById('turnOnModal');
        modal.style.display ="none";

        $("#setTermEnd").submit();
    });

    $("#evaluationCloseButtonModal").click(function(){

        var modal = document.getElementById('turnOffModal');
        modal.style.display ="none";

        $("#setTermEnd").submit();
    });

    $(".addAnnouncementButton").click(function () {
        event.preventDefault()

        let name = $(".newAnnouncementName").val()
        let info = $(".newAnnouncementInfo").val()
        let isFileEmpty = $("input[name=announcementImg]").get(0).files.length === 0
        if (name === "" || info === "" || isFileEmpty) {
            $(".newAnnouncementDiv .err").css("display", "block")
        } else {
            var modal = document.getElementById('addAnnouncementModal');
            modal.style.display = "block";
            $(".newAnnouncementDiv .err").css("display", "none")
        }

    })

    $("#addButtonModal").click(function(){

        var modal = document.getElementById('addAnnouncementModal');
        modal.style.display ="none";

        $("#addAnnouncementForm").submit();
    });


    $(".deleteAnnouncementButton").click(function () {
        event.preventDefault()

        var modal = document.getElementById('deleteAnnouncementModal');
        modal.style.display ="block";

    })

    $("#deleteButtonModal").click(function(){

        var modal = document.getElementById('deleteAnnouncementModal');
        modal.style.display ="none";

        $("#deleteAnnouncementForm").submit();
    });



    $(".adminItem").click(function(){
        var dataChoice = $(this).attr('data-id');
        console.log(dataChoice);
        $("."+dataChoice+"Container").show().siblings().hide();

        $(".adminItemActive").removeClass('adminItemActive');
        $(this).addClass('adminItemActive');
        $(".dataHider").show();
        $(".specificData").hide();
    });

    var requestTool = document.getElementById('requestTool');
    if(requestTool != null){
        $("[data-id=requests]").click()
    }

    var evaluateTool = document.getElementById('evaluateTool');
    if(evaluateTool != null){
        $("[data-id=evaluations]").click()
    }

    var announcementTool = document.getElementById("announcementTool")
    if(announcementTool != null){
        $("[data-id=announcements]").click()
    }

    var tutorTool = document.getElementById("tutorTool")
    if(tutorTool != null){
        $("[data-id=tutors]").click()
    }

    var tuteeTool = document.getElementById("tuteeTool")
    if(tuteeTool != null){
        $("[data-id=tutees]").click()
    }

    $(".requestID").each(function(i, obj){
        // alert("RequestID " + $(this).text());

        // alert()
        if($(this).text() === $("input#reqID").val() && $(".matchError").text() != ""){

            $(this).closest(".requestRow").css("background", "red");

        }
    })

    $(".close").each(function(i, obj){
        $(this).click(function(){
            $(".modal").css("display", "none");
        })
    })

    $(".closeBtn").each(function(i, obj){
        $(this).click(function(){
            $(".modal").css("display", "none");
        })
    })

    // alert("PASSED ID " + $(".reqID").val());


    $(".tuteeRow").click(function(){

        var allCells = $('.tableCell');

        allCells.each(function (index){
            if($(this).hasClass("blueBg"))
                $(this).removeClass("blueBg")
        })
        $(".dataHider").hide();
        $(".specificData").show();
        $(".toggleActiveBtnTutee").hide();

        var tuteeName = $(this).closest(".tuteeRow").find(".tuteeName").text();
        var tuteeIdNum = $(this).closest(".tuteeRow").find(".tuteeIdNum").text();
        var tuteeEmail = $(this).closest(".tuteeRow").find(".tuteeEmail").text();
        var tuteeCourse = $(this).closest(".tuteeRow").find(".tuteeCourse").text();
        var tuteeContactNum = $(this).closest(".tuteeRow").find(".tuteeContactNum").text();
        var tuteeSchedule = $(this).closest(".tuteeRow").find(".tuteeSchedule").text();
        var tuteeSubjects = $(this).closest(".tuteeRow").find(".tuteeSubjects").text();
        var tuteeCampus = $(this).closest(".tuteeRow").find(".tuteeCampus").text();
        var tuteeActive = $(this).closest(".tuteeRow").find(".tuteeActive").text();

        $(".specificTuteeName").text(tuteeName);
        $(".specificTuteeIdNum").text(tuteeIdNum);
        $(".specificTuteeEmail").text(tuteeEmail);
        $(".specificTuteeCourse").text(tuteeCourse);
        $(".specificTuteeContactNum").text(tuteeContactNum);
        $(".specificTuteeSubjects").text(tuteeSubjects);
        $(".specificTuteeActive").text(tuteeActive);
        $(".specificTuteeCampus").text(tuteeCampus);

        $(".specificTuteeActive").attr("value", tuteeActive);
        //alert(tuteeEmail);
        $(".specificTuteeEmail").attr("value", tuteeEmail);


        if(tuteeActive === "true"){
            $(".toggleActiveBtnTutee").show();
            $(".toggleActiveBtnTutee").attr('value', 'Deactivate Account');
            $(".toggleActiveBtnTutee").css('background-color', 'red');
            $(".toggleActiveBtnTutee").hover(function(e){
                $(this).css("background-color", e.type === "mouseenter"?"#760000":"red")
            });
        }
        else{
            $(".toggleActiveBtnTutee").show();
            $(".toggleActiveBtnTutee").attr('value', 'Activate Account');
            $(".toggleActiveBtnTutee").css('background-color', 'green');
            $(".toggleActiveBtnTutee").hover(function(e){
                $(this).css("background-color", e.type === "mouseenter"?"#006200":"green")
            });
        }

        //schedule retrieve
        var scheduleArray = tuteeSchedule.split(',');


        for (var i = 0; i < scheduleArray.length; i++) {

            allCells.each(function (index) {
                if ($(this).attr('data-id') === scheduleArray[i]) {
                    // var flag = $(this).hasClass("blueBg")
                    $(this).addClass("blueBg")
                    // alert(scheduleArray[i])
                }
            });
        }

        updateEmpty()
    });

    $(".promoteTuteeBtn").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");
        $("#genericData").text("Are you sure you want to promote this Tutee?");

        $("#genericAccept").click(function(){
            $(".promoteTuteeForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })

    $(".toggleActiveBtnTutor").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");

        if($(".toggleActiveBtnTutor").val() === "Deactivate Account"){
            $("#genericData").text("Are you sure you want to Deactivate this account?");
        }
        else if($(".toggleActiveBtnTutor").val() === "Activate Account"){
            $("#genericData").text("Are you sure you want to Activate this account?");
        }

        $("#genericAccept").click(function(){
            $(".toggleActiveTutorForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })

    $(".toggleActiveBtnTutee").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");

        if($(".toggleActiveBtnTutee").val() === "Deactivate Account"){
            $("#genericData").text("Are you sure you want to Deactivate this account?");
        }
        else if($(".toggleActiveBtnTutee").val() === "Activate Account"){
            $("#genericData").text("Are you sure you want to Activate this account?");
        }

        $("#genericAccept").click(function(){
            $(".toggleActiveTuteeForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })

    $(".demoteTutorButton").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");
        $("#genericData").text("Are you sure you want to demote this Tutor to Tutee? You will lose all data of this tutor once demoted");

        $("#genericAccept").click(function(){
            $(".demoteTutorForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })


    $(".demoteAdminButton").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");
        $("#genericData").text("Are you sure you want to demote this Admin to Tutor?");

        $("#genericAccept").click(function(){
            $(".demoteAdminForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })


    $(".promoteButton").click(function(){
        event.preventDefault()

        $("#genericModal").css("display", "block");
        $("#genericData").text("Are you sure you want to promote this Tutor to Admin?");

        $("#genericAccept").click(function(){
            $(".promoteTutorForm").submit()
        })

        $("#genericReject").click(function(){
            $("#genericModal").css("display", "none");
        })
    })

    $(".tutorRow").click(function(){

        var allCells = $('.tableCell');

        allCells.each(function (index){
            if($(this).hasClass("blueBg"))
                $(this).removeClass("blueBg")
        })

        $(".dataHider").hide();
        $(".demoteAdminButton").hide();
        $(".demoteTutorButton").hide();
        $(".promoteButton").hide();
        $(".toggleActiveBtnTutor").hide();
        $(".specificData").show();

        var tutorName = $(this).closest(".tutorRow").find(".tutorName").text();
        var tutorIdNum = $(this).closest(".tutorRow").find(".tutorIdNum").text();
        var tutorEmail = $(this).closest(".tutorRow").find(".tutorEmail").text();
        var tutorCourse = $(this).closest(".tutorRow").find(".tutorCourse").text();
        var tutorContactNum = $(this).closest(".tutorRow").find(".tutorContactNum").text();
        var tutorTuteeCapacity = $(this).closest(".tutorRow").find(".tutorTuteeCapacity").text();
        var tutorType = $(this).closest(".tutorRow").find(".tutorType").text();
        var tutorSubjects = $(this).closest(".tutorRow").find(".tutorSubjects").text();
        var tutorExpiration = $(this).closest(".tutorRow").find(".tutorExpiration").text();
        var tutorSchedule = $(this).closest(".tutorRow").find(".tutorSchedule").text();
        var tutorCampus = $(this).closest(".tutorRow").find(".tutorCampus").text();
        var tutorActive = $(this).closest(".tutorRow").find(".tutorActive").text();
        var superAdmin = $(this).closest(".tutorRow").find(".tutorSuperAdmin").text();

        $(".specificTutorName").text(tutorName);
        $(".specificTutorIdNum").text(tutorIdNum);
        $(".specificTutorEmail").text(tutorEmail);
        $(".specificTutorCourse").text(tutorCourse);
        $(".specificTutorContactNum").text(tutorContactNum);
        $(".specificTutorTuteeCapacity").text(tutorTuteeCapacity);
        $(".specificTutorType").text(tutorType);
        $(".specificTutorSubjects").text(tutorSubjects);
        $(".specificTutorExpiration").text(tutorExpiration);
        $(".specificTutorActive").text(tutorActive);
        $(".specificTutorCampus").text(tutorCampus);

        $(".specificTutorEmail").attr('value', tutorEmail);
        $(".specificTutorActive").attr('value', tutorActive);

        if(tutorType.toUpperCase() === "ADMIN"){
            $(".demoteAdminButton").show();
        }
        else if(tutorType.toUpperCase() === "TUTOR"){
            $(".promoteButton").show();
            $(".demoteTutorButton").show();
        }

        if(tutorActive === "true" && superAdmin === "false"){
            $(".toggleActiveBtnTutor").show();
            $(".toggleActiveBtnTutor").attr('value', 'Deactivate Account');
            $(".toggleActiveBtnTutor").css('background-color', 'red');
            $(".demoteAdminForm").css('padding-right', '5px');
            $(".toggleActiveBtnTutor").hover(function(e){
                $(this).css("background-color", e.type === "mouseenter"?"#ad0000":"red")
            });
        }
        else if(tutorActive === "false" && superAdmin === "false"){
            $(".toggleActiveBtnTutor").show();
            $(".toggleActiveBtnTutor").attr('value', 'Activate Account');
            $(".toggleActiveBtnTutor").css('background-color', 'green');
            $(".promoteTutorForm").css('padding-right', '5px');
            $(".demoteTutorForm").css('padding-right', '5px');
            $(".toggleActiveBtnTutor").hover(function(e){
                $(this).css("background-color", e.type === "mouseenter"?"#006200":"green")
            });
        }

        //schedule retrieve
        var schedArray = tutorSchedule.split(',');

        jQuery.each(schedArray, function(i, schedDate){
            $('.tableCell').each(function (index) {
                if($(this).attr('data-id') == schedDate){
                    $(this).toggleClass("blueBg");
                }
            });
        });

        updateEmpty()

    });

    $(".requestRow").click(function(){

        var allCells = $('.tableCell');

        allCells.each(function (index){
            if($(this).hasClass("blueBg"))
                $(this).removeClass("blueBg")
        })

        $(".dataHider").hide();
        $(".specificData").show();
        var requestID = $(this).closest(".requestRow").find(".requestID").text();
        var requestTuteeName = $(this).closest(".requestRow").find(".requestTuteeName").text();
        var requestTutorName = $(this).closest(".requestRow").find(".requestTutorName").text();
        var requestPreferredTutorName = $(this).closest(".requestRow").find(".requestPreferredTutorName").text();
        var requestSubject = $(this).closest(".requestRow").find(".requestSubjects").text();
        var requestCampus = $(this).closest(".requestRow").find(".requestCampus").text();
        var requestType = $(this).closest(".requestRow").find(".requestType").text();
        var requestDate = $(this).closest(".requestRow").find(".requestDate").text();
        var requestAcademicYear = $(this).closest(".requestRow").find(".requestAcademicYear").text();
        var requestTerm = $(this).closest(".requestRow").find(".requestTerm").text();
        var requestStatus = $(this).closest(".requestRow").find(".requestStatus").text();
        var requestSchedule = $(this).closest(".requestRow").find(".requestSchedule").text();

        // $(".specificRequestID").text("Request ID: " + requestID);
        $(".specificRequestTuteeName").text(requestTuteeName);
        $(".specificRequestTutorName").text(requestTutorName);
        $(".specificRequestPreferredTutorName").text(requestPreferredTutorName);
        $(".specificRequestSubject").text(requestSubject);
        $(".specificRequestCampus").text(requestCampus);
        $(".specificRequestType").text(requestType);
        $(".specificRequestDate").text(requestDate);
        $(".specificRequestAcademicYear").text(requestAcademicYear);
        $(".specificRequestTerm").text(requestTerm);
        $(".specificRequestStatus").text(requestStatus);
        $("input.manualMatch").val(requestID);

        if (requestTutorName===""){
            $(".specificRequestTutorName").text("No tutor matched yet")
            $(".specificRequestTutorName").addClass("specificEmpty")
        } else {
            $(".specificRequestTutorName").removeClass("specificEmpty")
        }

        if(requestStatus === "accepted"){
            $(".automateMatchBtn").css("display", "none")
        }
        else{
            $(".automateMatchBtn").css("display", "block")
        }


        //schedule retrieve
        var schedArray = requestSchedule.split(',');

        jQuery.each(schedArray, function(i, schedDate){
            $('.tableCell').each(function (index) {
                if($(this).attr('data-id') == schedDate){
                    $(this).toggleClass("blueBg");
                }
            });
        });

        updateEmpty()

    });


    $(".tutorAppRow").click(function(){

        var allCells = $('.tableCell');

        allCells.each(function (index){
            if($(this).hasClass("blueBg"))
                $(this).removeClass("blueBg")
        })

        $(".dataHider").hide();
        $(".specificData").show();
        var tutorAppName = $(this).closest(".tutorAppRow").find(".tutorAppName").text();
        var tutorAppIdNum = $(this).closest(".tutorAppRow").find(".tutorAppIdNum").text();
        var tutorAppEmail = $(this).closest(".tutorAppRow").find(".tutorAppEmail").text();
        var tutorAppCourse = $(this).closest(".tutorAppRow").find(".tutorAppCourse").text();
        var tutorAppContactNum = $(this).closest(".tutorAppRow").find(".tutorAppContactNum").text();
        var tutorAppSchedule = $(this).closest(".tutorAppRow").find(".tutorAppSchedule").text();
        var tutorAppTermsLeft = $(this).closest(".tutorAppRow").find(".tutorAppTermsLeft").text();
        var tutorAppExtraCurricular = $(this).closest(".tutorAppRow").find(".tutorAppExtraCurricular").text();
        var tutorAppShortAnswer = $(this).closest(".tutorAppRow").find(".tutorAppShortAnswer").text();
        var tutorAppStatus = $(this).closest(".tutorAppRow").find(".tutorAppStatus").text();
        var tutorAppDateSubmitted = $(this).closest(".tutorAppRow").find(".tutorAppDateSubmitted").text();


        $(".specificTutorAppName").text(tutorAppName);
        $(".specificTutorAppIdNum").text(tutorAppIdNum);
        $(".specificTutorAppEmail").text(tutorAppEmail);
        $("input.specificTutorAppEmail").val(tutorAppEmail);
        $(".specificTutorAppCourse").text(tutorAppCourse);
        $(".specificTutorAppContactNum").text(tutorAppContactNum);
        $(".specificTutorAppTermsLeft").text(tutorAppTermsLeft);
        $(".specificTutorAppExtraCurricular").text(tutorAppExtraCurricular);
        $(".specificTutorAppShortAnswer").text(tutorAppShortAnswer);
        $(".specificTutorAppStatus").text(tutorAppStatus);
        $(".specificTutorAppDateSubmitted").text(tutorAppDateSubmitted);
        //schedule retrieve
        var scheduleArray = tutorAppSchedule.split(',');


        for (var i = 0; i < scheduleArray.length; i++) {

            allCells.each(function (index) {
                if ($(this).attr('data-id') === scheduleArray[i]) {
                    // var flag = $(this).hasClass("blueBg")
                    $(this).addClass("blueBg")
                    // alert(scheduleArray[i])
                }
            });
        }
        updateEmpty()

    });

    $(".evaluationRow").click(function(){

        $(".dataHider").hide();
        $(".specificData").show();

        var evaluationTutorName = $(this).closest(".evaluationRow").find(".evaluationTutorName").text();
        var evaluationTuteeName = $(this).closest(".evaluationRow").find(".evaluationTuteeName").text();
        var evaluationAverage = $(this).closest(".evaluationRow").find(".evaluationAverage").text();
        var evaluationComments = $(this).closest(".evaluationRow").find(".evaluationComments").text();
        var evaluationMessage = $(this).closest(".evaluationRow").find(".evaluationMessage").text();
        var evaluationFrequency = $(this).closest(".evaluationRow").find(".evaluationFrequency").text();
        var evaluationPunctuality = $(this).closest(".evaluationRow").find(".evaluationPunctuality").text();
        var evaluationPreparedness = $(this).closest(".evaluationRow").find(".evaluationPreparedness").text();
        var evaluationExplanation = $(this).closest(".evaluationRow").find(".evaluationExplanation").text();
        var evaluationExercises = $(this).closest(".evaluationRow").find(".evaluationExercises").text();
        var evaluationRelevance = $(this).closest(".evaluationRow").find(".evaluationRelevance").text();
        var evaluationEnthusiasm = $(this).closest(".evaluationRow").find(".evaluationEnthusiasm").text();
        var evaluationOpenness = $(this).closest(".evaluationRow").find(".evaluationOpenness").text();
        var evaluationConfidence = $(this).closest(".evaluationRow").find(".evaluationConfidence").text();
        var evaluationKnowledgable = $(this).closest(".evaluationRow").find(".evaluationKnowledgable").text();
        var evaluationVoiceModulation = $(this).closest(".evaluationRow").find(".evaluationVoiceModulation").text();
        var evaluationQuestionAnswer = $(this).closest(".evaluationRow").find(".evaluationQuestionAnswer").text();
        var evaluationEffectiveness = $(this).closest(".evaluationRow").find(".evaluationEffectiveness").text();
        var evaluationEncouraging = $(this).closest(".evaluationRow").find(".evaluationEncouraging").text();

        $(".specificEvaluationTutorName").text(evaluationTutorName);
        $(".specificEvaluationTuteeName").text(evaluationTuteeName);
        $(".specificEvaluationAverage").text(evaluationAverage);
        $(".specificEvaluationComments").text(evaluationComments);
        $(".specificEvaluationMessage").text(evaluationMessage);
        $(".specificEvaluationFrequency").text(evaluationFrequency);
        $(".specificEvaluationPunctuality").text(evaluationPunctuality);
        $(".specificEvaluationPreparedness").text(evaluationPreparedness);
        $(".specificEvaluationExplanation").text(evaluationExplanation);
        $(".specificEvaluationExercises").text(evaluationExercises);
        $(".specificEvaluationRelevance").text(evaluationRelevance);
        $(".specificEvaluationEnthusiasm").text(evaluationEnthusiasm);
        $(".specificEvaluationOpenness").text(evaluationOpenness);
        $(".specificEvaluationConfidence").text(evaluationConfidence);
        $(".specificEvaluationKnowledgable").text(evaluationKnowledgable);
        $(".specificEvaluationVoiceModulation").text(evaluationVoiceModulation);
        $(".specificEvaluationQuestionAnswer").text(evaluationQuestionAnswer);
        $(".specificEvaluationEffectiveness").text(evaluationEffectiveness);
        $(".specificEvaluationEncouraging").text(evaluationEncouraging);

        updateEmpty()

    });

    $(".feedbackRow").click(function(){
        $(".dataHider").hide();
        $(".specificData").show();
        var feedbackEvaluator = $(this).closest(".feedbackRow").find(".feedbackEvaluator").text();
        var feedbackEvaluatee = $(this).closest(".feedbackRow").find(".feedbackEvaluatee").text();
        var feedbackDate = $(this).closest(".feedbackRow").find(".feedbackDateSubmitted").text();
        var feedbackComplaints = $(this).closest(".feedbackRow").find(".feedbackComplaints").text();
        var feedbackSuggestions = $(this).closest(".feedbackRow").find(".feedbackSuggestions").text();
        var feedbackOthers = $(this).closest(".feedbackRow").find(".feedbackOthers").text();

        $(".specificFeedbackEvaluator").text(feedbackEvaluator);
        $(".specificFeedbackEvaluatee").text(feedbackEvaluatee);
        $(".specificFeedbackDateSubmitted").text(feedbackDate);
        $(".specificFeedbackComplaints").text(feedbackComplaints);
        $(".specificFeedbackSuggestions").text(feedbackSuggestions);
        $(".specificFeedbackOthers").text(feedbackOthers);
        updateEmpty()

    });

    $(".announcementRow").click(function (event) {
        $(".dataHider").hide();
        $(".specificData").show();
        var announcementName = $(this).closest(".announcementRow").find(".announcementName").text();
        var announcementLink = $(this).closest(".announcementRow").find(".announcementLink").text();
        var announcementInfo = $(event.target).attr("data-info")

        $(".specificAnnouncementImg").attr('src', "../announcements/" + announcementLink);
        $(".specificAnnouncementName").attr('value', announcementName);
        $(".specificAnnouncementInfo").val(announcementInfo);
        updateEmpty()

    });


    $(".editAnnouncementButton").click(editAnnouncement)
});

function editAnnouncement(event) {
    event.preventDefault()
    $(event.target).removeClass("editAnnouncementButton")
    $(event.target).addClass("saveAnnouncementButton")
    $(event.target).attr("value", "Save")
    console.log($(".specificAnnouncementName").val())
    let oldName = $(".specificAnnouncementName").val()
    $(".specificAnnouncementName").prop("readonly", false)
    $(".specificAnnouncementInfo").prop("readonly", false)
    $(".specificAnnouncementName").addClass("editable")
    $(".specificAnnouncementInfo").addClass("editable")
    $(event.target).click(saveAnnouncement)
    $(event.target).attr("data-old",oldName)
    $(event.target).unbind("click",editAnnouncement)
}

function saveAnnouncement(event) {
    event.preventDefault()
    let oldName = $(event.target).attr("data-old")
    let newName = $(".specificAnnouncementName").val()
    let newInfo = $(".specificAnnouncementInfo").val()
    console.log(oldName+ "___"+newName + "___"+newInfo)
    $.ajax({
        type: "POST",
        url: "../admin/updateAnnouncement",
        data: {
            oldName,
            newName,
            newInfo
        },
        success: function () {
            $(event.target).addClass("editAnnouncementButton")
            $(event.target).removeClass("saveAnnouncementButton")
            $(event.target).attr("value", "Edit")
            $(".specificAnnouncementName").prop("readonly", true)
            $(".specificAnnouncementInfo").prop("readonly", true)
            $(".specificAnnouncementName").removeClass("editable")
            $(".specificAnnouncementInfo").removeClass("editable")
            $(event.target).click(editAnnouncement)
            $(event.target).unbind("click",saveAnnouncement)
            $("td[data-name="+oldName+"]").text(newName)
            $("td[data-name="+oldName+"]").attr("data-name",newName)
            $("td[data-name="+oldName+"]").attr("data-info",newInfo)
        }
    });


}

function toggleTutorDetailsForm() {
    let toggleVal = $("input.detailsToggle").is(":checked");

    $.ajax({
        type: "POST",
        url: "../admin/termStartStatus",
        data: {
            toggleVal
        },
        success: function () {
            console.log("SUCCESSFULLY TOGGLED DETAILS FORM TO " + toggleVal)
        }
    });
}

function toggleEvalForm() {
    let toggleVal = $("input.evalToggle").is(":checked");
    $.ajax({
        type: "POST",
        url: "../admin/termEndStatusAJAX",
        data: {
            toggleVal
        },
        success: function () {
            console.log("SUCCESSFULLY EVAL FORM TO " + toggleVal)
        }
    });
}

function updateEmpty(){

    $(".specificCell").each(function(){
        $(this).css("background-color","#112136")
        let text = $(this).text().trim()
        if(text!=""){
            $(this).css("background-color","unset")
            console.log(text + " ... " + (text===""))
        }
    })
}