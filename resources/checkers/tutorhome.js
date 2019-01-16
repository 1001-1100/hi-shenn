$(document).ready(function(){
	$(".deleteAnnouncementButton").click()

	$("button.ACCEPT").click(function (event) {
		let id = $(event.target).attr("data-id")
		let email = $(event.target).attr("data-email")
        event.preventDefault()
        var modal = document.getElementById('confirmAccept');
        modal.style.display ="block";

        $("button#acceptTutee").attr("data-id",id)
        $("button#acceptTutee").attr("data-email",email)
    })
	$("button.REJECT").click(function (event) {
		let id = $(event.target).attr("data-id")
		let email = $(event.target).attr("data-email")
        event.preventDefault()
        var modal = document.getElementById('confirmReject');
        modal.style.display ="block";

        $("button#rejectTutee").attr("data-id",id)
        $("button#rejectTutee").attr("data-email",email)
    })

	$("button#acceptTutee").click(acceptTutee)
	$("button#rejectTutee").click(rejectTutee)
})

function acceptTutee(event){
	let id = $(event.target).attr("data-id")
	let email = $(event.target).attr("data-email")
	console.log("ACCEPTING REQ " + id + " BELONGING TO " + email)
	$.ajax({
		type: "POST",
		url: "../tutor/acceptTutee",
		data: {
			id,
			email
		},
		success: function() {
			location.reload();  
		}
	});
}

function rejectTutee(event){
	let id = $(event.target).attr("data-id")
	console.log("REJECTING REQ " + id)
	$.ajax({
		type: "POST",
		url: "../tutor/rejectTutee",
		data: {
			id
		},
		success: function() {
			location.reload();  
		}
	});
}