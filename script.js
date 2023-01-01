
$('.doc-block').hide();
$('.content-all').show();
$(document).ready( function() {
$('.openbtn').click(function(){
  document.getElementById("mySidebar").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
});
$('.closebtn').click(function(){
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
});
var path = {
  'main' : 'https://dog.ceo/api/breeds/image/random', 'trio' : 'https://dog.ceo/api/breeds/image/random/3', 'by' : 'https://dog.ceo/api/breed/hound/images/random',
  'tri' : 'https://dog.ceo/api/breed/hound/images/random/3', 'sub' : 'https://dog.ceo/api/breed/hound/afghan/images/random', 'thri' : 'https://dog.ceo/api/breed/hound/afghan/images/random/3'
};
$('.endpoint li a').click(function(){
  var type = $(this).attr('data-type');
  $('.doc-block').hide();
  $('.content-' + type).show(); 
});
$('.btn-block').click(function() {
  var handle = $(this).attr('data');
  $.ajax({
    type : 'GET',
    url : path[handle],
    product : {},
    success : function(product) {
      $('.img-' + handle).hide();
      if (product.message.length <= 3) {
        $('.table-block-' + handle).empty();
        for (i = 0; i < product.message.length; i++) {
          $('.table-block-' + handle).append(`<tr><td><img src='${product.message[i]}' class='img-api'><td><tr>`);
        };
      } else {
        $('.table-' + handle).html(`<tr><td><img src='${product.message}' class='img-api'><td><tr>`);
      }
    }
  });
});
$.ajax({
  type: 'GET',
  url: 'https://dog.ceo/api/breed/hound/list',
  list: {},
  success: function (list) {
    for (var i = 0; i < 7; i++) {
      $('#list').append(`<p style="text-transform:capitalize;">${list.message[i]}</p><br>`);
    };
  }
});
});