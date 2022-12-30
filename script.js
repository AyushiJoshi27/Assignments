$('.openbtn').click(function(){
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("main").style.marginLeft = "25%";
});

$('.closebtn').click(function(){
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
});


$('.doc-block').hide();
$('#breed-list-block').show();
$('.endpoint li a').click(function(){
  var type = $(this).attr('data-type');
  $('.doc-block').hide();
  $('.content-' + type).show();
});

//random image-ajax function
$.randomFunc = function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breeds/image/random',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.main-img').hide();
      $('.table-content').html(`<img src='${products.message}' alt='product-img'>`);
    }
  });
}

$('.btn-fetch').click(function () {
  $.randomFunc();
});

//random 3 images
$('#random-trio').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breeds/image/random/3',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      //console.log(products.message.length)
      $('.random-tri').hide();
      $('.trio-table').empty();
      var table = $('.trio-table');
      for (let i = 0; i < products.message.length; i++) {
        table.append(`<tr><td><img src='${products.message[i]}' alt='product-img'></td></tr>`);
      };
    }
  });
});

$('#btn-with').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breed/hound/images/random',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.main-img').hide();
      $('.trio-table').html(`<img src='${products.message}' alt='product-img'>`);
    }
  });
});

$('#btn-with').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breed/hound/images/random',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.main-img').hide();
      $('.table-content').html(`<img src='${products.message}' alt='product-img'>`);
    }
  });
});

// 3 img from  breed DOC
$('#trio-fetch').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breed/hound/images/random/3',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.trio-img').hide();
      $('.trio-table').empty();
      var table = $(".trio-table");
      for (let i = 0; i < 3; i++) {
        table.append(`<tr><td><img src='${products.message[i]}' alt='product-img'></td></tr>`);
      };
    }
  });
});

//by sub breed  -4th link
//list sub breeds
$.ajax({
  type: 'GET',
  url: 'https://dog.ceo/api/breed/hound/list',
  dataType: 'JSON',
  list: {},
  success: function (list) {
    var names = $('#list');
    for (var i = 0; i < 7; i++) {
      names.append(`<p>${list.message[i]}</p><br>`);
    };
  }
});

$('#by-fetch').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breed/hound/afghan/images/random',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.main-img').hide();
      $('.table-content').html(`<img src='${products.message}' alt='product-img'>`);;
    }
  });
});

$('#tri-fetch').click(function () {
  $.ajax({
    type: 'GET',
    url: 'https://dog.ceo/api/breed/hound/afghan/images/random/3',
    dataType: 'JSON',
    products: {},
    success: function (products) {
      $('.tri-img').hide();
      $('.trio-table').empty();
      var table = $('.trio-table');
      for (let i = 0; i < 3; i++) {
        table.append(`<tr><td><img src='${products.message[i]}' alt='product-img'></td></tr>`);
      };
    }
  });
});
