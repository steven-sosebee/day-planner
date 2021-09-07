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
var agenda = [];
var startTime = moment("00:00", "HH:mm");
var endTime = moment("24:00", "HH:mm");

function colorCode(time) {
    if (time < currentTime.format("HH")) {
        return "past";
    } else {
        if (time > currentTime.format("HH")) {
            return "future";
        } else {
            return "present";
        };
    }
}
function createCalendar() {
    var workingHours = moment.duration(endTime.diff(startTime)).asHours();
    for (var i = 0; i < workingHours; i++) {
        var timeBlock = $("<li data-hour='' class='row time-block'>");
        var saveBtn = $("<button class='saveBtn'>");
        var timeLabel = $("<div class='hour'>");
        var meetingLabel = $("<input class='description textarea body'>")
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

function filterCurrentDate() {
    
}
function populateCalendar() {
    var timeBlockEl = $("li.time-block");
    console.log(currentDayEl.text);
    console.log(moment("Tue September 07, 2021", "ddd MMMM DD, YYYY").format("DD/MMM/YYYY"));
    var dateAgenda = agenda.filter(todayAgenda => { return todayAgenda.date == "07/Sep/2021" });
    
    console.log(timeBlockEl);
    timeBlockEl.each(function(i){
    // for (var i = 0; i < hourEl.length; i++){
        var hourAgenda;
        console.log(dateAgenda);
        console.log($(this).data("hour"));
        // console.log($(this).children("input").val())
        hourAgenda = dateAgenda.filter(nowAgenda => {return nowAgenda.hour == $(this).data("hour")});
        console.log(!hourAgenda.length);
        // console.log(hourAgenda[0].title);
        if (hourAgenda.length) {
            $(this).children("input").val(hourAgenda[0].title);
        };
    });
};

function saveMeeting(mtgTitle, mtgHour, mtgDate, mtgStatus) {
    if (agenda === null) {
        agenda = [];
    };
    meeting.title = mtgTitle;
    meeting.hour = mtgHour;
    meeting.date = mtgDate;
    meeting.status = mtgStatus;
    console.log(meeting);
    agenda.push(meeting);
    localStorage.setItem("Agenda",JSON.stringify(agenda));
}
function init() {
    currentDayEl.html(currentTime.format("ddd MMMM DD, YYYY"));
    createCalendar();
    rootEl.append(dayEl);
    agenda = JSON.parse(localStorage.getItem("Agenda"));
    console.log(agenda);
    populateCalendar();
};

init();

$(".saveBtn").on("click", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    saveMeeting(
    $(event.target).closest("li").children("input").val(),
    $(event.target).closest("li").children("div").text(),
    currentTime.format("DD/MMM/YYYY"),
    "Pending"
    );
});