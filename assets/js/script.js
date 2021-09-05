var rootEl = $(".container");
var dayEl = $("<ul>");
var testEl = $("<div>");
var timeBlock = {
    time: moment("00:00", "hh:mm"),
    Task: "",
    Status: "",
};
var currentTime = moment().format("HH");
var timeBlocks = [];
var startTime = moment("08:00", "HH:mm");
var endTime = moment("18:00", "HH:mm");

function colorCode(time) {
    if (time < currentTime) {
        return "past py-3";
    } else {
        if (time > currentTime) {
            return "future py-3";
        } else {
            return "present py-3";
        };
    }
}
function createCalendar() {
    var workingHours = moment.duration(endTime.diff(startTime)).asHours();
    for (var i = 0; i < workingHours; i++) {
        var timeBlock = $("<li>");
        var timeColor;
        var displayTime = moment(startTime).add(i, "hours").format("HH:mm");
        var hour = moment(startTime).add(i, "hours").format("HH");
        timeBlock.attr("id", "hour-" + i);
        timeBlock.append("<button class='saveBtn'>Save</button>");
        timeColor = colorCode(hour);
        timeBlock.addClass(timeColor);
        dayEl.append(timeBlock.text(displayTime));
        
        dayEl.attr("id", "day");
    };
};

function init() {
    createCalendar();
    rootEl.append(dayEl);
};
init();