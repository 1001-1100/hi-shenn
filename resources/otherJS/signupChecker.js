

$(document).ready(function () {

    $("#signup_button").click(function() {

        $("input[name=extra]").val( $("input[name=email]").val())

        if(checkFirstName() && checkLastName() && checkIDNumber() && checkMobileNumber() && checkEmail() && checkPass() && checkConfirmPass()){
            $("#signup_form").submit();
        }

    });

    $("input[name=email]").focusout(checkEmail)
    $("input[name=password]").focusout(checkPass)
    $("input[name=confirmPassword]").focusout(checkConfirmPass)
    $("input[name=idNumber]").focusout(checkIDNumber)
    $("input[name=mobNumber]").focusout(checkMobileNumber)
    $("input[name=firstName]").focusout(checkFirstName)
    $("input[name=lastName]").focusout(checkLastName)

})

function isValidEmail(email) {
    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /([a-zA-Z])+(_([a-zA-Z])+)+@dlsu.edu.ph$/;
    //regular expression is used to check email AUTOMAT INTENSIFIES


    return re.test(email);
}

function checkEmail(){
    if (!isValidEmail($("input[name=email]").val())){
        $("div#emailErr").css("display", "block")
        return false;
    }
    else{
        $("div#emailErr").css("display", "none")
        return true;
    }
}

function isValidPass(password) {
    if(password.length < 6)
        return false

    var hasSmall = false
    var hasBig = false
    var hasNum = false
    if (password.match(/[a-z]/)) {
        hasSmall = true
    }
    if (password.match(/[A-Z]/)) {
        hasBig = true
    }
    if (password.match(/[0-9]/)) {
        hasNum = true
    }
    if (hasBig && hasSmall && hasNum && password.length >= 6) {
        return true
    }

    return false
}

function checkPass() {
    if (!isValidPass($("input[name=password]").val())){
        $("div#passErr").css("display", "block")
        return false;
    }
    else{
        $("div#passErr").css("display", "none")
        return true;
    }
}

function checkConfirmPass(){
    if($("input[name=password]").val() === $("input[name=confirmPassword]").val()){
        $("div#confirmPassErr").css("display", "none")
        return true;
    }
    else{
        $("div#confirmPassErr").css("display", "block")
        return false;
    }
}

function isValidIDNumber(idNumber) {
    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^\d+$/;
    //regular expression is used to check email AUTOMAT INTENSIFIES

    
    return re.test(idNumber);
}

function checkMobileNumber(){
    
    /*var str = $("input[name=idNumber]").val();*/
    
    if (!isValidIDNumber($("input[name=idNumber]").val()) || $("input[name=mobNumber]").val.length != 11){
        $("div#mobNumErr").css("display", "block")
        return false;
    }
    else{
        $("div#mobNumErr").css("display", "none")
        return true;
    }
}

function checkIDNumber(){
    
    /*var str = $("input[name=idNumber]").val();*/
    
    if (!isValidIDNumber($("input[name=idNumber]").val()) || $("input[name=idNumber]").val.length != 8){
        $("div#idNumErr").css("display", "block")
        return false;
    }
    else{
        $("div#idNumErr").css("display", "none")
        return true;
    }
}

function checkFirstName(){
    if($("input[name=firstName]").val() === ""){
        $("div#firstNameErr").css("display", "block")
        return false;
    }
    else{
        $("div#firstNameErr").css("display", "none")
        return true;
    }
}

function checkLastName(){
    if($("input[name=lastName]").val() === ""){
        $("div#lastNameErr").css("display", "block")
        return false;
    }
    else{
        $("div#lastNameErr").css("display", "none")
        return true;
    }

}