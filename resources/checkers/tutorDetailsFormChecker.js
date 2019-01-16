$(document).ready(function () {

    // INITIALIZE SUBJECTS
    $.ajax({
        type: "POST",
        url: "../tutor/getAllSubjects",
        data: {
        },
        success: function (res) {
            let subjects = res.subjects
            for (let i = 0; i < subjects.length; i++){
                for (let j = 0; j < subjects[i].length; j++){
                    var item = document.createElement("div")
                    $(item).addClass("item")
                    $(item).attr("data-value",subjects[i][j])
                    $(item).text(subjects[i][j])
                    $(".menu").append(item)
                }
            }
        }
    });

    var scheduleArray = $("#schedule").val().split(",")

    var allCells = $('.tableCell');

    for (var i = 0; i < scheduleArray.length; i++) {

        allCells.each(function (index) {
            if ($(this).attr('data-id') === scheduleArray[i]) {
                // var flag = $(this).hasClass("blueBg")
                $(this).addClass("blueBg")
                // alert(scheduleArray[i])
            }
        });
    }

    $(".ui.dropdown").dropdown('get value');


    /*if($('input[name=name]').length) {
        // put focusout of name id etc.
        $("input[name=name]").focusout(checkName)
        $("input[name=idNum]").focusout(checkidNum)
        $("input[name=mobileNum]").focusout(checkmobileNum)
        $("input[name=email]").focusout(checkEmail)
        $("input[name=course]").focusout(checkCourse)
    }*/


    var myArray = [];
    //WHEN USER SUBMITS REQUEST
    $("#submitButton").click(function (event) {

        event.preventDefault();

        var allCells = $('.tableCell');

        allCells.each(function (index) {
            if ($(this).hasClass("blueBg")) {
                myArray.push($(this).attr('data-id'));

            }
        });

        $("input#schedule").val(myArray);
        // alert(myArray)

        //var tagArray = $("ul#extracurricular_tags").tagit("assignedTags");
        var tagArray = []
        $("input#extracurricular").val(tagArray)

        if($("input[name=membership]:checked").val() === "No"){
            // AJAX TO UPDATE NEWLY PROMOTED STATUS
            // IF SUCCESSFUL, SUBMIT FORM
            $.ajax({
                type: "POST",
                url: "../tutor/updateNewlyPromoted",
                data: {
                    isNewlyPromoted:false
                },
                success: function () {
                    alert("SUCCESS")
                    $("#tutorDetails").submit();
                }
            });
        }
        else if($("input[name=membership]:checked").val() === "Yes" && $("input[name=tutorTerm]:checked").val() === "No"){
            // AJAX TO UPDATE NEWLY PROMOTED STATUS
            // IF SUCCESSFUL, SUBMIT FORM
            $.ajax({
                type: "POST",
                url: "../tutor/updateNewlyPromoted",
                data: {
                    isNewlyPromoted:false
                },
                success: function () {
                    $("#tutorDetails").submit();
                }
            });
        }
        else if(checkMembership() && checkTutorTerm() && checkTutorialType() && checkSubject() && checkSchedule()){
            //alert("ALL FIELDS ARE FILLED");
            // AJAX TO UPDATE NEWLY PROMOTED STATUS
            // IF SUCCESSFUL, SUBMIT FORM
            $.ajax({
                type: "POST",
                url: "../tutor/updateNewlyPromoted",
                data: {
                    isNewlyPromoted:false
                },
                success: function () {
                    $("#tutorDetails").submit();
                }
            });

        }

        // AJAX TO UPDATE NEWLY PROMOTED STATUS
        // IF SUCCESSFUL, SUBMIT FORM
        /*$.ajax({
            type: "POST",
            url: "../tutor/updateNewlyPromoted",
            data: {
                isNewlyPromoted:false
            },
            success: function () {
                $("#tutorDetails").submit();
            }
        });*/
    });


    function checkMembership(){ /*YES OR NO*/
        if($("input[name=membership]:checked").val() == ""){
            $("div#membershipErr").css("display", "block")
            return false;
        }
        else{
            $("div#membershipErr").css("display", "none")
            return true;
        }
    }

    function checkTutorTerm(){ /*YES OR NO*/
        if($("input[name=tutorTerm]:checked").val() === ""){
            $("div#exemptErr").css("display", "block")
            return false;
        }
        else{
            $("div#exemptErr").css("display", "none")
            return true;
        }
    }

    function checkTutorialType(){
        if($("input[name=tutorialType]:checked").val() === undefined){
            $("div#typeErr").css("display", "block")
            return false;
        }
        else{
            $("div#typeErr").css("display", "none")
            return true;
        }
    }

    function checkSubject(){
        if($("input[name=subject]").val() === ""){
            $("div#subjectErr").css("display", "block")
            return false;
        }
        else{
            $("div#subjectErr").css("display", "none")
            return true;
        }
    }

    function checkSchedule(){
        if($("input[name=schedule]").val() === ""){
            $("div#schedErr").css("display", "block")
            return false;
        }
        else{
            $("div#schedErr").css("display", "none")
            return true;
        }
    }

    /*//CLOSE MODAL
    var modal = document.getElementById('myModal');

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //AGREE TO SUBMIT
    $("#submitButtonModal").click(function(){

        var modal = document.getElementById('myModal');
        modal.style.display = "none";

        <!-- END OF MODAL SCRIPT -->

        $("#applyForm").submit();
    });*/


    var colMO = document.getElementsByClassName("colMO")[0];
    colMO.onclick = function () {

        if ($("div[data-id='MO0730'").hasClass("blueBg")
            && $("div[data-id='MO0915'").hasClass("blueBg")
            && $("div[data-id='MO1100'").hasClass("blueBg")
            && $("div[data-id='MO1245'").hasClass("blueBg")
            && $("div[data-id='MO1430'").hasClass("blueBg")
            && $("div[data-id='MO1615'").hasClass("blueBg")
            && $("div[data-id='MO1800'").hasClass("blueBg")) {

            $("div[data-id='MO0730'").toggleClass("blueBg")
            $("div[data-id='MO0915'").toggleClass("blueBg")
            $("div[data-id='MO1100'").toggleClass("blueBg")
            $("div[data-id='MO1245'").toggleClass("blueBg")
            $("div[data-id='MO1430'").toggleClass("blueBg")
            $("div[data-id='MO1615'").toggleClass("blueBg")
            $("div[data-id='MO1800'").toggleClass("blueBg")

        }
        else{
            if (!$("div[data-id='MO0730'").hasClass("blueBg")) {
                $("div[data-id='MO0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO0915'").hasClass("blueBg")) {
                $("div[data-id='MO0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO1100'").hasClass("blueBg")) {
                $("div[data-id='MO1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO1245'").hasClass("blueBg")) {
                $("div[data-id='MO1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO1430'").hasClass("blueBg")) {
                $("div[data-id='MO1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO1615'").hasClass("blueBg")) {
                $("div[data-id='MO1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='MO1800'").hasClass("blueBg")) {
                $("div[data-id='MO1800'").toggleClass("blueBg")
            }
        }


    }

    var colTU = document.getElementsByClassName("colTU")[0];
    colTU.onclick = function () {

        if ($("div[data-id='TU0730'").hasClass("blueBg")
            && $("div[data-id='TU0915'").hasClass("blueBg")
            && $("div[data-id='TU1100'").hasClass("blueBg")
            && $("div[data-id='TU1245'").hasClass("blueBg")
            && $("div[data-id='TU1430'").hasClass("blueBg")
            && $("div[data-id='TU1615'").hasClass("blueBg")
            && $("div[data-id='TU1800'").hasClass("blueBg")) {

            $("div[data-id='TU0730'").toggleClass("blueBg")
            $("div[data-id='TU0915'").toggleClass("blueBg")
            $("div[data-id='TU1100'").toggleClass("blueBg")
            $("div[data-id='TU1245'").toggleClass("blueBg")
            $("div[data-id='TU1430'").toggleClass("blueBg")
            $("div[data-id='TU1615'").toggleClass("blueBg")
            $("div[data-id='TU1800'").toggleClass("blueBg")

        }
        else{
            if (!$("div[data-id='TU0730'").hasClass("blueBg")) {
                $("div[data-id='TU0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU0915'").hasClass("blueBg")) {
                $("div[data-id='TU0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1100'").hasClass("blueBg")) {
                $("div[data-id='TU1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1245'").hasClass("blueBg")) {
                $("div[data-id='TU1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1430'").hasClass("blueBg")) {
                $("div[data-id='TU1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1615'").hasClass("blueBg")) {
                $("div[data-id='TU1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1800'").hasClass("blueBg")) {
                $("div[data-id='TU1800'").toggleClass("blueBg")
            }
        }


    }

    var colWE = document.getElementsByClassName("colWE")[0];
    colWE.onclick = function () {

        if ($("div[data-id='WE0730'").hasClass("blueBg")
            && $("div[data-id='WE0915'").hasClass("blueBg")
            && $("div[data-id='WE1100'").hasClass("blueBg")
            && $("div[data-id='WE1245'").hasClass("blueBg")
            && $("div[data-id='WE1430'").hasClass("blueBg")
            && $("div[data-id='WE1615'").hasClass("blueBg")
            && $("div[data-id='WE1800'").hasClass("blueBg")) {

            $("div[data-id='WE0730'").toggleClass("blueBg")
            $("div[data-id='WE0915'").toggleClass("blueBg")
            $("div[data-id='WE1100'").toggleClass("blueBg")
            $("div[data-id='WE1245'").toggleClass("blueBg")
            $("div[data-id='WE1430'").toggleClass("blueBg")
            $("div[data-id='WE1615'").toggleClass("blueBg")
            $("div[data-id='WE1800'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='WE0730'").hasClass("blueBg")) {
                $("div[data-id='WE0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE0915'").hasClass("blueBg")) {
                $("div[data-id='WE0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1100'").hasClass("blueBg")) {
                $("div[data-id='WE1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1245'").hasClass("blueBg")) {
                $("div[data-id='WE1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1430'").hasClass("blueBg")) {
                $("div[data-id='WE1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1615'").hasClass("blueBg")) {
                $("div[data-id='WE1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1800'").hasClass("blueBg")) {
                $("div[data-id='WE1800'").toggleClass("blueBg")
            }
        }
    }

    var colTH = document.getElementsByClassName("colTH")[0];
    colTH.onclick = function () {

        if ($("div[data-id='TH0730'").hasClass("blueBg")
            && $("div[data-id='TH0915'").hasClass("blueBg")
            && $("div[data-id='TH1100'").hasClass("blueBg")
            && $("div[data-id='TH1245'").hasClass("blueBg")
            && $("div[data-id='TH1430'").hasClass("blueBg")
            && $("div[data-id='TH1615'").hasClass("blueBg")
            && $("div[data-id='TH1800'").hasClass("blueBg")) {

            $("div[data-id='TH0730'").toggleClass("blueBg")
            $("div[data-id='TH0915'").toggleClass("blueBg")
            $("div[data-id='TH1100'").toggleClass("blueBg")
            $("div[data-id='TH1245'").toggleClass("blueBg")
            $("div[data-id='TH1430'").toggleClass("blueBg")
            $("div[data-id='TH1615'").toggleClass("blueBg")
            $("div[data-id='TH1800'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='TH0730'").hasClass("blueBg")) {
                $("div[data-id='TH0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH0915'").hasClass("blueBg")) {
                $("div[data-id='TH0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1100'").hasClass("blueBg")) {
                $("div[data-id='TH1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1245'").hasClass("blueBg")) {
                $("div[data-id='TH1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1430'").hasClass("blueBg")) {
                $("div[data-id='TH1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1615'").hasClass("blueBg")) {
                $("div[data-id='TH1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1800'").hasClass("blueBg")) {
                $("div[data-id='TH1800'").toggleClass("blueBg")
            }
        }
    }

    var colFR = document.getElementsByClassName("colFR")[0];
    colFR.onclick = function () {

        if ($("div[data-id='FR0730'").hasClass("blueBg")
            && $("div[data-id='FR0915'").hasClass("blueBg")
            && $("div[data-id='FR1100'").hasClass("blueBg")
            && $("div[data-id='FR1245'").hasClass("blueBg")
            && $("div[data-id='FR1430'").hasClass("blueBg")
            && $("div[data-id='FR1615'").hasClass("blueBg")
            && $("div[data-id='FR1800'").hasClass("blueBg")) {

            $("div[data-id='FR0730'").toggleClass("blueBg")
            $("div[data-id='FR0915'").toggleClass("blueBg")
            $("div[data-id='FR1100'").toggleClass("blueBg")
            $("div[data-id='FR1245'").toggleClass("blueBg")
            $("div[data-id='FR1430'").toggleClass("blueBg")
            $("div[data-id='FR1615'").toggleClass("blueBg")
            $("div[data-id='FR1800'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='FR0730'").hasClass("blueBg")) {
                $("div[data-id='FR0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR0915'").hasClass("blueBg")) {
                $("div[data-id='FR0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1100'").hasClass("blueBg")) {
                $("div[data-id='FR1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1245'").hasClass("blueBg")) {
                $("div[data-id='FR1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1430'").hasClass("blueBg")) {
                $("div[data-id='FR1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1615'").hasClass("blueBg")) {
                $("div[data-id='FR1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1800'").hasClass("blueBg")) {
                $("div[data-id='FR1800'").toggleClass("blueBg")
            }
        }
    }

    var colSA = document.getElementsByClassName("colSA")[0];
    colSA.onclick = function () {

        if ($("div[data-id='SA0730'").hasClass("blueBg")
            && $("div[data-id='SA0915'").hasClass("blueBg")
            && $("div[data-id='SA1100'").hasClass("blueBg")
            && $("div[data-id='SA1245'").hasClass("blueBg")
            && $("div[data-id='SA1430'").hasClass("blueBg")
            && $("div[data-id='SA1615'").hasClass("blueBg")
            && $("div[data-id='SA1800'").hasClass("blueBg")) {

            $("div[data-id='SA0730'").toggleClass("blueBg")
            $("div[data-id='SA0915'").toggleClass("blueBg")
            $("div[data-id='SA1100'").toggleClass("blueBg")
            $("div[data-id='SA1245'").toggleClass("blueBg")
            $("div[data-id='SA1430'").toggleClass("blueBg")
            $("div[data-id='SA1615'").toggleClass("blueBg")
            $("div[data-id='SA1800'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='SA0730'").hasClass("blueBg")) {
                $("div[data-id='SA0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA0915'").hasClass("blueBg")) {
                $("div[data-id='SA0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1100'").hasClass("blueBg")) {
                $("div[data-id='SA1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1245'").hasClass("blueBg")) {
                $("div[data-id='SA1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1430'").hasClass("blueBg")) {
                $("div[data-id='SA1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1615'").hasClass("blueBg")) {
                $("div[data-id='SA1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1800'").hasClass("blueBg")) {
                $("div[data-id='SA1800'").toggleClass("blueBg")
            }
        }
    }

    var row0730 = document.getElementsByClassName("row0730")[0];
    row0730.onclick = function () {

        if ($("div[data-id='MO0730'").hasClass("blueBg")
            && $("div[data-id='TU0730'").hasClass("blueBg")
            && $("div[data-id='WE0730'").hasClass("blueBg")
            && $("div[data-id='TH0730'").hasClass("blueBg")
            && $("div[data-id='FR0730'").hasClass("blueBg")
            && $("div[data-id='SA0730'").hasClass("blueBg")) {
            $("div[data-id='MO0730'").toggleClass("blueBg")
            $("div[data-id='TU0730'").toggleClass("blueBg")
            $("div[data-id='WE0730'").toggleClass("blueBg")
            $("div[data-id='TH0730'").toggleClass("blueBg")
            $("div[data-id='FR0730'").toggleClass("blueBg")
            $("div[data-id='SA0730'").toggleClass("blueBg")

        }
        else{
            if (!$("div[data-id='MO0730'").hasClass("blueBg")) {
                $("div[data-id='MO0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU0730'").hasClass("blueBg")) {
                $("div[data-id='TU0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE0730'").hasClass("blueBg")) {
                $("div[data-id='WE0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH0730'").hasClass("blueBg")) {
                $("div[data-id='TH0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR0730'").hasClass("blueBg")) {
                $("div[data-id='FR0730'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA0730'").hasClass("blueBg")) {
                $("div[data-id='SA0730'").toggleClass("blueBg")
            }
        }


    }

    var row0915 = document.getElementsByClassName("row0915")[0];
    row0915.onclick = function () {

        if ($("div[data-id='MO0915'").hasClass("blueBg")
            && $("div[data-id='TU0915'").hasClass("blueBg")
            && $("div[data-id='WE0915'").hasClass("blueBg")
            && $("div[data-id='TH0915'").hasClass("blueBg")
            && $("div[data-id='FR0915'").hasClass("blueBg")
            && $("div[data-id='SA0915'").hasClass("blueBg")) {
            $("div[data-id='MO0915'").toggleClass("blueBg")
            $("div[data-id='TU0915'").toggleClass("blueBg")
            $("div[data-id='WE0915'").toggleClass("blueBg")
            $("div[data-id='TH0915'").toggleClass("blueBg")
            $("div[data-id='FR0915'").toggleClass("blueBg")
            $("div[data-id='SA0915'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO0915'").hasClass("blueBg")) {
                $("div[data-id='MO0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU0915'").hasClass("blueBg")) {
                $("div[data-id='TU0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE0915'").hasClass("blueBg")) {
                $("div[data-id='WE0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH0915'").hasClass("blueBg")) {
                $("div[data-id='TH0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR0915'").hasClass("blueBg")) {
                $("div[data-id='FR0915'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA0915'").hasClass("blueBg")) {
                $("div[data-id='SA0915'").toggleClass("blueBg")
            }
        }
    }

    var row1100 = document.getElementsByClassName("row1100")[0];
    row1100.onclick = function () {

        if ($("div[data-id='MO1100'").hasClass("blueBg")
            && $("div[data-id='TU1100'").hasClass("blueBg")
            && $("div[data-id='WE1100'").hasClass("blueBg")
            && $("div[data-id='TH1100'").hasClass("blueBg")
            && $("div[data-id='FR1100'").hasClass("blueBg")
            && $("div[data-id='SA1100'").hasClass("blueBg")) {
            $("div[data-id='MO1100'").toggleClass("blueBg")
            $("div[data-id='TU1100'").toggleClass("blueBg")
            $("div[data-id='WE1100'").toggleClass("blueBg")
            $("div[data-id='TH1100'").toggleClass("blueBg")
            $("div[data-id='FR1100'").toggleClass("blueBg")
            $("div[data-id='SA1100'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO1100'").hasClass("blueBg")) {
                $("div[data-id='MO1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1100'").hasClass("blueBg")) {
                $("div[data-id='TU1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1100'").hasClass("blueBg")) {
                $("div[data-id='WE1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1100'").hasClass("blueBg")) {
                $("div[data-id='TH1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1100'").hasClass("blueBg")) {
                $("div[data-id='FR1100'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1100'").hasClass("blueBg")) {
                $("div[data-id='SA1100'").toggleClass("blueBg")
            }
        }
    }

    var row1245 = document.getElementsByClassName("row1245")[0];
    row1245.onclick = function () {

        if ($("div[data-id='MO1245'").hasClass("blueBg")
            && $("div[data-id='TU1245'").hasClass("blueBg")
            && $("div[data-id='WE1245'").hasClass("blueBg")
            && $("div[data-id='TH1245'").hasClass("blueBg")
            && $("div[data-id='FR1245'").hasClass("blueBg")
            && $("div[data-id='SA1245'").hasClass("blueBg")) {
            $("div[data-id='MO1245'").toggleClass("blueBg")
            $("div[data-id='TU1245'").toggleClass("blueBg")
            $("div[data-id='WE1245'").toggleClass("blueBg")
            $("div[data-id='TH1245'").toggleClass("blueBg")
            $("div[data-id='FR1245'").toggleClass("blueBg")
            $("div[data-id='SA1245'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO1245'").hasClass("blueBg")) {
                $("div[data-id='MO1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1245'").hasClass("blueBg")) {
                $("div[data-id='TU1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1245'").hasClass("blueBg")) {
                $("div[data-id='WE1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1245'").hasClass("blueBg")) {
                $("div[data-id='TH1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1245'").hasClass("blueBg")) {
                $("div[data-id='FR1245'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1245'").hasClass("blueBg")) {
                $("div[data-id='SA1245'").toggleClass("blueBg")
            }
        }
    }

    var row1430 = document.getElementsByClassName("row1430")[0];
    row1430.onclick = function () {

        if ($("div[data-id='MO1430'").hasClass("blueBg")
            && $("div[data-id='TU1430'").hasClass("blueBg")
            && $("div[data-id='WE1430'").hasClass("blueBg")
            && $("div[data-id='TH1430'").hasClass("blueBg")
            && $("div[data-id='FR1430'").hasClass("blueBg")
            && $("div[data-id='SA1430'").hasClass("blueBg")) {
            $("div[data-id='MO1430'").toggleClass("blueBg")
            $("div[data-id='TU1430'").toggleClass("blueBg")
            $("div[data-id='WE1430'").toggleClass("blueBg")
            $("div[data-id='TH1430'").toggleClass("blueBg")
            $("div[data-id='FR1430'").toggleClass("blueBg")
            $("div[data-id='SA1430'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO1430'").hasClass("blueBg")) {
                $("div[data-id='MO1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1430'").hasClass("blueBg")) {
                $("div[data-id='TU1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1430'").hasClass("blueBg")) {
                $("div[data-id='WE1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1430'").hasClass("blueBg")) {
                $("div[data-id='TH1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1430'").hasClass("blueBg")) {
                $("div[data-id='FR1430'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1430'").hasClass("blueBg")) {
                $("div[data-id='SA1430'").toggleClass("blueBg")
            }
        }
    }

    var row1615 = document.getElementsByClassName("row1615")[0];
    row1615.onclick = function () {

        if ($("div[data-id='MO1615'").hasClass("blueBg")
            && $("div[data-id='TU1615'").hasClass("blueBg")
            && $("div[data-id='WE1615'").hasClass("blueBg")
            && $("div[data-id='TH1615'").hasClass("blueBg")
            && $("div[data-id='FR1615'").hasClass("blueBg")
            && $("div[data-id='SA1615'").hasClass("blueBg")) {
            $("div[data-id='MO1615'").toggleClass("blueBg")
            $("div[data-id='TU1615'").toggleClass("blueBg")
            $("div[data-id='WE1615'").toggleClass("blueBg")
            $("div[data-id='TH1615'").toggleClass("blueBg")
            $("div[data-id='FR1615'").toggleClass("blueBg")
            $("div[data-id='SA1615'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO1615'").hasClass("blueBg")) {
                $("div[data-id='MO1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1615'").hasClass("blueBg")) {
                $("div[data-id='TU1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1615'").hasClass("blueBg")) {
                $("div[data-id='WE1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1615'").hasClass("blueBg")) {
                $("div[data-id='TH1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1615'").hasClass("blueBg")) {
                $("div[data-id='FR1615'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1615'").hasClass("blueBg")) {
                $("div[data-id='SA1615'").toggleClass("blueBg")
            }
        }
    }

    var row1800 = document.getElementsByClassName("row1800")[0];
    row1800.onclick = function () {

        if ($("div[data-id='MO1800'").hasClass("blueBg")
            && $("div[data-id='TU1800'").hasClass("blueBg")
            && $("div[data-id='WE1800'").hasClass("blueBg")
            && $("div[data-id='TH1800'").hasClass("blueBg")
            && $("div[data-id='FR1800'").hasClass("blueBg")
            && $("div[data-id='SA1800'").hasClass("blueBg")) {
            $("div[data-id='MO1800'").toggleClass("blueBg")
            $("div[data-id='TU1800'").toggleClass("blueBg")
            $("div[data-id='WE1800'").toggleClass("blueBg")
            $("div[data-id='TH1800'").toggleClass("blueBg")
            $("div[data-id='FR1800'").toggleClass("blueBg")
            $("div[data-id='SA1800'").toggleClass("blueBg")

        }
        else {
            if (!$("div[data-id='MO1800'").hasClass("blueBg")) {
                $("div[data-id='MO1800'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TU1800'").hasClass("blueBg")) {
                $("div[data-id='TU1800'").toggleClass("blueBg")
            }
            if (!$("div[data-id='WE1800'").hasClass("blueBg")) {
                $("div[data-id='WE1800'").toggleClass("blueBg")
            }
            if (!$("div[data-id='TH1800'").hasClass("blueBg")) {
                $("div[data-id='TH1800'").toggleClass("blueBg")
            }
            if (!$("div[data-id='FR1800'").hasClass("blueBg")) {
                $("div[data-id='FR1800'").toggleClass("blueBg")
            }
            if (!$("div[data-id='SA1800'").hasClass("blueBg")) {
                $("div[data-id='SA1800'").toggleClass("blueBg")
            }
        }
    }



    var $tableCell = $('.tableCell').mousedown(function () {
        event.preventDefault();
        $(this).toggleClass("blueBg");

        var flag = $(this).hasClass("blueBg")
        $tableCell.on("mouseenter.blueBg", function () {
            $(this).toggleClass("blueBg", flag);

        });
    });

    $(document).mouseup(function () {
        $tableCell.off('mouseenter.blueBg')
    });
})