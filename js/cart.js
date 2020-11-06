window.Cart = {

    API_URL: "http://localhost:8085",

    getCart: function () {
        //TODO: read userID dynamically
        const userId = 1;

        $.ajax({
            url: Cart.API_URL + "/carts/" + userId
        }).done(function (response) {
            Cart.displayProductsInCart(response.products);
        });
    },

    deleteProductFromCart: function (productId) {
        $.ajax({
            url: Cart.API_URL + "/carts",
            method: "DELETE"
        }).done(function () {
            Cart.getCart();
        });
    },



    getProductRow: function (product) {
        return `
              <tr class="cart_item">
                 <td class="product-remove"">
                     <a title="Remove this item" class="remove" href="#" data-product_id="${product.id}">×</a> 
                 </td>

                 <td class="product-thumbnail">
                     <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                 </td>

                 <td class="product-name">
                     <h4 href="single-product.html">${product.name}</h4> 
                 </td>

                 <td class="product-price">
                     <span id="price" class="amount">$${product.price}</span> 
                 </td>

                 <td class="product-quantity">
                     <div class="quantity buttons_added">
                             <h5 id="qty" class="input-text qty text">1</h5>
                     </div>
                 </td>

                 <td class="product-subtotal">
                     <span class="amount">$${product.price}</span> 
                 </td>
             </tr>
        `
    },


    displayProductsInCart: function (products) {
        let productRow = '';

        products.forEach(product => productRow += Cart.getProductRow(product));

        $('table.shop_table.cart tbody').html(productRow);
    },

    bindEvents: function () {
        $(".cart_item").delegate("remove", 'click', function (event) {
            event.preventDefault();

            let productId = $(this).data("product_id");

            Cart.deleteProductFromCart(productId);

        });
    }

};


Cart.getCart();
Cart.bindEvents();

