// setting variables

let currentDate = moment().format("dddd, MMMM Do, YYYY");
let tasks = {};

function displayCurrentTime() {
    $("#currentDay").text(currentDate);
}

displayCurrentTime();

loadData ();

//function that will make the time grid, color code the sections according current time
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

    }
}
makeTimeSection();

//getting data for current data if there is anything store
function loadData () {
    let today = moment(new Date()).format("DD-MM-YYYY");
    let rawData = localStorage.getItem(today);
    if (rawData == null) {
        return;
    }
    tasks = JSON.parse(rawData);
};

//saving the data to local storage 
function saveHandler (event) {
    console.log("buttonclicked");

    let time = event.target.value;
    let currentTaskName = "textbox" + time;
    let currentTaskText = $('textarea[name="' + currentTaskName + '"]').val();
    
    tasks[time] = currentTaskText;

    let today = moment(new Date()).format("DD-MM-YYYY");
    let rawData = JSON.stringify(tasks);

    localStorage.setItem(today, rawData);
};
