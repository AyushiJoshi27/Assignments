const link = "https://fakestoreapi.com/";
var getUrl, categoriesUrl, categoryUrl;
getUrl = link + 'products';
const usersUrl = link + "users";
categoriesUrl = link + "products/categories";
var user = localStorage.getItem("username");
$('#name').html(user);

$(".outer-wrapper").click(function () {
  $("#small-modal").show();
});

$("#close").click(function() {
  $("#small-modal").hide();
  $("#add-modal").hide();
});

//newfeature
$('.close').click(function() {
  $('#update-modal').hide();
});

$('#msg-close').click(function() {
  $("#success-msg").hide();
});

$(".navbar-toggler").click(function() {
  $("#navbar-content").toggle();
});

$(".add-product-btn").click(function() {
  $("#add-modal").show();
});

function getValue(getUrl, mainFn) {
  $.ajax({
    type: "GET",
    url: getUrl,
    success: mainFn,
  })
};

function htmlContent(pack, prepHtml) {
  prepHtml += `<div class="img-wrap"><img src="${pack.image}"></div>`;
  prepHtml += `<div class="details">`;
  prepHtml += `<p><b>Title: </b>${pack.title}</p>`;
  prepHtml += `<p><b>Price: </b>$${pack.price}`;
  prepHtml += `<span class="rating"><b> Rating: </b>${pack.rating.rate}</span></p>`;
  prepHtml += `<p><b>Available: </b>Only ${pack.rating.count} items are left</p>`;
  prepHtml += `<details><summary><b>Description: </b></summary>${pack.description}</details>`;
  prepHtml += `</div>`;
  prepHtml += `</div>`;
  return prepHtml;
};

function wrapperCall(products) {
  var max = products.length;
  for (let index = 0; index < max; index++) {
    let pack = products[index];
    var prepHtml = `<div class="main-content" data-id="${index}">`;
    prepHtml += htmlContent(pack, prepHtml);
    $(".outer-wrapper").append(prepHtml);
  };

  $('.main-content').click(function() {
    var type = $(this).attr("data-id");
    let pack = products[type];
    var prepHtml = `<div class="main-content">`;
    prepHtml += htmlContent(pack, prepHtml);
    $(".modal-body").html(prepHtml);
  });
};

const mainFn = function(products) {
  wrapperCall(products);
};

const navFn = function (products) {
  var len = products.length;
  for (let i = 0; i < len; i++) {
    var categories = products[i];
    $('#nav-content').append(`<li class='nav-item'><a class='nav-link' href="#${categories}" data-id="${categories}">${categories}</a></li>`);
    $('#category').append(`<option class='category-opt'>${categories}</option>`);
  };
  
  $("#nav-content li a").click(function () {
    var navObj = $(this).attr("data-id");
    $(".outer-wrapper, center h3").empty();
    $.ajax({
      type: "GET",
      url: link + "products/category/" + navObj,
      success: function (products) {
        $("center h3").html(products[0].category);
        wrapperCall(products);
      }
    });
  });
};

const userFn = function(products) {
  console.log(products[5]);
  var name = $("#username").val();
  pwrd = $("#password").val();
  var len = products.length;
  for (let i = 0; i < len; i++) {
    var username = products[i].username;
    var password = products[i].password;
    var usersId = products[i].id;
    if (name == username && pwrd == password) {
      localStorage.setItem("username", username);
      localStorage.setItem("itemId", usersId);
      window.location.href = "wishlist.html";
    }
    else if (name != username && pwrd == password) {
      $(".error-message").html("Please enter correct username");
    }
    else if (name == username && pwrd != password) {
      $(".error-message").html("Please enter correct password");
    }
  };
};

var userIdNum = localStorage.getItem("itemId");
var cartUrl = "https://fakestoreapi.com/carts/user/" + userIdNum;

const cartFn = function(products) {
  let len = products.length;
  html = `<tr><th>UserID: ${products[0].userId}</th>`;
  html += `<th>Date: ${products[0].date}</th></tr>`;
  html += `<tr><th>ProductId</th>`;
  html += `<th>Quantity</th></tr>`;
  $(".cart-head").append(html);
  for (let i = 0; i < len; i++) {
    var cart = products[i].products;
    var max = cart.length;
    for (let j = 0; j < max; j++) {
      var producthtml = `<tr><td>${cart[j].productId}</td>`;
      producthtml += `<td>${cart[j].quantity}</td><tr>`;
      $(".cart-body").append(producthtml);
    };
  };         
};

$(".getin").click(function () {
  window.location.href = "login.html";
});

$(".wishlist").click(function () {
  if (!user) {
    window.open("login.html", "_self");
  }
  else {
    window.open("wishlist.html", "_self");
  }
});

$(".admin-page").click(function () {
  window.location.href = "admin.html";
});

if (!user) {
  $(".getin").html("LOGIN");
}
else {
  $(".getin").html("LOGOUT");
};

if (user) {
  $(".exit").click(function () {
    localStorage.removeItem('username');
    $(".getin").html("LOGIN");
  });
};

$(".submit-btn").click(function () {
  $(".error-message").empty();
  getValue(usersUrl, userFn);
});

//cart
if (user) {
  $("#cart").click(function () {
    window.location.href = "cart.html";
  });
};

$('.submit-form').click(function(event) {
  event.preventDefault();
  $("#add-product-form").valid();
  var newObj = {
    title: $('#title').val(),
    price: $('#price').val(),
    description: $('#description').val(),
    image: $('#image').val()
    //category: $('#category').val()
  };

  if (newObj.title != '' && newObj.price != '' && newObj.description != '' && newObj.image != '') {
    $('#success-msg').show();
    $.ajax({
      type: 'POST',
      url: getUrl,
      data: newObj,
      success: function(message,status) {
        console.log('Success', message, status)
      }
    });
  }
});

$('#add-product-form').validate({
  rules: {
    title: 'required',
    price: 'required',
    description: 'required',
    image: 'required',
    category: 'required'
  },
  message: {
    title: "Title is mandetory",
    price: "Price is mandetory",
    description: "Description is mandetory",
    image: "Image is mandetory",
    category: "Category is mandetory"
  }
});

const dataTable = function(products) {
  var len = products.length;
  for (let i = 0; i < len; i++) {
    var productTitle = products[i].title,
    productId = products[i].id;
    var innerHtml = `<tbody>`;
      innerHtml += `<tr><td>${productId}.</td>`;
      innerHtml += `<td>${productTitle}</td>`;
      innerHtml += `<td class="modify-block"><button type="button" class="product-update-btn" data-id="${productId}">UPDATE</button></td>`;
      innerHtml += `<td class="delete-block"><button type="button" class="bg-danger product-delete-btn" data-id="${productId}">DELETE</button><td></tr>`;
      innerHtml += `</tr></tbody>`;
    $(".data-table").append(innerHtml);
  }

  $('.product-update-btn').click(function() {
    $('#update-product-form input').val('');
    $('#update-product-form input').prop("readonly", true);
    var updateId = $(this).attr("data-id");
    //const modifyProduct = function() {}
    $('#update-modal').show();

    $.ajax({
      url: getUrl + '/' + updateId,
      type: 'GET',
      success: function(data) {
        $('#m-title').val(data.title);
        $('#m-price').val(data.price);
        $('#m-description').val(data.description);
        $('#m-image').val(data.image);
      }
    });

    $('#update-submit-btn').click(function() {
      $('#success-msg').show();
      $('#update-modal').hide();
    });

  });
  $('.product-delete-btn').click(function() {

    var deleteId = $(this).attr("data-id"); 
    $("#success-msg").show();
    var prepHtml = `<div class="question-block">`;
      prepHtml += `<p text-dark>Are you sure you want to delete the product?</p>`;
      prepHtml += `<button class="bg-danger accept">YES</button>`;
      prepHtml += `<button class="bg-danger decline">NO</button>`;
      prepHtml += `</div>`;
      $("#success-msg .modal-body").html(prepHtml);  

    $('.accept').click(function() {
      $("#success-msg .modal-body").empty(); 
      $.ajax({
        url: getUrl + '/' + deleteId,
        type: 'DELETE',
        success: function(data) {
          $("#success-msg .modal-body").html(`<p>Product has been deleted successfully.</p>`);
        }
      });
    });

    $('.decline').click(function() {
      $("#success-msg").hide();
    });

  });
};

getValue(getUrl, mainFn);
getValue(categoriesUrl, navFn);
getValue(cartUrl, cartFn);
getValue(getUrl, dataTable);
