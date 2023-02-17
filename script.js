$(document).ready(function() {
  var days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var now = new Date();
  var month = now.getMonth();
  var year = now.getFullYear();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var firstDayOfMonth = new Date(year, month, 1).getDay();

  $('#right-btn, #left-btn').click(function () {
    var choosedBtn = $(this).attr('id');
    const myNode = document.querySelector('#calendar');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    if (choosedBtn == 'right-btn') {
      month++;
      if (month == 12) {
        month = 0;
        year++;
      }
    }
    else {
      month--;
      if (month == -1) {
        month = 11;
        year--;
    }
    }
    daysInMonth = new Date(year, month + 1, 0).getDate();
    firstDayOfMonth = new Date(year, month, 1).getDay();
    createCalendar();
  });

  createCalendar = () => {
    document.querySelector('#month-and-year').innerHTML = months[month] + ' ' + year;
    days.forEach(day => $('#calendar').append(`<div class="day-name">${day}</div>`));
    if (firstDayOfMonth == 1) {
      null;
    } 
    else if (firstDayOfMonth == 0) {
      for (i = 0; i < 6; i++) {
        $('#calendar').append(`<div class="empty-day"></div>`);
        }
    } 
    else {
      for (i = 0; i < firstDayOfMonth - 1; i++)
        $('#calendar').append(`<div class="empty-day"></div>`);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      if (new Date(year, month, day).getDay() == 0 || new Date(year, month, day).getDay() == 6) {
        $('#calendar').append(`<div class="weekend">${day}</div>`);
      } 
      else if (day==now.getDate() && month == now.getMonth() && year == now.getFullYear()) {
        $('#calendar').append(`<div class = "todate">${day}</div>`);
      }
      else {    
        $("#calendar").append(`<div class="day">${day}</div>`);
      }
    }
  };
  createCalendar();

});
