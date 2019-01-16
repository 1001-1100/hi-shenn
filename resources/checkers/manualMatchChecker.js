
$(document).ready(function(){
    $(".detailsToggle").click(toggleTutorDetailsForm)

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

        var modal = document.getElementById('addAnnouncementModal');
        modal.style.display ="block";

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
        $(".toggleActiveBtn").hide();
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
        var requestID = $(".manual").val();

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
        $(".requestID").attr('value', requestID);
        $(".specificTutorActive").attr('value', tutorActive);

        if(tutorType.toUpperCase() === "ADMIN"){
            $(".demoteAdminButton").show();
        }
        else if(tutorType.toUpperCase() === "TUTOR"){
            $(".promoteButton").show();
            $(".demoteTutorButton").show();
        }

        if(tutorActive === "true" && superAdmin === "false"){
            $(".toggleActiveBtn").show();
            $(".toggleActiveBtn").attr('value', 'Deactivate Account');
            $(".toggleActiveBtn").css('background-color', 'red');
            $(".demoteAdminForm").css('padding-right', '5px');
            $(".toggleActiveBtn").hover(function(e){
                $(this).css("background-color", e.type === "mouseenter"?"#ad0000":"red")
            });
        }
        else if(tutorActive === "false" && superAdmin === "false"){
            $(".toggleActiveBtn").show();
            $(".toggleActiveBtn").attr('value', 'Activate Account');
            $(".toggleActiveBtn").css('background-color', 'green');
            $(".promoteTutorForm").css('padding-right', '5px');
            $(".demoteTutorForm").css('padding-right', '5px');
            $(".toggleActiveBtn").hover(function(e){
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
    });

});

function toggleTutorDetailsForm(){
    let toggleVal = $("input.detailsToggle").is(":checked");

    $.ajax({
        type: "POST",
        url: "../admin/termStartStatus",
        data: {
            toggleVal
        },
        success: function() {
            console.log("SUCCESSFULLY TOGGLED DETAILS FORM TO " + toggleVal)
        }
    });
}