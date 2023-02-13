function gethistory() {
  return document.getElementById("result-screen").innerText;
}

function printhistory(num) {
  document.getElementById("result-screen").innerText=num;
}

function printoutput(num) {
  document.getElementById("display-screen").innerText=num;
}

printoutput("000")