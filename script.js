
  $("#valid-form").validate({

    rules: {
      name : "required",
      email :"required",
      gender : "required",
      age : "required",
      country : "required",
      states : "required",
      "phone-number" : {
        required : true,
        digits : true
      },
      "ways-to-contact" : "required"
    }, 
    messages: {
      name : "Please enter your name!",
      email : "Please enter the valid email!",
      gender : "Please select your gender!",
      age : "please enter your current age!",
      country : "Please choose the country you belong to!",
      states : "Please choose the state you belong to!",
      "phone-number" : "Please enter you best contact numbers!",
      "ways-to-contact" : "Please choose any one!"
    }

  });

  $("#choose-country").change(function(){
    $(".choose-state").hide();
    $("." + this.value).toggle(['india','australia', 'canada', 'france', 'sweden'].indexOf(this.value)!=-1);
 
    
  });

function preview() {
  image.src=URL.createObjectURL(event.target.files[0]);
  };
