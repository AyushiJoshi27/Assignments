$( document ).ready(function() {
  const link = "https://fakestoreapi.com/";
  var getUrl, categoriesUrl, categoryUrl, categoriesPath;
  getUrl = link + 'products';
  const usersUrl = link + 'users';
  categoriesUrl = link + "products/categories";
  var user = localStorage.getItem('username');

  $('.navbar-brand').click(function() {
    window.location.href = 'index.html';
  });

  $('#update-submit-btn').click(function() {
    $('#success-msg').show();
    $('#update-modal').hide();
  });

  $('.outer-wrapper').click(function () {
    $('#small-modal').show();
  });

  $('.close').click(function() {
    $('#update-modal').hide();
    $('#success-msg').hide();
    $('#small-modal').hide();
    $('#add-modal').hide();
  });

  $('.navbar-toggler').click(function() {
    $('#navbar-content').toggle();
    $('#name').hide();
  });

  $('.add-product-btn').click(function() {
    $('#add-modal').show();
  });

  function getData(method, getUrl, mainFn) {
    $.ajax({
      type: method,
      url: getUrl,
      success: mainFn,
    });
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
      $('.outer-wrapper').append(prepHtml);
    };

    $('.main-content').click(function() {
      var type = $(this).attr("data-id");
      let pack = products[type];
      var prepHtml = `<div class="main-content">`;
      prepHtml += htmlContent(pack, prepHtml);
      $('.modal-body').html(prepHtml);
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
    
    $('#nav-content li a').click(function () {
      var navObj = $(this).attr('data-id');
      $('.outer-wrapper, center h3').empty();
      var categoriesPath = link + 'products/category/' + navObj;
      const categoryFn = function(products) {
        $('center h3').html(products[0].category);
        wrapperCall(products);
      }
      getData('GET' ,categoriesPath, categoryFn);
    });
  };

  const userFn = function(products) {
    var name = $('#username').val();
    pwrd = $('#password').val();
    var len = products.length;
    for (let i = 0; i < len; i++) {
      var username = products[i].username;
      var password = products[i].password;
      var usersId = products[i].id;
      if (name == username && pwrd == password) {
        localStorage.setItem('username', username);
        localStorage.setItem('itemId', usersId);
        window.location.href = 'wishlist.html';
      }
      else if (name != username && pwrd == password) {
        $('.error-message').html("Please enter correct username");
      }
      else if (name == username && pwrd != password) {
        $('.error-message').html("Please enter correct password");
      }
    };
  };

  var userIdNum = localStorage.getItem('itemId');
  var cartUrl = "https://fakestoreapi.com/carts/user/" + userIdNum;

  const cartFn = function(products) {
    let len = products.length;
    html = `<tr><th>UserID: ${products[0].userId}</th>`;
    html += `<th>Date: ${products[0].date}</th></tr>`;
    html += `<tr><th>ProductId</th>`;
    html += `<th>Quantity</th></tr>`;
    $('.cart-head').append(html);
    for (let i = 0; i < len; i++) {
      var cart = products[i].products;
      var max = cart.length;
      for (let j = 0; j < max; j++) {
        var producthtml = `<tr><td>${cart[j].productId}</td>`;
        producthtml += `<td>${cart[j].quantity}</td><tr>`;
        $('.cart-body').append(producthtml);
      };
    };         
  };

  $('.get-in').click(function () {
    window.location.href = 'login.html';
  });

  $('.wishlist').click(function () {
    window.open(!user ? 'login.html' : 'wishlist.html', '_self');
  });

  $('.admin-page').click(function () {
    window.location.href = 'admin.html';
  });

  $('.get-in').html(user ? 'LOGOUT' : 'LOGIN');

  $('.submit-btn').click(function () {
    $('.error-message').empty();
    getData('GET', usersUrl, userFn);
  });

  //cart
  if (user) {
    $('#name').html(user);

    $('.exit').click(function () {
      localStorage.removeItem('username');
    });

    $('#cart').click(function () {
      window.location.href = 'cart.html';
    });
  };

  $('.submit-form').click(function(event) {
    event.preventDefault();
    $('#add-product-form').valid();

    var newObj = {
      title: $('#title').val(),
      price: $('#price').val(),
      description: $('#description').val(),
      image: $('#image').val(),
      category: $('#category').val()
    };
    if (newObj.title != '' && newObj.price != '' && newObj.description != '' && newObj.image != '' && newObj.category != '') {
      const postUrl = function() {
        $('#add-modal').hide();
        $('#success-msg .modal-body').html(`<p class="text-success">Product added successfully.</p>`);
      };
      getData('POST', getUrl, postUrl);
    };
  });

  $('#add-product-form').validate({
    rules: {
      title: 'required',
      description: 'required',
      price: 'required',
      image: 'required',
      category: 'required',
    },
    messages: {
      title: 'Title must be required',
      description: 'Description must be required',
      price: 'Price must be required',
      image: 'Image must be required',
      category: 'Category must be required',
    }
  });

  const deleteFn = function() {
    $('#success-msg .modal-body').html(`<p class="text-success">Product has been deleted successfully.</p>`);
  }

  const dataTable = function(products) {
    var len = products.length;
    for (let i = 0; i < len; i++) {
      var productTitle = products[i].title,
      productId = products[i].id;
      var innerHtml = `<tbody>`;
        innerHtml += `<tr><td>${productId}.</td>`;
        innerHtml += `<td>${productTitle}</td>`;
        innerHtml += `<td class="modify-block"><button type="button" class="product-update-btn" data-id="${productId}">UPDATE</button></td>`;
        innerHtml += `<td class="delete-block"><button type="button" class="bg-danger product-delete-btn" data-id="${productId}">DELETE</button><td>`;
        innerHtml += `</tr></tbody>`;
      $('.data-table').append(innerHtml);
    }

    $('.product-update-btn').click(function(event) {
      $('#update-product-form input').val('');
      //$('#update-product-form input').prop("readonly", true);
      var updateId = $(this).attr('data-id');
      $('#update-modal').show();
      event.preventDefault();
      updateUrl = getUrl + '/' + updateId; 

      const updateFn = function(data) {
        $('#m-title').val(data.title);
        $('#m-price').val(data.price);
        $('#m-description').val(data.description);
        $('#m-image').val(data.image);
      };

      getData('GET', updateUrl, updateFn);
    });

    $('.product-delete-btn').click(function() {
      var deleteId = $(this).attr('data-id'); 
      $('#success-msg').show();
      var prepHtml = `<div class="question-block">`;
        prepHtml += `<p text-dark>Are you sure you want to delete the product?</p>`;
        prepHtml += `<button class="bg-danger accept">YES</button>`;
        prepHtml += `<button class="bg-danger decline">NO</button>`;
        prepHtml += `</div>`;
        $('#success-msg .modal-body').html(prepHtml);  

      $('.accept').click(function() {
        $('#success-msg .modal-body').empty(); 
        var deleteUrl = getUrl + '/' + deleteId;
        getData('DELETE', deleteUrl, deleteFn);
      });

      $('.decline').click(function() {
        $('#success-msg').hide();
      });

    });
  };

  getData('GET', getUrl, mainFn);
  getData('GET', categoriesUrl, navFn);
  getData('GET', cartUrl, cartFn);
  getData('GET', getUrl, dataTable);
});