$(document).ready(function () {
  var userName = localStorage.getItem('name');
  $('.in').html(userName ? 'LOGOUT' : 'LOGIN');
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,9}/;

  if (userName) {
    $('.name-info h3 strong, .user').html(userName);

    $('.out').click(function() {
      localStorage.removeItem('name');
      window.open('login.html', '_self');
    });
  };

  $('.submit-btn').click(function() {
    $.ajax({
      url: 'txt.json',
      type: 'GET',
      success: function(data) {
        var len = data.length;
        for (let i = 0; i < len; i++) {
          var dataArr = {name : $('.user-name').val(), pwrd : $('.user-password').val()};
          if (data[i].username == dataArr.name && data[i].password == dataArr.pwrd && regex.test(dataArr.pwrd)) {
            localStorage.setItem('name', dataArr.name);
            window.open('index.html', '_self');
          };
          if (dataArr.pwrd != data[i].password && i == len-1) {
            $('.user-error').html("Enter correct password!");
          };
          if (dataArr.name != data[i].username && i == len-1) {
            $('.user-error').html("Enter correct name!");
          };
          if (!regex.test(dataArr.name)) {
            $('.user-password').html('Password should contain at least 7 characters with at least one uppercase, lowercase, numbers and special signs');
          };
        }
      }
    });
  });

  $('#bio, .add-bio').click(function() {
    $(this).attr('class') != 'btn add-bio' ? $('#bio').show() && $('.text-area').addClass('d-none') : $('.text-area').removeClass('d-none') && $('#bio').hide();
  })

  $('.likes, .liked').click(function() {
    $(this).attr('class') == 'likes' ? $(this).addClass('liked') : $(this).removeClass('liked');
  });


  $('.friends-list img, .see-all-photo img').click(function() {
    var obj = $(this).attr('src');
    $('.img-modal .modal-body').html(`<img src="${obj}" alt="${obj}">`);
    $('#example-modal.modal').addClass('d-block');
  });

  //story add
  $('.story-edit, .btn.btn-secondary, .close').click(function() {
    $(this).attr('class') == 'story-edit' ? $('#confirm-modal').show() : $('#confirm-modal').hide() && $('#example-modal').removeClass('d-block');
  });

  $('#confirm-delete').click(function() {
    $('.img-clone').addClass('story-block');
    $('#confirm-modal').hide();
    $('.img-clone').clone().appendTo('.stories');
  });

  $('.in').click(function() {
    userName ? window.open('index.html', '_self') : window.open('login.html', '_self');
  });

  $('#confirm-modal btn-seconday, .text-area .bg-light').click(function() {
    $('#confirm-modal').hide();
    $('.text-area').hide();
    $('#bio').show();
  });
});