$(document).ready(function() {
  var days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var now = new Date();
  var month = now.getMonth();
  var year = now.getFullYear();
  daysinmonth = new Date(year, month + 1, 0).getDate();
  firstdayofmonth = new Date(year, month, 1).getDay();

  $('#rightbtn').click(function () {
    const myNode = document.querySelector("#calendar");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    month++
    if (month == 12) {
      month = 0;
      year++;
    }
    daysinmonth = new Date(year, month + 1, 0).getDate();
    firstdayofmonth = new Date(year, month, 1).getDay();
    createCalendar()
  });

  $('#leftbtn').click(function () {
    const myNode = document.querySelector("#calendar");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    month--
    if (month == -1) {
      month = 11;
      year--;
    }
    daysinmonth = new Date(year, month + 1, 0).getDate();
    firstdayofmonth = new Date(year, month, 1).getDay();
    createCalendar()
  });
    
  createCalendar = () => {
    document.querySelector('#monthandyear').innerHTML = months[month] + ' ' + year;
    days.forEach(day => $('#calendar').append(`<div class="dayname">${day}</div>`));
    if (firstdayofmonth == 1) {
      null;
    } 
    else if (firstdayofmonth == 0) {
      for (i = 0; i < 6; i++) {
        $('#calendar').append(`<div class="emptyday"></div>`);
        }
    } 
    else {
      for (i = 0; i < firstdayofmonth - 1; i++)
        $('#calendar').append(`<div class="emptyday"></div>`);
    }
    for (let day = 1; day <= daysinmonth; day++) {
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
  createCalendar()

});
