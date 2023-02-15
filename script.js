$(document).ready(function() {
  $('.doc-block').hide();
  $('.content-all').show();

  const ajaxCall = function(callurl, sFn) {
    $.ajax({
      type: 'GET',
      url: callurl,
      success: sFn
    });
  };

  $('.openbtn').click(function() {
    $('#mySidebar').css('width', '300px');
    $('#main').css('marginLeft', '300px');
  });

  $('.closebtn').click(function() {
    $("#mySidebar").css('width', '0');
    $('#main').css('marginLeft', '0');
  });

  var path = {
    'main' : 'https://dog.ceo/api/breeds/image/random', 
    'trio' : 'https://dog.ceo/api/breeds/image/random/3', 
    'by' : 'https://dog.ceo/api/breed/hound/images/random',
    'tri' : 'https://dog.ceo/api/breed/hound/images/random/3', 
    'sub' : 'https://dog.ceo/api/breed/hound/afghan/images/random', 
    'thri' : 'https://dog.ceo/api/breed/hound/afghan/images/random/3',
    'list' : 'https://dog.ceo/api/breed/hound/list'
  };

  $('.endpoint li a').click(function() {
    var type = $(this).attr('data-type');
    $('.doc-block').hide();
    $('.content-' + type).show(); 

  });

  $('.btn-block').click(function() {
    var handle = $(this).attr('data');  
    
    const getData = function(product) {
      $('.img-' + handle).hide();
      if (product.message.length <= 3) {
        $('.table-block-' + handle).empty();
        for (i = 0; i < product.message.length; i++) {
          $('.table-block-' + handle).append(`<tr><td><img src='${product.message[i]}' class='img-api'></td></tr>`);
        };
      } 
      else {
        $('.table-' + handle).html(`<tr><td><img src='${product.message}' class='img-api'></td></tr>`);
      }
    };

    ajaxCall(path[handle], getData)
  });

  const listFn = function (list) {
    for (var i = 0; i < 7; i++) {
      $('#list').append(`<p>${list.message[i]}</p>`);
    };
  };

  ajaxCall(path['list'], listFn);
  const breedListUrl =  'https://dog.ceo/api/breeds/list/all';

  const breedListFn = function(lists) {
    $.each(lists.message, function (key, value) {
      $('.dog-selector').append(`<option value='${key}'>${key}</option>`);
    });
  }

  ajaxCall(breedListUrl, breedListFn);

  $("select.dog-selector").change(function() {
    var selectedDog = $(this).val();
    const selectedBreedUrl = 'https://dog.ceo/api/breed/' + selectedDog + '/images/random';
    
    $('#btn-breed').click(function() {
      ajaxCall(selectedBreedUrl, function selectedDogFn(dogImage) {
        $('.main-img').hide();
        $('.img-page').html(`<img src='${dogImage.message}' alt='product-img'>`);
      });
    });

  });

});