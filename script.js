$(".breed-list").hide();
$(".random-breed").hide();
$(".with-breed").hide();
$(".heading").hide();
$(".by-sub-breed").hide();
$(".with-breed-one").hide();
$(".random-three").hide();
$(".browse-list").hide();
$("#list").hide();
$(".three-breeds").hide();

//random image-ajax function
$.randomFunc = function () {
  $.ajax({
    type: 'GET',
    url: "https://dog.ceo/api/breeds/image/random",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      console.log(products);

      $(".main-img").hide();
      $(".imgpage").html("<img src='" + products.message + "' alt='product-img' height='250px' width='400px'>" + "</td>");

    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
}

$("#btn-fetch").click(function () {
  $(".main-img").hide();
  $.randomFunc();
});

//breed list block DOC
$(".all-breed").click(function () {
  $(".heading-all").hide();
  $(".breed-list-block").show();
  $(".breed-list").show();
  $(".random-breed").hide();
  $(".with-breed").hide();
  $(".heading").hide();
  $(".by-sub-breed").hide();
  $(".with-breed-one").hide();
  $(".random-three").hide();
  $(".browse-list").hide();
  $("#list").hide();
  $(".three-breeds").hide();

  $.ajax({
    type: 'GET',
    url: "https://dog.ceo/api/breeds/list/all",
    dataType: 'JSON',
    products: {},

    success: function (products) {
      console.log(products.message)
    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});

//random breed list -DOCS
$(".random").click(function () {
  $(".random-breed").show();
  $(".breed-list").hide();
  $(".breed-list-block").hide();
  $(".with-breed").hide();
  $(".heading").hide();
  $(".by-sub-breed").hide();
  $(".with-breed-one").hide();
  $(".random-three").show();
  $(".browse-list").hide();
  $("#list").hide();
});


$("#btn-with").click(function(){
  $.ajax({
    type: 'GET',
    url: "https://dog.ceo/api/breed/hound/images/random",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      console.log(products);

      $(".main-img").hide();
      $(".imgpage").html("<img src='" + products.message + "' alt='product-img' height='250px' width='400px'>" + "</td>");

    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});

$("#btn-random").click(function(){
  $(".main-img").hide();
  $.randomFunc();
});

//random 3 images
$("#random-trio").click(function(){
  $.ajax({
    type: 'GET',
    url: "https://dog.ceo/api/breeds/image/random/3",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      //console.log(products);
      $(".random-tri").hide();
      $("#table-content").empty();

      var table = $("#table-content");
      for (let i = 0; i < 3 ; i++) {
        //console.log(products.message[i]);
        table.append("<td>" + "<img src='" +  products.message[i] + "' alt='product-img' height='250px' width='320px'>" +  "</td>");
      };
    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});


$(".by-breed").click(function () {
  $(".with-breed").show();
  $(".with-breed-one").show();
  $(".random-three").show();
  $(".heading-all").hide();
  $(".breed-list").hide();
  $(".random-breed").hide();
  $(".heading").hide();
  $(".by-sub-breed").hide();
  $(".browse-list").hide();
  $("#list").hide();
  $(".three-breeds").hide();
  $(".breed-list-block").hide()

});

// 3 img from  breed DOC
$("#trio-fetch").click(function(){
  $.ajax({
    type: 'GET',
    url : "https://dog.ceo/api/breed/hound/images/random/3",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      //console.log(products);
      $(".trio-img").hide();
      $(".trio-table").empty();

      var table = $(".trio-table");
      for (let i = 0; i < 3 ; i++) {
        //console.log(products.message[i]);
        table.append("<td>" + "<img src='" +  products.message[i] + "' alt='product-img' height='250px' width='320px'>" +  "</td>");
      };
    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});


//by sub breed  -4th link
$(".sub-breed").click(function () {
  $(".by-sub-breed").show();
  $("#list").show();
  $(".list-label").show();
  $(".breed-list").hide();
  $(".breed-list-block").hide();
  $(".with-breed").hide();
  $(".with-breed-one").hide();
  $(".random-three").hide();
  $(".random-breed").hide();
  $(".three-breeds").show();

  //list sub breeds
  $.ajax({
    type: "GET",
    url: "https://dog.ceo/api/breed/hound/list",
    dataType: 'JSON',
    list: {},

    success: function (list) {
      console.log(list);

      var names = $("#list");
      for (i = 0; i < 7; i++) {
        var para = $("<p/>");
        for (var i = 0; i < 7; i++) {
          para.append("<p>" + list.message[i] + "</p>");
        };

        names.html(para);
      };
    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});

$("#by-fetch").click(function(){
  $.ajax({
    type: 'GET',
    url: "https://dog.ceo/api/breed/hound/afghan/images/random",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      console.log(products);

      $(".main-img").hide();
      $(".imgpage").html("<img src='" + products.message + "' alt='product-img' height='250px' width='400px'>");

    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});

$("#tri-fetch").click(function(){
  $.ajax({
    type: 'GET',
    url : "https://dog.ceo/api/breed/hound/afghan/images/random/3",
    dataType: 'JSON',

    products: {},

    success: function (products) {
      //console.log(products);
      $(".tri-img").hide();
      $(".tri-table").empty();

      var table = $(".tri-table");
      for (let i = 0; i < 3 ; i++) {
        //console.log(products.message[i]);
        table.append("<td>" + "<img src='" +  products.message[i] + "' alt='product-img' height='250px' width='320px'>" +  "</td>");
      };
    },
    error: function (error, status) {
      console.log(error, status)
    }
  });
});
