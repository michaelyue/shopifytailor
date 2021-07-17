(function($) {
  
  
  // stx reorder 
  this.reorder = new function(){
    var self = this;

    this.pushQueue = function(i, data, el){

      //LOW STOCK -- add as many as possible if stock is below requested ammount
      if(data[i].check_inventory){
        data[i].quantity = Math.min(parseInt(data[i].inventory), parseInt(data[i].quantity));
      }

      $.ajax({
        url: '/cart/add.js',
        method: 'POST',
        data: {
          quantity: data[i].quantity,
          id: data[i].id
        },
        complete: function(res){
          if(i >= data.length - 1){
            //products from queue are now added to the cart -> stop loading signal and go to cart
            el.removeClass('loading');
            window.location.href = '/cart';
            return;
          }else{
            // Calls are async as required by Shopify Docs
               self.pushQueue(i+1, data, el);
          }
        }
      });
    }

    this.listen = function(){
      var el = $(this);
      var ids = el.attr('data-variant-ids').split(',');
      var quantities = el.attr('data-variant-quantities').split(',');
      var inventories = el.attr('data-variant-inventories').split(',');
      var inventory_policies = el.attr('data-variant-inventory-policies').split(',');
      var inventory_trackers = el.attr('data-variant-inventory-trackers').split(',');
      ids.splice(-1, 1);
      quantities.splice(-1, 1);
      inventories.splice(-1, 1);
      inventory_policies.splice(-1, 1);
      inventory_trackers.splice(-1, 1);

      var data = [];
      for(var i=0; i<ids.length; i++){
        data.push({
          id: ids[i],
          quantity: quantities[i],
          inventory: inventories[i],
          check_inventory: (inventory_policies[i] == "deny" && inventory_trackers[i] != "")
        });
      }
      el.addClass('loading');
      self.pushQueue(0, data, el);
    }

    this.init = function(){
      $('.reorder-btn').on('click', self.listen);
    }
  }

  $(reorder.init);
 
  
})(jQuery)
