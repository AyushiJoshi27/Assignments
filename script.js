const daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

var currentDate = document.querySelector(".current-date");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function todaydate() {
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  mainCalendar(month, year);
};

const mainCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
  lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
  let calenlist = "";

  for (let i = firstDayofMonth; i > 0; i--) { 
    calenlist += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) { 
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
    calenlist += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 12; i++) { 
    calenlist += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; 
  daysTag.innerHTML = calenlist;
  
}
mainCalendar();

prevNextIcon.forEach(icon => { 
  icon.addEventListener("click", () => { 
      
    currMonth = icon.id === "previous" ? currMonth - 1 : currMonth + 1;
    
    if(currMonth < 0 || currMonth > 11) { 
      
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); 
      currMonth = date.getMonth(); 
    } else {
      date = new Date(); 
    }
    mainCalendar(); 
  });
});
