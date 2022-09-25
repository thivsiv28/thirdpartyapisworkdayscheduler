let currentDate = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDate);

// structure will be 
/* 
{
    "9": "send emails", 
    "15": "meeting with client",
    
}

each key is the hour and the task is the value
whenever user clicks save. its going to save it to local storage
with key as todays date snd value is the total object.    
*/
let tasks = {};
//check time

var currentHour = moment().format("H");

var hoursOfWork = 9;

function displayCurrentTime() {
    $("#currentDay").text(currentDate);

}

displayCurrentTime();

loadData ();
//making the grid 
function makeTimeSection() {
    
    for (var i = 9; i < 18; i++) {

        let timeClass = "future";
        let hourStart = moment();




        hourStart.set('hour', i);
        hourStart.set('minute', 0);
        hourStart.set('second', 0);
        hourStart.set('millisecond', 0);
        let hourEnd = moment();
        hourEnd.set('hour', i);
        hourEnd.set('minute', 59);
        hourEnd.set('second', 59);
        hourEnd.set('millisecond', 999);
        let now = moment();

        if(hourStart.isBefore() && hourEnd.isAfter()) {
            timeClass = "present";
        }
        else if (hourEnd.isBefore(now)) {
            timeClass = "past";
        }
        else if (hourStart.isAfter(now)) {
            timeClass = "future";
        }

/* 
if now is after the hour starts and before the hours end then time =present
else if now is after hours end, time is in the past
else if now is before hour start, time is in the future
*/

        let timeColumn = $("<div>", {
            class: 'col-2',
        });

        let gridRow = $("<div>", {
            class: 'row',
        });
        let taskColumn = $("<div>", {
            class: 'col-8',
        });

        let saveColumn = $("<div>", {
            class: 'col-2',
        });
        let existingTasks = "";
        if (i in tasks) {
            existingTasks = tasks[i];
        }
        let tasksInfo = $("<textarea>", {
            text: existingTasks,
            name: "textbox" + i,
            "aria-label": 'with text area',
            class: ' form-control ' + timeClass,
        });
        // tasksInfo.val("asdadasd");
        tasksInfo.appendTo(taskColumn);
        let saveButton = $("<button>", {
            text: "Save Task",
            value: i,
            type: 'button',
            class: 'btn btn-outline-secondary'
        });

        

        saveButton.click(saveHandler);
        saveButton.appendTo(saveColumn);


        timeColumn.text(i + ":00");

        timeColumn.appendTo(gridRow);

        taskColumn.appendTo(gridRow);

        saveColumn.appendTo(gridRow);

        gridRow.appendTo("#timeBlocks");


        // else if (i > 12) {
        //     let hours =
        //         <div class="gridrow">
        //             <div class="col-4">(i + "pm")</div>
        //             <textarea class="form-control" aria-label="With textarea"></textarea>
        //             <button type="button" class="btn btn-outline-secondary">Save</button>
        //         </div>

        //     $('#timeBlocks').appendto(hours);

        // }

    }
}
makeTimeSection();

// $('.gridrow').each (function () {
//     if ($('.gridrow').attr()<currentHour) {
//         $('.gridrow').addClass(".past")
//     }

//     else if ($('.gridrow').attr()=currentHour) {
//         $('.gridrow').addClass(".present")
// }
// else {
//     ($('.gridrow').attr()>currentHour) ;
//         $('.gridrow').addClass(".future")
// }
// })

function loadData () {
    let today = moment(new Date()).format("DD-MM-YYYY");
    let rawData = localStorage.getItem(today);
    if (rawData == null) {
        return;
    }
    tasks = JSON.parse(rawData);
};

function saveHandler (event) {
    console.log("imclicked");
    let time = event.target.value;
    let currentTaskName = "textbox" + time;
    let currentTaskText = $('textarea[name="' + currentTaskName + '"]').val();
    //setting property of an object with value
    tasks[time] = currentTaskText;

    let today = moment(new Date()).format("DD-MM-YYYY");
    let rawData = JSON.stringify(tasks);
    localStorage.setItem(today, rawData);
};

// local storage and button clicker event
$(".btn btn-outline-secondary").on("click", function () {
    localStorage.setItem(hour, tasks);
    //how to specify to get all the hours and tasks though do we use parent siblings 
})


// localStorage.setItem("workTasks", JSON.stringify(tasks))

//make box green
//if time is past

// if (time right now is == currenttime ) {

//     then make the colors green for present;
// }

// else if ( time right now is before right now) {

//     then make the colors red for parse;
// }

// else if (time right now is after time then make it grey) {

// }

//make row red
//if time is future 
//make box grey
//save items into local storage 
//reload page and items should be there
//clicking button saves task
