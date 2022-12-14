const calendar = document.querySelector("#calendar")

var days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var now = new Date()
var month = now.getMonth()
var year = now.getFullYear()
daysinmonth = new Date(year, month + 1, 0).getDate()
firstdayofmonth = new Date(year, month, 1).getDay()

  $('#rightbtn').click(function (event) {
    const myNode = document.querySelector("#calendar");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    month++
    if (month == 12) {
      month = 0
      year++
    }
    daysinmonth = new Date(year, month + 1, 0).getDate()
    firstdayofmonth = new Date(year, month, 1).getDay()
    createCalendar()
  })

  $('#leftbtn').click(function (event) {
    const myNode = document.querySelector("#calendar");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    month--
    if (month == -1) {
      month = 11
      year--
    }
    daysinmonth = new Date(year, month + 1, 0).getDate()
    firstdayofmonth = new Date(year, month, 1).getDay()
    createCalendar()
  })
  /*
  $("#todaybtn").click(function(event) { 
    
    let date = new Date()
    let month = months[date.getMonth()];
    let currentYear = date.getFullYear();
    $("#monthandyear").text(month + ' ' +currentYear);
  });
  */
createCalendar = () => {
  //("#todate") = now.getDate();
  document.querySelector('#monthandyear').innerHTML =
    months[month] + ' ' + year
  days.forEach(day =>
    calendar.insertAdjacentHTML("beforeend",
      `<div class="dayname">${day}</div>`)
  )
  if (firstdayofmonth == 1) {
    //pass
  } else if (firstdayofmonth == 0) {
    for (i = 0; i < 6; i++) {
      calendar.insertAdjacentHTML("beforeend",
        `<div class="emptyday"></div>`)
      }
  } else {
    for (i = 0; i < firstdayofmonth - 1; i++)
      calendar.insertAdjacentHTML("beforeend",
        `<div class="emptyday"></div>`)
  }
  for (let day = 1; day <= daysinmonth; day++) {
    if (new Date(year, month, day).getDay() == 0 || new Date(year, month, day).getDay() == 6) 
    {
        calendar.insertAdjacentHTML("beforeend",
          `<div class="weekend">${day}<p></p></div>`)
    } 
    else if (day==now.getDate() && month == now.getMonth() && year == now.getFullYear()) {
      calendar.insertAdjacentHTML("beforeend", `<div class = "todate">${day}<p></p></div>`)
    }
    else
    {
      calendar.insertAdjacentHTML("beforeend",
        `<div class="day">${day} <p></p></div>`) 
        
    }
  }
}

createCalendar()
