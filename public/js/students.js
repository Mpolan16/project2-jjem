$(document).ready(function() {



const firstName = $("#firstName");
const lastName = $("#lastName");
const deleteFirst = $("#dfirstName");
const deleteLast = $("#dlastName");
const stuList = $(".deleteStu");

console.log(stuList.length);


// var addBtn = document.getElementById("addBtn");
//         addBtn.addEventListener("click", handleAddStudent);

stuList.on("click", handleDeleteStudent);

        
//$(document).on("click", "#deleteBtn", handleDeleteStudent);

function handleAddStudent() {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!firstName.val().trim().trim() || !lastName.val().trim().trim() ) {
      return;
    }
    
    // Calling the upsertStudent function and passing in the value of the name input
    upsertStudent(
        {
            first_name: firstName
                .val()
                .trim()
        ,
        
            last_name: lastName
                .val()
                .trim()
        }
       
    );
  }

  // A function for creating a student

function upsertStudent(studentData) {
    console.log(studentData);
  $.post("/api/student", studentData)
}

//when close is clicked fields are cleared



function handleDeleteStudent(event) {
    console.log(event);
event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
var stuID = $(this).attr("id");
$.ajax({
    method: "DELETE",
    url: "/api/student/" + stuID
  })

}


})

$('#modal1').modal();
$('#modal2').modal();