var today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let monthAndYear = document.getElementById('monthAndYear');
let buttons = document.getElementsByTagName("button");
document.getElementById("weekDays").innerHTML += ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(element => "<th>" + element + " </th>").join("");
showCalendar(currentMonth, currentYear);

const buttonsPressed = e => {
  let thisId = e.target.id;
  if (thisId === "next") {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
  }
  else if (thisId == "previous") {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  }
  else if (thisId == "today") {
    let date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
  }
  (thisId === "today") ? showCalendar(month, year) : showCalendar(currentMonth, currentYear);
}

for (let button of buttons) {
  button.addEventListener("click", buttonsPressed);
}

function showCalendar(month, year) {
  let firstDay = (new Date(year, month)).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  let tbl = document.getElementById('calendar-body'); 
  tbl.innerHTML = '';
  monthAndYear.innerHTML = months[month] + ' ' + year;
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth) {
        break;
      }
      else {
        let cell = document.createElement('td');
        let cellText = document.createTextNode(date);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("bg-primary", "text-white", "today");
        } 
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row); 
  };
};
