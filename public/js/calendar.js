
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
        left: 'prev,next today',
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

                $('#calendarModal').modal('show');
                $("#title").val(info.event.title);
                $("#description").val(info.event.extendedProps.description);
                $("#startdt").val(formatDate(new Date(info.event.start)));
                $("#enddt").val(formatDate(new Date(info.event.end)));                
                $("#calendarID").text(info.event.id);
      },
      selectable: true, //allows dragging of event creation
      //selectMirror: true, //shows an event placeholder instead of highlighting times.  I removed this because
                            //it duplicates an event - ie, two show up until refresh
      select: function(info) { //when you select a chunk of time on the calendar
                // console.log(info);
                // alert('selected ' + info.startStr.slice(0,-6) + ' to ' + info.endStr.slice(0,-6));

                //alert('selected ' + info.startStr + ' to ' + info.endStr);
                
                var title = prompt("enter title")
                var description = prompt("enter description")

                var newEvent = {
                    title: title,
                    description: description,
                    start: info.startStr,
                    end: info.endStr
                };

                $.ajax( {
                    url: "/api/calendar",
                    type: "POST",
                    data: newEvent,
                    success: function() {                        
                        calendar.refetchEvents();  //re-retrieves the calendar
                    }                    

                })

      },
      //timeGrid options = https://fullcalendar.io/docs/timegrid-view
      allDaySlot: false,  //set to true shows an 'all day' row at the top of the calendar
      minTime: "08:00:00", //set the start time of the calendar
      maxTime: "17:00:00", //set the end time of the calender
      nowIndicator: true, //show a marker for the current day and time
      height: "auto", //removes empty space in the calendar below
      droppable: true, //allows something to be dropped on the calendar
      drop: function(info) { //when an external object is dropped on the calendar
                // console.log(info);
                // console.log(info.draggedEl.textContent)
                // console.log(info.dateStr)

                // console.log(info.date.toISOString())

                var endDate = info.date;
                endDate.setHours(endDate.getHours() + 1); //dropping an object on the calendar only sets the start date/time.
                                                          //This adds an hour to that date so a full appt can be saved
                //console.log(endDate);
      
                var newEvent = {
                    title: info.draggedEl.textContent,
                    description: info.draggedEl.textContent,
                    start: info.dateStr,
                    end: endDate
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
                //console.log(info);
          
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
                    data: updatedEvent//,
                    // success: function() {                        
                    //     calendar.refetchEvents();
                    // }                    

                })          
            // alert(info.event.title + " end is now " + info.event.end.toISOString());

            // if (!confirm("is this okay?")) {
            // info.revert();
            // }
      },
        eventDrop: function(info) { //when an existing event is dragged and dropped
                //console.log(info);
          
                 var updatedEvent = {
                    title: info.event.title,
                    description: info.event.extendedProps.description,
                    start: info.event.start,
                    end: info.event.end,
                    id: info.event.id
                };

                // $.post("/api/event", newEvent);
                $.ajax( {
                    url: "/api/calendar",
                    type: "PUT",
                    data: updatedEvent//,
                    // success: function() {                        
                    //     calendar.refetchEvents();
                    // }                    

                })          
            // alert(info.event.title + " end is now " + info.event.end.toISOString());

            // if (!confirm("is this okay?")) {
            // info.revert();
            // }
      }        
      
      //events should be in an array of objects
      // events: [
      //   {
      //     title: 'Meeting',
      //     start: '2020-05-12T10:30:00',
      //     end: '2020-05-12T12:30:00'
      //   },
      //   {
      //     title: 'Lunch',
      //     start: '2020-05-12T12:00:00'
      //   },
      //   {
      //     title: 'Click for Google',
      //     url: 'http://google.com/',
      //     start: '2020-05-28'
      //   }
      // ]
    });

    $(window).load(function() {
        calendar.render(); 
        var savebtn = document.getElementById('editModalSave');
        savebtn.addEventListener("click", updateCalendar);
        function updateCalendar() {
            $('#calendarModal').modal('hide');
    
            var updatedEvent = {
                title: $("#title").val(),
                description: $("#description").val(),
                start: $("#startdt").val(),
                end: $("#enddt").val(),
                id: $("#calendarID").text()
            };        
            
            $.ajax( {
                url: "/api/calendar",
                type: "PUT",
                data: updatedEvent,
                success: function() {
                    //  calendar.removeAllEvents();  //clears all events.  Do this because the 'dropped' event remains,
                    //                               //and when you re-retrieve, both events show, even though there is only
                    //                               //really one there.                       
                    calendar.refetchEvents(); //re-retrieves the calendar
                     
                }                    
    
             })
        }                        
    });
});

