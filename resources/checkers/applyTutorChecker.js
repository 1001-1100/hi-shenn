$(document).ready(function() {

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

    if($('input[name=name]').length) {
        // put focusout of name id etc.
        $("input[name=name]").focusout(checkName)
        $("input[name=idNum]").focusout(checkidNum)
        $("input[name=mobileNum]").focusout(checkmobileNum)
        $("input[name=email]").focusout(checkEmail)
        $("input[name=course]").focusout(checkCourse)
    }

    $("input[name=terms]").focusout(checkTerms)
    $("textarea[name=ptsQuestion]").focusout(checkQuestion)


    var myArray =[];
    //WHEN USER SUBMITS REQUEST
    $("#submitButton").click(function() {

        event.preventDefault();

        var allCells = $('.tableCell');

        allCells.each(function (index) {
            if($(this).hasClass("blueBg")){
                myArray.push($(this).attr('data-id'));

            }
        });

        $("input#schedule").val(myArray);
        // alert(myArray)

        var tagArray = $("ul#extracurricular_tags").tagit("assignedTags");

        $("input#extracurricular").val(tagArray)

        // alert(tagArray)

        // $("#requestForm").submit();



        if($('input[name=name]').length){
            // if not logged in
            if(checkName() && checkidNum() && checkmobileNum() && checkEmail() && checkCourse() && checkTerms() && checkExtracurricular() && checkQuestion() && checkFreetime() && checkAgree() && checkEmptySched()){
                var modal = document.getElementById('myModal');
                modal.style.display ="block";
            }
            else{
                $('html, body').animate({ scrollTop: 0 }, 'fast');
            }
        }else{
            // if logged in
            if(checkTerms() && checkExtracurricular() && checkQuestion() && checkFreetime() && checkAgree() && checkEmptySched()){
                var modal = document.getElementById('myModal');
                modal.style.display ="block";
            }
            else{

            }
        }


    });


    function checkName(){
        if($("input[name=name]").val() === ""){
            $("div#nameErr").css("display", "block")
            return false;
        }
        else{
            $("div#nameErr").css("display", "none")
            return true;
        }

    }

    function checkCourse(){
        if($("input[name=course]").val() === ""){
            $("div#courseErr").css("display", "block")
            return false;
        }
        else{
            $("div#courseErr").css("display", "none")
            return true;
        }

    }

    function checkidNum(){
        if($("input[name=idNum]").val() === ""){
            $("div#idNumErr").css("display", "block")
            $("div#idNumErr").text("Required Field")

            return false;
        }
        else if($("input[name=idNum]").val().length !== 8){
            $("div#idNumErr").css("display", "block")
            $("div#idNumErr").text("Invalid ID Number")

            return false;
        }
        else{
            $("div#idNumErr").css("display", "none")
            return true;
        }

    }

    function checkmobileNum(){
        if($("input[name=mobileNum]").val() === ""){
            $("div#mobileNumErr").css("display", "block")
            $("div#mobileNumErr").text("Required Field")

            return false;
        }
        else if($("input[name=mobileNum]").val().length !== 11){
            $("div#mobileNumErr").css("display", "block")
            $("div#mobileNumErr").text("Invalid Mobile Number (09XXXXXXXXXX)")

            return false;
        }
        else{
            $("div#mobileNumErr").css("display", "none")
            return true;
        }

    }
    function isValidEmail(email) {
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /([a-zA-Z])+(_([a-zA-Z])+)+@dlsu.edu.ph$/;
        //regular expression is used to check email AUTOMAT INTENSIFIES


        return re.test(email);
    }

    function checkEmail(){
        if($("input[name=email]").val() === ""){
            $("div#emailErr").css("display", "block")
            $("div#emailErr").html("<i>Required Field</i>")
            return false;
        }
        else if (!isValidEmail($("input[name=email]").val())){
            $("div#emailErr").css("display", "block")
            $("div#emailErr").html("<i>Invalid Email</i>")
            return false;
        }
        else{
            $("div#emailErr").css("display", "none")
            return true;
        }
    }


    function checkTerms(){

        if($("input[name=terms]").val() === ""){
            $("div#termsErr").css("display", "block")
            return false;
        }
        else{
            $("div#termsErr").css("display", "none")
            return true;
        }
    }

    function checkQuestion(){

        if($("textarea[name=ptsQuestion]").val() === ""){
            $("div#ptsQuestionErr").css("display", "block")
            return false;
        }
        else{
            $("div#ptsQuestionErr").css("display", "none")
            return true;
        }
    }

    function checkFreetime(){
        // alert($("input[name=schedule]").val())
        if($("input[name=schedule]").val() != ''){
            $("div#schedErr").css("display", "none")
            return true;
        }
        else{
            $("div#schedErr").css("display", "block")
            return false;
        }
    }

    function checkExtracurricular(){
        if($("input[name=extracurricular]").val() != ''){
            $("div#extracurricularErr").css("display", "none")
            return true;
        }
        else{
            $("div#extracurricularErr").css("display", "block")
            return false;
        }
    }
    
    function checkAgree(){
        if($("input[name=agree]").prop('checked')){
            $("div#agreeErr").css("display", "none")
            return true;
        }
        else{
            $("div#agreeErr").css("display", "block")
            return false;
        }
    }
    
    function checkEmptySched(){
        if(myArray.length != 0){
            return true;
        }
        else{
            return false;
        }
    }

    $("ul#extracurricular_tags").tagit({
        allowSpaces: true,
        removeConfirmation: true
    });

    $("ul#extracurricular_tags").tagit({
        allowSpaces: true,
        removeConfirmation: true
    });

    //CLOSE MODAL
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
    });


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