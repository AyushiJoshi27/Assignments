$( document ).ready(function() {
  const link = "https://fakestoreapi.com/";
  var getUrl, categoriesUrl;
  getUrl = link + 'products';
  const usersUrl = link + 'users';
  categoriesUrl = link + "products/categories";
  var user = localStorage.getItem('username');
  var userIdNum = localStorage.getItem('itemId');
  var cartUrl = link + "carts/user/" + userIdNum;

  $('.navbar-brand').click(function() {
    window.location.href = 'index.html';
  });

  function modalToggle(modalId, show) {
    show == true ? modalId.show() : modalId.hide();
  }

  $('.add-product-btn').click(function() {
    modalToggle($('#add-modal'), true);
  });
  
  $('.outer-wrapper').click(function() {
    modalToggle($('#small-modal'), true);
  });

  $('.close').click(function() {
    modalToggle($('.modal'), false);
    modalToggle($('#sucess-msg'), true);
  });

  $('.navbar-toggler').click(function() {
    $('#navbar-content').toggle();
    modalToggle($('#name'), true);
  });

  function getData(method, getUrl, mainFn) {
    $.ajax({
      type: method,
      url: getUrl,
      success: mainFn,
    });
  };

  function htmlContent(pack, prepHtml) {
    prepHtml += `<div class="img-wrap"><img src="${pack.image}" class="item-img"></div>`;
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
      prepHtml = htmlContent(pack, prepHtml);
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

  const navFn = function(products) {
    var len = products.length;
    for (let i = 0; i < len; i++) {
      var categories = products[i];
      $('#nav-content').append(`<li class='nav-item'><a class='nav-link' href="#${categories}" data-id="${categories}">${categories}</a></li>`);
      $('#category').append(`<option class='category-opt'>${categories}</option>`);
    };
    
    $('#nav-content li a').click(function() {
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
    var name = $('#username').val(),
    pwrd = $('#password').val();
    $('.login-form').valid(); 
    var len = products.length;
    for (let i = 0; i < len; i++) {
      var objArr = {username : products[i].username, password : products[i].password};
      var usersId = products[i].id;
      var onjUsername = objArr.username, objPassword = objArr.password;
      if (name == onjUsername && pwrd == objPassword) {
        var arr = [];
        arr.push(objArr.username);
        localStorage.setItem('username', arr);
        localStorage.setItem('itemId', usersId);
        window.location.href = 'wishlist.html';
      }
      else if (name != onjUsername && pwrd != objPassword) {
        $('.error-message').html("Your username and password does not match correctly");
      }
    };
  };

  $('.login-form').validate ({
    rules: {
      username: 'required',
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      username: "Title is mandatory",
      password: {
        required: "Password is mandatory.",
        minlength: "Please enter a password containing more than 5 characters."
      }
    }
  });

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

  $('.get-in').click(function() {
    window.location.href = 'login.html';
  });

  $('.wishlist').click(function() {
    window.open(!user ? 'login.html' : 'wishlist.html', '_self');
  });

  $('.admin-page').click(function() {
    window.location.href = 'admin.html';
  });

  $('.get-in').html(user ? 'LOGOUT' : 'LOGIN');

  $('.submit-btn').click(function() {
    $('.error-message').empty();
    getData('GET', usersUrl, userFn);
  });
  
  if (user) {
    $('#name').html(user)
    
    $('.exit').click(function() {
      localStorage.removeItem('username');
    });

    $('#cart').click(function() {
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
    const postUrl = function(products) {
      if (newObj.title != '' && newObj.price != '' && newObj.description != '' && newObj.image != '' && newObj.category != '') {
        console.log("success");
        modalToggle($('#add-modal'), false);
        modalToggle($('#success-msg'), true);
        $('#success-msg .modal-body').html(`<p class="text-success">Product added successfully.</p>`);
      };
    };
    getData('POST', getUrl, postUrl);
  });

  $('#add-product-form').validate({
    rules: {
      title: 'required',
      description: 'required',
      price: {
        min: 0,
        required: true
      },
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

  const dataTable = function(products) {
    var len = products.length;
    for (let i = 0; i < len; i++) {
      var productTitle = products[i].title,
      productId = products[i].id;
      var innerHtml = `<tbody>`;
        innerHtml += `<tr><td>${productId}.</td>`;
        innerHtml += `<td>${productTitle}</td>`;
        innerHtml += `<td class="modify-block"><button type="button" class="product-upgrade-btn" data-id="${productId}">UPDATE</button></td>`;
        innerHtml += `<td class="delete-block"><button type="button" class="bg-danger product-delete-btn" data-id="${productId}">DELETE</button></td>`;
        innerHtml += `</tr></tbody>`;
      $('.data-table').append(innerHtml);
    };

    $('.product-upgrade-btn').click(function(e) {
      $('#update-product-form input').val('');
      //$('#update-product-form input').prop("readonly", true);
      var updateId = $(this).attr('data-id');
      modalToggle($('#update-modal'), true);
      e.preventDefault();
      var updateUrl = getUrl + '/' + updateId; 

      const updateFn = function(data) {
        $('#m-title').val(data.title);
        $('#m-price').val(data.price);
        $('#m-description').val(data.description);
        $('#m-image').val(data.image);
        $('#m-category').html(`<option value="${data.category}">${data.category}</option>`);
      };

      getData('GET', updateUrl, updateFn);

      $('#update-submit-btn').click(function(e) {
        e.preventDefault();
        modalToggle($('#update-modal'), false);
        getData('PUT', updateUrl, function putProductFn() {
          $('#success-msg .modal-body').html(`<p class="text-success">Product has been successfully updated</p>`)
          }
        );
        modalToggle($('#success-msg'), true);
      });
    });

    $('.product-delete-btn').click(function() {
      modalToggle($('#delete-product'), true);
      var deleteId = $(this).attr('data-id');

      $('.accept').click(function(e) {
        e.preventDefault();
        var deleteUrl = getUrl + '/' + deleteId;
        getData('DELETE', deleteUrl, function deleteFn() {
          $('#success-msg .modal-body').html(`<p class="text-success">Product has been deleted successfully.</p>`);
        });
        modalToggle($('#success-msg'), true);
        console.log("toggle");
        modalToggle($('#delete-product'), false);
      });
    });

    $('.decline').click(function() {
      modalToggle($('#delete-product'), false);
    });
  };

  getData('GET', getUrl, mainFn);
  getData('GET', categoriesUrl, navFn);
  getData('GET', cartUrl, cartFn);
  getData('GET', getUrl, dataTable);
});
