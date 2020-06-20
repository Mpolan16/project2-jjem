const firstName = $("#firstName");
const lastName = $("#lastName");
const deleteFirst = $("#dfirstName");
const deleteLast = $("#dlastName");


$(document).on("click", "addBtn", );
$(document).on("click", "deleteBtn", );

function handleAddStudent(event) {
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
        },
        {
            last_name: lastName
                .val()
                .trim()
        }
    );
  }

  // A function for creating a student
<<<<<<< HEAD
function upsertStudent(studentData) {
$.post("/api/student", studentData)
}


function handleDeleteStudent(event) {
event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
if (!firstName.val().trim().trim() || !lastName.val().trim().trim() ) {
    return;
}

deleteStudent(
    

);
}
=======
  function upsertStudent(studentData) {
    $.post("/api/student", studentData)
  }


  function handleDeleteStudent(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!firstName.val().trim().trim() || !lastName.val().trim().trim() ) {
      return;
    }
    
    deleteStudent(
        
    
    );
  }
>>>>>>> b64c1e7e6e44a6106d4be7eae4eda11cdf3d32b2


function deleteStudent(studentData) {
    studentData.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/students/" + id
    })
  }



$('#modal1').modal();
$('#modal2').modal();