$(document).ready(function() {
  let salaryValue = 0, heightValue = 0;
  var mailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  $('#valid-form').validate({
    rules: {
      'prev-image': 'required',
      age: {
        required: true,
        range : [0, 100]
      },
      image : 'required',
      gender : 'required',
      email : 'required',
      name: 'required',
      'choose-country' : 'required',
      phone : {
        required: true,
        digits: true,
        minlength: 12,
        maxlength: 12
      },
      'ways-to-contact' : 'required',
      check: 'required'
    }, 
    messages: {
      'prev-image': "Choose a file",
      name: 'Enter your full name here!',
      age : 'Please enter your age between 0 to 100',
      gender : 'Please select your gender!',
      email : 'Please enter your email address',
      'choose-country' : 'Please choose the country you belong to!',
      phone : {
        required: 'Please enter your number',
        maxlength: 'Write your phone number containing 10 numbers without country code'
      },
      'ways-to-contact' : 'Please choose any one!',
      check: 'Enter your date of birth'
    }
  });

  let countryState = {
    'india': {
      'state': ['Punjab', 'Rajsthan', 'Manipur', 'Himachal Pradesh', 'Sikkim'],
      'countryCode': '91'
    },
    'australia': {
      'state': ['Victoria', 'Queensland', 'Tasmania', 'South Australia', 'Western Australia'],
      'countryCode': '61'
    },
    'canada' : {
      'state': ['Alberta','Manitoba', 'Ontario', 'Nova Scotia', 'Yukon'],
      'countryCode' : '1'
    },
    'italy' : {
      'state': ['Vento', 'Marche', 'Lazio', 'Molise', 'Liguria'],
      'countryCode': '39'
    },
    'switzerland': {
      'state': ['Zuc', 'Uri', 'Luzern', 'Bern', 'Glarus'],
      'countryCode': '41'
    }
  };

  $('#email').on('blur', function() {
    var mail = $(this).val(); 
    (mail && mailReg.test(mail)) ? console.log('True') : $('#email-error').html('Please enter a valid email address');
  });

  $('.state').hide();
  $('#state').hide();

  $('#choose-country').change(function(){ 
    $('#state').find('option').remove().end().append(`<option value="choose">select state</option>`).val('select state');
    for (var index = 0; index <= countryState[$('#choose-country').find(':selected').val()].state.length -1; index++) {
      $('#state').append(`<option value="${countryState[$('#choose-country').find(':selected').val()].state[index]}">${countryState[$('#choose-country').find(':selected').val()].state[index]}</option>`);
    }
    $('#state, .state').show();
    $('#phone').val(countryState[$('#choose-country').find(":selected").val()].countryCode);
  });

  $('#low-sal, #high-sal').click(function() {
    if ($(this).attr('id') == 'low-sal') {
      if (salaryValue>5) {
        salaryValue -=5;
      }
      document.querySelector("#myRange").stepDown(5);
    }
    else {
      salaryValue +=5;
      document.querySelector("#myRange").stepUp(5);  
    }
    $("#selectedSalary").text(salaryValue);
  });

  $('#short, #tall').click(function() {
    if ($(this).attr('id') == 'short') {
      if(heightValue > 1) {
        heightValue -= 2;
      }
      document.querySelector("#my-height").stepDown(2);
    }
    else {
      heightValue += 2;
      document.querySelector("#my-height").stepUp(2);
    }
      $("#selectedHeight").text(heightValue);
  });

  $("#image").hide();
  $("#user-icon").show();

  $('#preview').change(function(e) {
    image.src=URL.createObjectURL(e.target.files[0]);
    $("#image").toggle();
    $("#user-icon").toggle();
  });

  $( 'form' ).bind( 'keypress keydown keyup', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
  });

});
