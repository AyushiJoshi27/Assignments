$( document ).ready(function() {
  const link = "https://fakestoreapi.com/";
  var getUrl = link + 'products';
  const usersUrl = link + 'users';
  const categoriesUrl = link + "products/categories";
  var user = localStorage.getItem('username');
  var userIdNum = localStorage.getItem('itemId');
  var cartUrl = link + "carts/user/" + userIdNum;
  modalToggle($('.content-wrap'), false);
  $('.get-in').html(user ? 'LOGOUT' : 'LOGIN');

  function modalToggle(modalId, show) {
    show == true ? modalId.show() : modalId.hide();
  }

  $('.navbar-brand, .add-product-btn').click(function() {
    'navbar-brand' == $(this).attr('class') ? window.open('index.html', '_self') : modalToggle($('#add-modal'), true);
  });

  $('.close').click(function(e) {
    modalToggle($('.modal'), false);
    e.preventDefault();
  });

  $('.navbar-toggler').click(function() {
    $('#navbar-content').toggle();
    modalToggle($('#name'), true);
  });

  function getData(getType, getUrl, mainFn) {
    $.ajax({
      type: getType,
      url: getUrl,
      success: mainFn,
    });
  };

  function htmlContent(pack, prepHtml) {
    prepHtml += `<div class="img-wrap"><img src="${pack.image}" class="item-img"></div>`;
    prepHtml += `<div class="details">`;
    prepHtml += `<p><b>Title: </b>${pack.title}</p><p><b>Price: </b>$${pack.price}`;
    prepHtml += `<span class="rating"><b> Rating: </b>${pack.rating.rate}</span></p>`;
    prepHtml += `<p><b>Available: </b>Only ${pack.rating.count} items are left</p>`;
    prepHtml += `<details><summary><b>Description: </b></summary>${pack.description}</details>`;
    prepHtml += `</div></div>`;
    return prepHtml;
  };

  function wrapperCall(products) {
    for (let index = 0; index < products.length; index++) {
      let pack = products[index];
      var prepHtml = `<div class="main-content" data-id="${index}">`;
      prepHtml = htmlContent(pack, prepHtml);
      $('.outer-wrapper').append(prepHtml);
    };

    $('.main-content').click(function() {
      modalToggle($('#small-modal'), true);
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
    for (let i = 0; i < products.length; i++) {
      var categories = products[i];
      $('#nav-content').append(`<li class='nav-item'><a class='nav-link' href="#${categories}" data-id="${categories}">${categories}</a></li>`);
      $('#category').append(`<option class='category-opt'>${categories}</option>`);
    };
    
    $('#nav-content li a').click(function() {
      var navObj = $(this).attr('data-id');
      modalToggle($('.main-block'), false) ? modalToggle($('.main-block'), false) : modalToggle($('.content-wrap'), true);
      $('.outer-wrapper, center h3').empty();
      var categoriesPath = link + 'products/category/' + navObj;

      const categoryFn = function(products) {
        $('center h3').html(products[0].category);
        wrapperCall(products);
      };

      getData('GET' ,categoriesPath, categoryFn);
    });
  };

  const userFn = function(products) {
    var name = $('#username').val(),
    pwrd = $('#password').val();
    var valid = $('.login-form').valid(); 
    if (valid) {
      for (let i = 0; i < products.length; i++) {
        var objArr = {username : products[i].username, password : products[i].password};
        var usersId = products[i].id;
        var onjUsername = objArr.username, objPassword = objArr.password;
        if (name == onjUsername && pwrd == objPassword) {
          var arr = [];
          arr.push(objArr.username);
          localStorage.setItem('username', arr);
          localStorage.setItem('itemId', usersId);
          window.open('wishlist.html', '_self');
        }
        else if (name != objUsername && pwrd != objPassword) {
          $('.error-message').html("Your username and password does not match correctly");
        }
      };
    };
  };

  const cartFn = function(products) {
    html = `<tr><th>UserID: ${products[0].userId}</th>`;
    html += `<th>Date: ${products[0].date}</th></tr>`;
    html += `<tr><th>ProductId</th><th>Quantity</th></tr>`;
    $('.cart-head').append(html);
    for (let i = 0; i < products.length; i++) {
      var cart = products[i].products;
      for (let j = 0; j < cart.length; j++) {
        var producthtml = `<tr><td>${cart[j].productId}</td>`;
        producthtml += `<td>${cart[j].quantity}</td><tr>`;
        $('.cart-body').append(producthtml);
      };
    };
  };

  $('.get-in, .admin-page').click(function() {
    window.open(('dropdown-item admin-page' == $(this).attr('class')) ? 'admin.html' : 'login.html', '_self');
  });

  $('.submit-btn').click(function() {
    getData('GET', usersUrl, userFn);
  });
  
  if (user) {
    $('#name').html(user)
    
    $('.exit').click(function() {
      localStorage.removeItem('username');
    });
  };

  $('#cart, #wishlist').click(function() {
    window.open(!user ? 'login.html' : ($(this).attr('id') + '.html'), '_self');
  });

  $('.submit-form').click(function(event) {
    event.preventDefault();
    var valid = $('#add-product-form').valid();

    const postUrl = function() {
      if (valid) {
        modalToggle($('#add-modal'), false);
        $('#success-msg .modal-body').html(`<p class="text-success">Product added successfully.</p>`);
        valid ? modalToggle($('#success-msg'), true) : modalToggle($('#add-modal'), false);
      };
    };

    getData('POST', getUrl, postUrl);
  });

  $('.form-content').validate({
    rules: {
      title: 'required',
      description: 'required',
      price: {
        min: 0,
        required: true
      },
      image: 'required',
      category: 'required',
      username: 'required',
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      title: 'Title must be required',
      description: 'Description must be required',
      price: 'Price must be required',
      image: 'Image must be required',
      category: 'Category must be required',
      username: "Title is required",
      password: "Please enter a password containing more than 5 characters."
    }
  });

  const dataTable = function(products) {
    for (let i = 0; i < products.length; i++) {
      var productTitle = products[i].title,
        productId = products[i].id;
      var innerHtml = `<tbody>`;
        innerHtml += `<tr><td>${productId}.</td><td>${productTitle}</td>`;
        innerHtml += `<td class="modify-block"><button type="button" class="product-upgrade-btn" data-id="${productId}">UPDATE</button></td>`;
        innerHtml += `<td class="delete-block"><button type="button" class="bg-danger product-delete-btn" data-id="${productId}">DELETE</button></td>`;
        innerHtml += `</tr></tbody>`;
      $('.data-table').append(innerHtml);
    };

    $('.product-upgrade-btn').click(function() {
      $('#update-product-form input').val('');
      $('#update-product-form input').prop("readonly", true);
      var updateId = $(this).attr('data-id');
      modalToggle($('#update-modal'), true);
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
        modalToggle($('#update-modal'), false) ? modalToggle(($('#update-modal'), false)) : (modalToggle($('#success-msg'), true));
        
        getData('PUT', updateUrl, function putProductFn() {
          $('#success-msg .modal-body').html(`<p class="text-success">Product has been successfully updated</p>`)
        });
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
        modalToggle($('#delete-product'), false) ? modalToggle($('#delete-product'), false) : modalToggle($('#success-msg'), true);;
      });
    });
  };

  getData('GET', getUrl, mainFn);
  getData('GET', categoriesUrl, navFn);
  getData('GET', cartUrl, cartFn);
  getData('GET', getUrl, dataTable);

});