

$(document).ready(function () {

    var edit = false;
    $(".contactEdit").click(function(){
        if(!edit){
            $("#tContact").removeAttr("disabled")
            $("#tContact").addClass("editable")
            $("#tContact").focus()
            edit = true;
            document.getElementsByClassName("contactEdit")[0].src="../images/saveIcon.png";
        }
        else{
            $("#editProfile").submit();
        }
    })


    var passwordIcon = document.getElementsByClassName("passwordEdit")[0];
    passwordIcon.onclick = function openPasswordModal(){
        var modal = document.getElementById('passwordModal');
        modal.style.display = "block";
    }

    var close = document.getElementsByClassName("closePassword")[0];
    close.onclick = function(){
        var modal = document.getElementById('passwordModal');
        modal.style.display = "none";
    }


    $("#submitButtonModal").click(function(){

        if(checkPass && checkConfirmPass()){
            $("#editPassword").submit();
        }

    })

    $("#signup_button").click(function() {

        $("input[name=extra]").val( $("input[name=email]").val())

        if(checkFirstName() && checkLastName() && checkEmail() && checkPass() && checkConfirmPass()){
            $("#signup_form").submit();
        }

    });

    $("input[name=newPassword]").focusout(checkPass)
    $("input[name=newPassword]").focusout(checkConfirmPass)
    $("input[name=confirmPassword]").focusout(checkConfirmPass)

})

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
    if (!isValidPass($("input[name=newPassword]").val())){
        $("div#newPassErr").css("display", "block")
        return false;
    }
    else{
        $("div#newPassErr").css("display", "none")
        return true;
    }
}

function checkConfirmPass(){
    if($("input[name=newPassword]").val() === $("input[name=confirmPassword]").val()){
        $("div#confirmPassErr").css("display", "none")
        return true;
    }
    else{
        $("div#confirmPassErr").css("display", "block")
        return false;
    }
}
