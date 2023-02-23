$(document).ready(function () {
  $('.in').html(localStorage.getItem('username') ? 'LOGOUT' : 'LOGIN');
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,9}/;
  var password = $('.user-password').val();
    if (password && !regex.test((localStorage.getItem('username')))) {
      $('.user-error').html("Enter your correct password here!");
    }

  if (localStorage.getItem('username')) {
    $('.out').click(function() {
      localStorage.removeItem('username');
      window.open('login.html', '_self');
    });
  };

  $('.submit-btn').click(function() {
    $.ajax({
      url: 'txt.json',
      type: 'GET',
      success: function(data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          var dataArr = {name : $('.user-name').val(), pwrd : $('.user-password').val()};
          if (data[i].username == dataArr.name && data[i].password == dataArr.pwrd) {
            localStorage.setItem('username', dataArr.pwrd);
            window.open('index.html', '_self');
          } else {
            $('.user-error').html("Enter correct username & password here!");
          }
        }
      }
    });
  });

  $('#bio').click(function() {
    $('.text-area').removeClass('d-none');
    $('#bio').hide();
  })

  $('.share-icon:first').click(function() {
    $(this).addClass('liked');
  });

  //story add
  $('.story-edit, button, .close, .user-details').click(function() {
    ($(this).attr('class') == 'story-edit') ? ($('#confirmModal').show()) : ($('#confirmModal').hide());
    $(this).attr('class') == 'user-details' ? $('#edit-details').show() : $('#edit-details').hide();

  });

  $('.features, .user-hobbies').click(function() {
    var obj = $(this).attr('class');
    if (obj == 'btn features') {
      $('.edit-feature').removeClass('d-none');
    }
  });

  $('.in').click(function() {
    localStorage.getItem('username') ? window.open('index.html', '_self') : window.open('login.html', '_self');
  })

  $('#confirm-modal btn-seconday, .text-area .bg-light, #details').click(function() {
    $('#confirm-modal').hide();
    $('.text-area').hide() && $('#bio').show();
    $(this).attr('id') == 'details' ? $('#edit-details').show() : false;
  });
});