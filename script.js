console.log("Task");

$.ajax({

  type: "GET",
  url : "https://dummyjson.com/products?limit=10&select=title,description,price,rating,images",
  dataType : 'JSON',
  products: {},
    
  /*
    fetch('https://dummyjson.com/products?limit=10', {
        method :"GET",
      })
      .then(res => res.json())
      .then(console.log)
    }
  */

  success: function(products) { 
    
    console.log("sucess data")
    
    var table = $("#table-content");
    for (var i = 0; i < 10 ; i++) {
      var tr = $('<tr/>');
      tr.append("<td>" + products.products[i].title + "</td>");
      tr.append("<td>" + products.products[i].description + "</td>");
      tr.append("<td>" + products.products[i].price + "</td>");
      tr.append("<td>" + products.products[i].rating + "</td>");
      
      for (j=0; j<1; j++) {
        tr.append("<td>" + "<img src='" + products.products[i].images[j] + "' alt='product-img' id='target'>" + "</td>");
      }
      table.append(tr);
    }
  }
  
});
    
