/**
 the exmample code show you how to get shopify product data 
 with javascript
 from article : https://www.mojoin.com/get-product-json-data/ 
**/
(function($){
    $(document).ready(function(e){
      var store_url = "https://neonbeach.com/"; // replaced with your shopify store url
      var product_id = "babe-you-look-so-cool-neon-sign"; // replaced with your product id
      var full_url = store_url + '/products/' + product_id + '.json';
      
      $.ajax({
        url: full_url,
        success: function(data) {
          //console.log("product id:" + data.product.id);
          //console.log("product title:" + data.product.title);
          // ... to do 
          // all your process with product data logic
          console.log(data);
        }
      });
      
      });
    })(jQuery);
