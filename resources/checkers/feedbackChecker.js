$(document).ready(function () {

    $("#submitButton").click(function() {

        /*$("input[name=extra]").val( $("input[name=email]").val())*/
        event.preventDefault()
        if(checkConcernedTopic() /*&& checkComplaints()*/){
            modal.style.display = "block";
        }
        else{
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }


    });
    //close modal
    var modal = document.getElementById('sendFeedbackModal');

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    $("#noButtonModal").click(function(){
        modal.style.display = "none";
    });

    $("#yesButtonModal").click(function(){
        $("#feedbackForm").submit()
    });

    $("input[name=concernedTopic]").focusout(checkConcernedTopic)
    /*$("textarea[name=complaints]").focusout(checkComplaints)*/

})

function checkConcernedTopic(){
    // alert($("input[name=concernedTopic]").val())
    if($("input[name=concernedTopic]").val() === ""){
        $("div#concernedErr").css("display", "block")
        $("div#concernedErr2").css("display", "none")
        return false;
    }
    else if ($("textarea[name=complaints").val()==="" && $("textarea[name=suggestions").val()==="" && $("textarea[name=others").val()===""){
        $("div#concernedErr2").css("display", "inline-block")
        $("div#concernedErr").css("display", "none")
        return false;
    }
    else{
        $("div#concernedErr").css("display", "none")
        return true;
    }
}

/*function checkComplaints(){
    if($("textarea[name=complaints]").val() === ""){
        $("div#complaintsErr").css("display", "block")
        return false;
    }
    else{
        $("div#complaintsErr").css("display", "none")
        return true;
    }
}*/