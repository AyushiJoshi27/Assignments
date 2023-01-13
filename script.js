//location.href = "index.html"; 
const link = "https://fakestoreapi.com/";
var endpoint = $(".content-all").attr("data-id");
var path, successfn;
$(".outer-wrapper").click(function () {
  $("#small-modal").show();
});
$("#close").click(function () {
  $("#small-modal").hide();
});
$(".dropdown-item").html("LOGIN");
function wrapperCall(products) {
  var max = products.length;
  for (let index = 0; index < max; index++) {
    let pack = products[index];
    var prephtml = `<div class="main-content" data-id="${index}">`;
    prephtml += `<div> <img src="${pack.image}"></div>`;
    prephtml += `<div class="details">`;
    prephtml += `<p><b>Title: </b>${pack.title}</p>`;
    prephtml += `<p><b>Price: </b>$${pack.price}`;
    prephtml += `<span class="rating"><b> Rating: </b>${pack.rating.rate}</span></p>`;
    prephtml += `<p><b>Available: </b>Only ${pack.rating.count} items are left</p>`;
    prephtml += `<details><summary><b>Description: </b></summary>${pack.description}</details>`;
    prephtml += `</div>`;
    prephtml += `</div>`;
    $(".outer-wrapper").append(prephtml);
  };
  $('.main-content').click(function () {
    var type = $(this).attr("data-id");
    let pack = products[type];
    var prephtml = `<div class="main-content">`;
    prephtml += `<div> <img src="${pack.image}"></div>`;
    prephtml += `<div class="details">`;
    prephtml += `<p><b>Title: </b>${pack.title}</p>`;
    prephtml += `<p><b>Price: </b>$${pack.price}`;
    prephtml += `<span class="rating"><b> Rating: </b>${pack.rating.rate}</span></p>`;
    prephtml += `<p><b>Available: </b>Only ${pack.rating.count} items are left</p>`;
    prephtml += `<details><summary><b>Description: </b></summary>${pack.description}</details>`;
    prephtml += `</div>`;
    prephtml += `</div>`;
    $("#selected-product").append(prephtml);
  });
}
//PRODUCTS UNDER NAV-CATEGORIES
function navProducts() {
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
//FOR ALL PRODUCTS
$.ajax({
  type: "GET",
  url: link + endpoint,
  success: function (products) {
    wrapperCall(products);
  }
});
//NAV CATEGORIES
$.ajax({
  type: "GET",
  url: link + "products/categories",
  success: function (products) {
    for (let i = 0; i < products.length; i++) {
      var categories = products[i];
      $('#nav-content').append(`<li class='nav-item'><a class='nav-link' href="#${categories}" data-id="${categories}">${categories}</a></li>`)
    };
    navProducts();
  }
});
//local storage
localStorage.setItem("username", $("#username").val());
localStorage.setItem("userpassword", $("#password").val());
var inputusername = localStorage.getItem("username");
var userpassword = localStorage.getItem("userpassword");
if (inputusername == "" && userpassword == "") {
  $(".dropdown-item").html("LOGIN");
}
else {
  $(".dropdown-item").html("LOGOUT");
}
//nevigate from dropdown to login.html
$(".dropdown-menu li a").click(function () {
  window.location.replace("login.html");
});
// add to wishlist
$(".wishlist").click(function () {
  var inputusername = localStorage.getItem("username");
  var userpassword = localStorage.getItem("userpassword");
  if (inputusername == "" && userpassword == "") {
    window.location.href = "login.html";
  }
});
//checking credentials
function checkCredentials(inputusername, userpassword, user) {

  var inputusername = localStorage.getItem("username");
  var userpassword = localStorage.getItem("userpassword");
  if (inputusername == "" && userpassword == "") {
    $(".error-message").html("Please enter your username and password");
  }
  for (let i = 0; i < user.length; i++) {
    let username = user[i].username, password = user[i].password;
    if (inputusername == username && userpassword == password) {
      window.location.href = "wishlist.html";
    }
    else if (inputusername != username && userpassword == password) {
      $(".error-message").html("Please enter correct username");
    }
    else if (inputusername == username && userpassword != password) {
      $(".error-message").html("Please enter correct password");
    }
  }
}
//LOGIN PAGE
function varifyIdentity() {
  var inputusername = localStorage.getItem("username");
  var userpassword = localStorage.getItem("userpassword");
  $.ajax({
    type: "GET",
    url: link + "users",
    success: function (user) {
      checkCredentials(inputusername, userpassword, user);
    }
  });
}
$(".submit-btn").click(function () {
  $(".error-message").empty();
  varifyIdentity();
});
//cart
$(".cart").click(function () {
  window.location.href = "cart.html";
});
$.ajax({
  type: "Get",
  url: link + "carts/user/2",
  success: function(data) {
    console.log(data);
    const cart = data[0];
    var html = `<table>`;
    html += `<tr><th>USERID: ${cart.userId}</th>`;
    html += `<th>DATE: ${cart.date}</th></tr>`;
    html += `<tr><th>PRODUCTID</th>`;
    html += `<th>QUANTITY</th></tr>`;
    html += `<tr><td>${cart.products[0].productId}</td>`;
    html += `<td>${cart.products[0].quantity}</td></tr>`;
    html += `<tr><td>${cart.products[1].productId}</td>`;
    html += `<td>${cart.products[1].quantity}</td></tr>`;
    html += `</table>`;
    $(".cart-content").html(html);
  }
});