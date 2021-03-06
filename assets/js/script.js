var rootEl = $(".container");
var currentDayEl = $("#currentDay");
var dayEl = $("<ul>");
var calendarEl = $("#day");
var testEl = $("<div>");
var btnEl = $(".saveBtn");
var hourEl = $("li");
var currentTime = moment();
var meeting = {
    title: "",
    hour: "",
    date: "",
    status: ""
};
var calendarDate =currentTime.format("DD/MMM/YYYY");
var agenda = [];
var startTime = moment("08:00", "HH:mm");
var endTime = moment("18:00", "HH:mm");

function colorCode(time) {
    // console.log(calendarDate);
    // console.log(currentTime.format("DD/MMM/YYYY"));
    if (calendarDate < currentTime.format("DD/MMM/YYYY")) {
        return "past";
    } else if (calendarDate > currentTime.format("DD/MMM/YYYY")) {
        return "future";
    } else {
        if (time < currentTime.format("HH:00")) {
            return "past";
        } else {
            if (time > currentTime.format("HH:00")) {
                return "future";
            } else {
                return "present";
            };
        };
    };
};
function deleteCalendar() {
    console.log(dayEl);
    dayEl.html("");
}
function createCalendar() {
    console.log("createCalendar");
    var workingHours = moment.duration(endTime.diff(startTime)).asHours();
    console.log(workingHours);
    for (var i = 0; i < workingHours; i++) {
        var timeBlock = $("<li data-hour='' class='row time-block d-flex justify-content-between'>");
        var saveBtn = $("<button class='saveBtn ml-auto'>");
        var timeLabel = $("<div class='hour'>");
        var meetingLabel = $("<input class='textarea'>")
        saveBtn.attr("id", "saveBtn-" + i);
        saveBtn.append("<i class='fas fa-lock'></i>");
        var timeColor;
        var displayTime = moment(startTime).add(i, "hours").format("HH:mm");
        var hour = moment(startTime).add(i, "hours").format("HH:mm");
        timeBlock.attr("id", "hour-" + i);
        timeBlock.attr("data-hour", hour);
        timeBlock.append(timeLabel);
        timeBlock.append(meetingLabel);
        timeBlock.append(saveBtn);
        timeColor = colorCode(hour);
        timeBlock.addClass(timeColor);
        timeLabel.text(displayTime);
        dayEl.append(timeBlock);        
        dayEl.attr("id", "day");
    };
};

function updateCurrentMeeting(mtgTitle, mtgHour, mtgDate) {
    console.log("Find current meeting: " + mtgDate + " " + mtgHour)
    for (var i = 0; i < agenda.length; i++) {
        // console.log(i);
        console.log(agenda[i]);
        if (agenda[i].date == mtgDate && agenda[i].hour == mtgHour) {
            agenda[i] = mtgTitle;
            // agenda.splice(i, 1);
            break;
          }
     }
    
    // var dateAgenda = agenda.filter(todayAgenda => { return todayAgenda.date == mtgDate });
    // var hourAgenda;
    //     // console.log(dateAgenda);
    //     // console.log($(this).data("hour"));
    //     // console.log($(this).children("input").val())
    //     hourAgenda = dateAgenda.filter(nowAgenda => {return nowAgenda.hour == mtgHour});
    //     // console.log(!hourAgenda.length);
    //     // console.log(hourAgenda[0].title);
    //     if (hourAgenda.length) {
    //         $(this).children("input").val(hourAgenda[0].title);
    //     };
};
function populateCalendar() {
    console.log("populateCalendar");
    if (agenda===null) {
        agenda = [];
    }
    var timeBlockEl = $("li.time-block");
    timeBlockEl.each(function (i) {
        $(this).children("input").val("");
    });
    // console.log(currentDayEl.text);
    // console.log(moment("Tue September 07, 2021", "ddd MMMM DD, YYYY").format("DD/MMM/YYYY"));
    var dateAgenda = agenda.filter(todayAgenda => { return todayAgenda.date == calendarDate});
    // console.log(moment(currentDayEl.data("date"), "ddd MMMM DD, YYYY").format("DD/MMM/YYYY"));
    // console.log(calendarDate);
    // console.log(dateAgenda);
    // console.log(timeBlockEl);
    timeBlockEl.each(function(i){
    // for (var i = 0; i < hourEl.length; i++){
        var hourAgenda;
        // console.log(dateAgenda);
        // console.log($(this).data("hour"));
        // console.log($(this).children("input").val())
        hourAgenda = dateAgenda.filter(nowAgenda => {return nowAgenda.hour == $(this).data("hour")});
        // console.log(!hourAgenda.length);
        // console.log(hourAgenda[0].title);
        if (hourAgenda.length) {
            $(this).children("input").val(hourAgenda[0].title);
        };
    });
};

function saveMeeting(mtgTitle, mtgHour, mtgDate, mtgStatus) {
    console.log("saveMeeting");
    if (agenda.length == 0) {
        meeting.title = mtgTitle;
        meeting.hour = mtgHour;
        meeting.date = mtgDate;
        meeting.status = mtgStatus;
        console.log(meeting);
        agenda.push(meeting);
        console.log("--initlized agenda");
        localStorage.setItem("Agenda", JSON.stringify(agenda));
        agenda = JSON.parse(localStorage.getItem("Agenda"));
        console.log("Agenda saved");
        return;
    } else {
        console.log("--loop through agenda index");
        for (var i = 0; i < agenda.length; i++) {
            // console.log(i);
            // console.log(agenda[i]);
            // console.log(agenda[i].date);
            // console.log(agenda[i].hour);
            // console.log(mtgHour);
            // console.log(mtgDate);
            if (agenda[i].date == mtgDate && agenda[i].hour == mtgHour) {
                console.log(i + "adjusted meeting title");
                agenda[i].title = mtgTitle;
                // console.log(agenda[i]);
                localStorage.setItem("Agenda", JSON.stringify(agenda));
                agenda = JSON.parse(localStorage.getItem("Agenda"));
                console.log("Agenda saved");
                return;
            };
        };
        console.log("--add new meeting");
        meeting.title = mtgTitle;
        meeting.hour = mtgHour;
        meeting.date = mtgDate;
        meeting.status = mtgStatus;
        console.log(meeting);
        agenda.push(meeting);
        localStorage.setItem("Agenda", JSON.stringify(agenda));
        agenda = JSON.parse(localStorage.getItem("Agenda"));
        console.log("Agenda saved");
    };
};

function init() {
    console.log("init");
    currentDayEl.val(currentTime.format("ddd MMMM DD, YYYY"));
    currentDayEl.attr("data-date", currentTime.format("ddd MMMM DD, YYYY"));
    createCalendar();
    rootEl.append(dayEl);
    agenda = JSON.parse(localStorage.getItem("Agenda"));
    console.log(agenda);
    populateCalendar();
};

init();
// currentDayEl.on("blur", function (event) {
//     console.log(currentDayEl);
//     currentDayEl.attr("data-date",);
//     var newDate = $(this).datepicker('getDate');
//     console.log(newDate);
//         currentDayEl.attr("data-date", newDate);
//         currentDayEl.val(newDate);
//         console.log("Test");
//         populateCalendar();
// });

$(".saveBtn").on("click", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    saveMeeting(
    $(event.target).closest("li").children("input").val(),
    $(event.target).closest("li").children("div").text(),
    calendarDate,
    "Pending"
    );
});

currentDayEl.datepicker({
    dateTimeFormat: "D MM dd, yy",
    onSelect: function () {
        var newDate = $(this).datepicker('getDate');
        console.log(newDate);
        calendarDate = moment(newDate).format("DD/MMM/YYYY");
        console.log(calendarDate);
        currentDayEl.attr("data-date", newDate);
        currentDayEl.val(newDate);
        console.log("Test");
        console.log(currentDayEl.val);
        console.log(currentDayEl.data("date"));
        deleteCalendar();
        createCalendar();
        // rootEl.append(dayEl);
        populateCalendar();
    }
});