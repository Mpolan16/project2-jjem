
document.addEventListener('DOMContentLoaded', function() {
    //this section is all for making the things draggable to the calendar
    var Draggable = FullCalendarInteraction.Draggable;
    var containerEl = document.getElementById('external-events');

    new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
                    return {
                        title: eventEl.innerText
                    };
                }
    });
    //end draggable

    //build calendar and methods
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      //plugins: [ 'interaction', 'dayGrid' ], //if you want to show day instead of hours
      plugins: [ 'interaction', 'timeGrid' ],
      header: {
        //left: 'prevYear,prev,next,nextYear today',
        left: 'prev,next',
        center: 'title',
        //right: 'dayGridMonth,dayGridWeek,dayGridDay' //different controls for dayGrid
        right: 'timeGridWeek,timeGridDay'
      },
      //defaultDate: '2020-05-12',
      defaultDate: moment().format("YYYY-MM-DD"),
      navLinks: true, // can click day/week names to navigate views
      editable: true, //allows events to be edited - dragged, dropped, resized
      eventLimit: true, // allow "more" link when too many events
      events:{ //retrieving all events from db
                url: '/api/calendar',
                method: 'GET',
                failure: function() {
                    alert('there was an error while fetching calendar events!');
                },
                textColor: 'white' // a non-ajax option
      },
      eventOverlap: function(stillEvent, movingEvent) {
        return stillEvent.allDay && movingEvent.allDay;
      },
      eventClick: function(info) { //clicking an event fires this
                function formatDate(date) {
                    let month = date.getMonth() +1;
                    month = month < 10 ? '0'+month : month;
                    let day = date.getDate();
                    day = day < 10 ? '0'+day : day;
                    const strDate = date.getFullYear() + "-" + month + "-" + day
                    let hours = date.getHours();
                    hours = hours < 10 ? '0'+hours : hours;
                    let minutes = date.getMinutes();
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    const strTime = "T" + hours + ':' + minutes;            
                    return strDate + strTime;
                }

                //student dropdown retrieve      
                $.ajax({
                    url:"/api/students",
                    type: "GET",
                    dataType: 'JSON',
                    success: function (data) {                
                        $('#students').html('');
                        $.each(data, function(key, val){
                            if (info.event.title.trim() == val.first_name.trim() + " " + val.last_name.trim()) {
                                $('#students').append('<option id="' + val.id + '" selected>' + val.first_name.trim() + " " + val.last_name.trim() + '</option>');
                            }
                            else {
                                $('#students').append('<option id="' + val.id + '">' + val.first_name.trim() + " " + val.last_name.trim() + '</option>');
                            }
                            
                        })

                //populate the rest of the modal
                $("#description").val(info.event.extendedProps.description);
                $("#startdt").val(formatDate(new Date(info.event.start)));
                $("#enddt").val(formatDate(new Date(info.event.end)));                
                $("#calendarID").text(info.event.id);
                $('#calendarModal').modal('show');

            },
            error: function () {
                $('#students').html('<option id="-1">none available</option>');
            }
        });
        //end student dropdown retrieve                
      },
    //this set of commented code allows a user to select a date range on the calendar.  This may be added at a later date, so
    //commented code left intentionally.
    //   selectable: true, //allows dragging of event creation
    //   //selectMirror: true, //shows an event placeholder instead of highlighting times.  I removed this because
    //                         //it duplicates an event - ie, two show up until refresh
    //   select: function(info) { //when you select a chunk of time on the calendar
    //             // console.log(info);
    //             // alert('selected ' + info.startStr.slice(0,-6) + ' to ' + info.endStr.slice(0,-6));

    //             //alert('selected ' + info.startStr + ' to ' + info.endStr);
                
    //             var title = prompt("enter title")
    //             var description = prompt("enter description")

    //             var newEvent = {
    //                 title: title,
    //                 description: description,
    //                 start: info.startStr,
    //                 end: info.endStr
    //             };

    //             $.ajax( {
    //                 url: "/api/calendar",
    //                 type: "POST",
    //                 data: newEvent,
    //                 success: function() {                        
    //                     calendar.refetchEvents();  //re-retrieves the calendar
    //                 }                    

    //             })

    //   },      
      allDaySlot: false,  //set to true shows an 'all day' row at the top of the calendar
      minTime: "08:00:00", //set the start time of the calendar
      maxTime: "17:00:00", //set the end time of the calender
      nowIndicator: true, //show a marker for the current day and time
      height: "auto", //removes empty space in the calendar below
      droppable: true, //allows something to be dropped on the calendar
      drop: function(info) { //when an external object is dropped on the calendar
                var endDate = info.date;
                endDate.setHours(endDate.getHours() + 1); //dropping an object on the calendar only sets the start date/time.
                                                          //This adds an hour to that date so a full appt can be saved
      
                var newEvent = {
                    title: info.draggedEl.textContent,
                    //description: info.draggedEl.textContent,
                    start: info.dateStr,
                    end: endDate,
                    studentID: info.draggedEl.id
                };
                
                $.ajax( {
                    url: "/api/calendar",
                    type: "POST",
                    data: newEvent,
                    success: function() {
                         calendar.removeAllEvents();  //clears all events.  Do this because the 'dropped' event remains,
                                                      //and when you re-retrieve, both events show, even though there is only
                                                      //really one there.                       
                         calendar.refetchEvents(); //re-retrieves the calendar
                    }                    

                })
      
      },
      eventResize: function(info) { //when the event is resized (ie, time changed)
          
                var updatedEvent = {
                    title: info.event.title,
                    description: info.event.extendedProps.description,
                    start: info.event.start,
                    end: info.event.end,
                    id: info.event.id
                };
                
                $.ajax( {
                    url: "/api/calendar",
                    type: "PUT",
                    data: updatedEvent     

                })                      
      },
        eventDrop: function(info) { //when an existing event is dragged and dropped
                          
                 var updatedEvent = {
                    title: info.event.title,
                    description: info.event.extendedProps.description,
                    start: info.event.start,
                    end: info.event.end,
                    id: info.event.id
                };

                $.ajax( {
                    url: "/api/calendar",
                    type: "PUT",
                    data: updatedEvent
                })          
      }        
      
      //events should be in an array of objects
      // events: [
      //   {
      //     title: 'Meeting',
      //     start: '2020-05-12T10:30:00',
      //     end: '2020-05-12T12:30:00'
      //   }
      // ]
    });

    $(window).load(function() {
        calendar.render(); 
    });

    $(document).ready(function() {
       
        //event edit modal save
        var savebtn = document.getElementById('editModalSave');
        savebtn.addEventListener("click", updateCalendar);
        
        function updateCalendar() {

            let studentName = $("#students").val()
            let studentID = $("#students").find('option:selected').attr('id');
            //  let startDt = $("#startdt").val();
            //  let endDt = $("#enddt").val();
            let startDt = new Date($("#startdt").val()).toGMTString()
            let endDt = new Date($("#enddt").val()).toGMTString()                        

            if (startDt >= endDt) {
                $("#modalErrorText").attr("class", "show");
                return;
            }
            else {
                $("#modalErrorText").attr("class", "hide");
            }

            $('#calendarModal').modal('hide');
    
            var updatedEvent = {
                title: studentName,
                description: $("#description").val(),
                start: startDt,
                end: endDt,
                StudentId: studentID,
                id: $("#calendarID").text()
            };                    
            
            $.ajax( {
                url: "/api/calendar",
                type: "PUT",
                data: updatedEvent,
                success: function() {
                    calendar.refetchEvents(); //re-retrieves the calendar                     
                }                    
    
            })
        };
        //end event edit modal save

        //event modal delete
        var deleteBtn = document.getElementById('deleteEvent');
        deleteBtn.addEventListener("click", deleteEvent);
        
        function deleteEvent() {
            $('#calendarModal').modal('hide');
    
            const id = $("#calendarID").text();            
            
            $.ajax( {
                url: "/api/calendar/" + id,
                type: "DELETE",
                success: function() {                      
                    calendar.refetchEvents(); //re-retrieves the calendar                     
                }                    
    
            })
        };
        //end event modal delete                        
    });
});

