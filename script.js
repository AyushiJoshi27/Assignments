$(document).ready(function(){

  $("#seven").click(function(){
    document.forms.display.value += 7;
  })

  $("#eight").click(function(){
    document.forms.display.value += 8;
  }); 

  $("#nine").click(function() { 
    document.forms.display.value += 9;
  });

  $("#six").click(function() { 
    document.forms.display.value += 6;
  });

  $("#five").click(function() { 
    document.forms.display.value += 5;
  });

  $("#four").click(function() { 
    document.forms.display.value += 4;
  });

  $("#three").click(function() { 
    document.forms.display.value += 3;
  });

  $("#two").click(function() { 
    document.forms.display.value += 2;
  });
  
  $("#one").click(function() { 
    document.forms.display.value +=1;
  });
  
  $("#zero").click(function() { 
    document.forms.display.value += 0;
  });

  $("#div").click(function(){
    document.forms.display.value += "/";
  });

  $("#multiply").click(function() {
    document.forms.display.value += "*";
  });
  
  $("#add").click(function() { 
    document.forms.display.value += "+";
  });

  $("#subs").click(function() { 
    document.forms.display.value += "-";
  });

  $("#clearAll").click(function() { 
    $(".calculator")[0].reset();
  });

  $("#decimal").click(function(){
    document.forms.display.value += ".";
  });

  $("#clear").click(function() {
    clearButton = $("#display").val();
    if (clearButton.length > 0) {
      clearButton = clearButton.substring(0, clearButton.length - 1);
    };
    $("#display").val(clearButton);
  });

  $("#result").click(function(){
    if (display.value == "") {
      $(".").text("Please write some values to calculate");
    }
    else {
      document.forms.display.value = eval(document.forms.display.value);
    }
  });

});