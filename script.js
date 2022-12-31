$('.openbtn').click(function(){
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("main").style.marginLeft = "25%";
});
$('.closebtn').click(function(){
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
});
var path = {
  'main' : 'https://dog.ceo/api/breeds/image/random', 'trio' : 'https://dog.ceo/api/breeds/image/random/3',
  'by' : 'https://dog.ceo/api/breed/hound/images/random', 'tri' : 'https://dog.ceo/api/breed/hound/images/random/3',
  'sub' : 'https://dog.ceo/api/breed/hound/afghan/images/random', 'thri' : 'https://dog.ceo/api/breed/hound/afghan/images/random/3'
};

$('.doc-block').hide();
$('.content-all').show();
$('.endpoint li a').click(function(){
  var type = $(this).attr('data-type');
  $('.doc-block').hide();
  $('.content-' + type).show(); 
});

$('.btn-block').click(function() {
  var handle = $(this).attr('data');
  $.ajax({
    type : 'GET',
    dataType : 'JSON',
    url : path[handle],
    product : {},
    success : function(product) {
      $('.img-' + handle).hide();
      let len = product.message;
      console.log(len);
    }
  });
});
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