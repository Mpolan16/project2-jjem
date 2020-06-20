$(document).ready(function() {



  const firstName = $("#firstName");
  const lastName = $("#lastName");
  const deleteFirst = $("#dfirstName");
  const deleteLast = $("#dlastName");
  //const stuList = $("#deleteStu");
  
  // var addBtn = document.getElementById("addBtn");
  //         addBtn.addEventListener("click", handleAddStudent);
  
  //stuList.on("click", handleDeleteStudent);
  
  var deleteStudentList = document.getElementById("deleteStu");
  deleteStudentList.addEventListener("click", loadStudents);
  
  var deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", handleDeleteStudent);
  
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
  
  function loadStudents() {
        //student dropdown retrieve      
          $.ajax({
            url:"/api/students",
            type: "GET",
            dataType: 'JSON',
            success: function (data) {                
                $('#student-delete').html('');
                $.each(data, function(key, val){                
                  $('#student-delete').append('<option id="' + data[key].id + '">' + data[key].first_name.trim() + " " + data[key].last_name.trim() + '</option>');
                })
            },
            error: function () {
                $('#student-delete').html('<option id="-1">none available</option>');
            }
        });
        //end student dropdown retrieve 
  };
  
  
  function handleDeleteStudent(event) {
  
        $('#modal2').modal('hide');
  
        $.ajax( {
            url: "/api/student/" + $("#student-delete").find(':selected').attr('id'),
            type: "DELETE",
            success: function() {
              window.location.replace("/");
            }
        })
  
  }
  
  
  })
  
  $('#modal1').modal();
  $('#modal2').modal();