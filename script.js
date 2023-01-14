
//location.href = "index.html"; 
const link = "https://fakestoreapi.com/";
var endpoint = $(".content-all").attr("data-id");
var path, successfn;
var user = localStorage.getItem('username');
var useridnumber = localStorage.getItem('id');
$("#name").html(user);
$(".outer-wrapper").click(function () {
  $("#small-modal").show();
});
$("#close").click(function () {
  $("#small-modal").hide();
});

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



$(".submit-btn").click(function () {
  $(".error-message").empty();
  $.ajax({
    type: "GET",
    url: link + "users",
    success: function (user) {
      var inputusername = $("#username").val(),
      userpassword = $("#password").val();
      for (let i = 0; i < user.length; i++) {
        var username = user[i].username;
        var password = user[i].password;
        var userid = user[i].id;
        if (inputusername == username && userpassword == password) {
          localStorage.setItem("username", username);
          localStorage.setItem("id", userid);
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
  });
});

$(".dropdown-item").click(function() {
  window.location.href = "login.html";
})

$(".wishlist").click(function() {
  if (!user) {
    window.open("login.html", "_self");
  }
  else {
    window.open("wishlist.html", "_self");
  }
})

if (!user) {
  $(".dropdown-item").html("LOGIN");
}
else {
  $(".dropdown-item").html("LOGOUT");
}

if (user) {
  $(".exit").click(function() {
    localStorage.removeItem('username');
    $(".dropdown-item").html("LOGIN");
  });
}

//cart
if (user) {
  $("#cart").click(function() {
    window.location.href = "cart.html";
  });
}

$.ajax({
  type: "Get",
  url: link + "carts/user/" + useridnumber,
  success: function(cart) {
    let len = cart.length;
    html = `<tr><th>UserID: ${cart[0].userId}</th>`;
      html += `<th>Date: ${cart[0].date}</th></tr>`;
      html += `<tr><th>ProductId</th>`;
      html += `<th>Quantity</th></tr>`;
      $("thead").append(html);
      for (let i = 0; i < len; i++) {
        var products = cart[i].products;
        var max = products.length;
        for (let j = 0; j < max; j++) {
          var producthtml = `<tr><td>${products[j].productId}</td>`;
          producthtml += `<td>${products[j].quantity}</td><tr>`;
          $("tbody").append(producthtml);
        };
    };
  }
});