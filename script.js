$(document).ready(function() {

  $("#valid-form").validate({
    rules: {
      "user-icon": "required",
      image : "required",
      age: {
        required: true,
        range : [0, 100]
      },
      gender : "required",
      email : {
        required :true
      },
      "choose-country" : "required",
      name: {
        required: true
      },
      phone : "required",
      "ways-to-contact" : "required",
      check: "required"
    }, 
    messages: {
      image : "choose a file",
      "user-icon": "choose a file",
      name: {
        pattern: "Enter your full name here!"
      },
      age : "Please enter your age between 0 to 100",
      gender : "Please select your gender!",
      "choose-country" : "Please choose the country you belong to!",
      phone : "Please enter your number without country code",
      "ways-to-contact" : "Please choose any one!",
      check: "Enter your date of birth"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });




  let countryState = {
    "india": {
      "state": ["Punjab", "Rajsthan", "Manipur", "Himachal Pradesh", "Sikkim"],
      "countryCode": "91"
    },
    "australia": {
      "state": ["Victoria", "Queensland", "Tasmania", "South Australia", "Western Australia"],
      "countryCode": "61"
    },
    "canada" : {
      "state": ["Alberta","Manitoba", "Ontario", "Nova Scotia", "Yukon"],
      "countryCode" : "1"
    },
    "italy" : {
      "state": ["Vento", "Marche", "Lazio", "Molise", "Liguria"],
      "countryCode": "39"
    },
    "switzerland": {
      "state": ["Zuc", "Uri", "Luzern", "Bern", "Glarus"],
      "countryCode": "41"
    }
  }

  $(".state").hide();
  $("#state").hide();

  $("#choose-country").change(function(){ 
    $('#state')
    .find('option')
    .remove()
    .end()
    .append('<option value="choose">select state</option>')
    .val('select state');
    for (var index = 0; index <= countryState[$('#choose-country').find(":selected").val()].state.length -1; index++) {
      $('#state').append('<option value="' + countryState[$('#choose-country').find(":selected").val()].state[index] + '">' + countryState[$('#choose-country').find(":selected").val()].state[index] + '</option>');
    }
    $("#state").show();
    $(".state").show();
    $("#phone").val(countryState[$('#choose-country').find(":selected").val()].countryCode);

    $( "#phone" )
    .focusout(function() {
      if (!/^d{12}$g/.test($("#phone").val())) {
        document.querySelector(".error").text("Please enter your ten digits phone number without country code");
        $("#phone").val('');
      }
    });
  });

});

let salaryValue = 0;

function decrease() {
  if (salaryValue>1) {
    salaryValue -=5;
  }
  $("#selectedSalary").text(salaryValue);
  document.querySelector("#myRange").stepDown(5);
}

function increase() {
  salaryValue +=5;
  $("#selectedSalary").text(salaryValue);
  document.querySelector("#myRange").stepUp(5);
}

let heightValue = 0;

function decrement() {
  if(heightValue > 1) {
    heightValue -= 2;
  }
  $("#selectedHeight").text(heightValue);
  document.querySelector("#my-height").stepDown(2);
}
function increment() {
  heightValue += 2;
  $("#selectedHeight").text(heightValue);
  document.querySelector("#my-height").stepUp(2);
}


$("#image").hide();
$("#user-icon").show();
function preview(e) {
  image.src=URL.createObjectURL(event.target.files[0]);
  $("#image").toggle();
  $("#user-icon").toggle();
};

jQuery( 'form' ).bind( 'keypress keydown keyup', function(e) {
  if (e.keyCode == 13) {
      e.preventDefault();
  }
});