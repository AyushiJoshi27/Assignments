$(document).ready(function() {
  const link = "https://fakestoreapi.com/";
  const getUrl = link + 'products';
  const usersUrl = link + 'users';
  const categoriesUrl = link + "products/categories";
  function storageCall(data) {
    return localStorage.getItem(data);
  };
  var cartUrl = link + "carts/user/" + storageCall('userId');
  modalToggle($('.content-wrap'), false);
  $('.get-in').html(storageCall('userName') ? 'LOGOUT' : 'LOGIN');

  function modalToggle(modalId, show) {
    show == true ? modalId.show() : modalId.hide();
  }

  $('.navbar-brand, .add-product-btn').click(function() {
    'navbar-brand' == $(this).attr('class') ? window.open('index.html', '_self') : modalToggle($('#add-modal'), true);
  });

  $('#close').click(function() {
    modalToggle($('.modal'), false);
  });

  $('.close').click(function() {
    window.location.reload();
  });

  $('.navbar-toggler').click(function() {
    $('#navbar-content').toggle();
    modalToggle($('#name'), true);
  });

  function ajaxCall(getType, getUrl, mainFn, data) {
    $.ajax({
      type: getType,
      url: getUrl,
      data: data,
      success: mainFn,
    });
  };

  function htmlContent(pack, prepHtml) {
    prepHtml += `<div class="img-wrap"><img src="${pack.image}" class="item-img"></div>`;
    prepHtml += `<div class="details">`;
    prepHtml += `<p><b>Title: </b>${pack.title}</p><p><b>Price: </b>$${pack.price}</p>`;
    return prepHtml;
  };

  function wrapperCall(products) {
    for (let index = 0; index < products.length; index++) {
      var prepHtml = `<div class="main-content" data-id="${index}">`;
      prepHtml = htmlContent(products[index], prepHtml);
      prepHtml += `</div>`;
      $('.outer-wrapper').append(prepHtml);
    };

    $('.main-content').click(function() {
      modalToggle($('#small-modal'), true);
      var type = products[$(this).attr('data-id')];
      var prepHtml = `<div class="main-content">`;
        prepHtml = htmlContent(type, prepHtml);
        prepHtml += `<p class="rating"><b> Rating: </b>${type.rating.rate} <b>Available: </b>Only ${type.rating.count} items are left</p>`;
        prepHtml += `<details><summary><b>Description: </b></summary>${type.description}</details>`;
        prepHtml += `</div>`;
      $('.modal-body').html(prepHtml);
    });
  };

  const navFn = function(products) {
    for (let i = 0; i < products.length; i++) {
      var categories = products[i];
      $('#nav-content').append(`<li class="nav-item"><a class="nav-link" href="#${categories}" data-id="${categories}">${categories}</a></li>`);
      $('#category').append(`<option class="category-opt">${categories}</option>`);
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

      ajaxCall('GET', categoriesPath, categoryFn, null);
    });
  };

  const userFn = function(products) {
    let valid = $('.login-form').valid(); 
    if (valid) {
      for (let i = 0; i < products.length; i++) {
        var dataArr = { name : $('#username').val(), pwrd : $('#password').val(), usersId : products[i].id}
        if (dataArr.name == products[i].username && dataArr.pwrd == products[i].password) {
          localStorage.setItem('userName', dataArr.name);
          localStorage.setItem('userId', dataArr.usersId);
          window.open('wishlist.html', '_self');
        }
        else if (i == products.length) {
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

  $('.submit-btn').click(function() {
    ajaxCall('GET', usersUrl, userFn, null);
  });
  
  if (storageCall('userName')) {
    $('#name').html(storageCall('userName'))
    
    $('.exit').click(function() {
      localStorage.removeItem('userName');
      window.open('login.html', '_self');
    });
  };

  $('#cart, #wishlist, #admin, .get-in').click(function() {
    window.open(!storageCall('userName') ? 'login.html' : ($(this).attr('id') + '.html'), '_self');
  });

  $('.submit-form').click(function(event) {
    event.preventDefault();
    var data = $('#add-product-form').serialize();
    var valid = $('#add-product-form').valid()

    const postFn = function() {
      modalToggle($('#add-modal'), false);
      $('#success-msg .modal-body').html(`<p class="text-success">Product added successfully.</p>`);
      valid ? modalToggle($('#success-msg'), true) : modalToggle($('#add-modal'), false);
    };

    if (!valid) {
      return;
    }
    ajaxCall('POST', getUrl, postFn, data);
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
      price: 'Price must be required with minimum value 0',
      image: 'Image must be required',
      category: 'Category must be required',
      username: "Title is required",
      password: "Please enter a password containing more than 5 characters."
    }
  });

  const dataTable = function(products) {
      for (let i = 0; i < products.length; i++) {
        var productId = products[i].id;
        var innerHtml = `<tr>`;
          innerHtml += `<td>${productId}.</td><td>${products[i].title}</td>`;
          innerHtml += `<td class="modify-block"><button class="btn product-upgrade-btn" data-id="${productId}">UPDATE</button></td>`;
          innerHtml += `<td class="delete-block"><button class="btn product-delete-btn" data-id="${productId}">DELETE</button></td>`;
          innerHtml += `</tr>`;
        $('.data-table tbody').append(innerHtml);
    };

    $('.product-upgrade-btn').click(function() {
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

      ajaxCall('GET', updateUrl, updateFn, null);

      $('#update-submit-btn').click(function(e) {
        e.preventDefault();
        modalToggle($('#update-modal'), false) ? modalToggle(($('#update-modal'), false)) : (modalToggle($('#success-msg'), true));
        
        ajaxCall('PUT', updateUrl, function putProductFn() {
          $('#success-msg .modal-body').html(`<p class="text-success">Product has been successfully updated</p>`)
        }, null);
      });
    });

    $('.product-delete-btn').click(function(e) {
      e.preventDefault();
      modalToggle($('#delete-product'), true);
      let deleteId = $(this).attr('data-id');

      $('.accept').click(function() {
        var deleteUrl = getUrl + '/' + deleteId;
        ajaxCall('DELETE', deleteUrl, function deleteFn() {
          modalToggle($('#delete-product'), false) ? modalToggle($('#delete-product'), false) : modalToggle($('#success-msg'), true);
          $('#success-msg .modal-body').html(`<p class="text-success">Product has been deleted successfully.</p>`);
        }, null);
      });
    });
  };

  ajaxCall('GET', getUrl, wrapperCall, null);
  ajaxCall('GET', categoriesUrl, navFn, null);
  ajaxCall('GET', cartUrl, cartFn, null);
  ajaxCall('GET', getUrl, dataTable, null);

});