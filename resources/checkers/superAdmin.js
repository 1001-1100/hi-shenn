$(document).ready(function(){
    $.ajax({
		type: "POST",
		url: "../admin/getSubjects",
		data: {

		},
		success: function(res) {
            let subjects = res.subjects
			for (let i = 0;i<subjects.length;i++){
                let cellString = ""
                for (let j =0;j<subjects[i].length;j++){
                    cellString += subjects[i][j]
                    if (j != subjects[i].length-1)
                        cellString += " | "
                }
                $("table.subjectsTable").append("<tr><td>"+cellString+"</td></tr>")
            }
		}
	});
})