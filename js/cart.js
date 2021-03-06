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

    getTotalPrice: function (userId) {
        $.ajax({
            url: Cart.API_URL + "/carts?cartId=" + userId,
            method: "GET",
        }).done(function (response) {
            Cart.displayTotalPriceInCart(response);
        });
    },

    deleteProductFromCart: function (productId) {
        const userId = 1;

        $.ajax({
            url: Cart.API_URL + "/carts/" + userId + "/" + productId,
            method: "DELETE",
        }).done(function () {
            Cart.getCart();
        });
    },


    getProductRow: function (product) {
        return `
              <tr class="cart_item">
                 <td class="product-remove"">
                    <input type="button" class="remove" value="x" data-product_id="${product.id}" />
                 </td>

                 <td class="product-thumbnail">
                     <img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg">
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

    getTotalPriceRow: function (response) {
        return `
                   <tr class="order-total">
                        <th>Order Total</th>
                        <td><strong><span id="total-amount">$${response}</span></strong> </td>
                   </tr> 

        `
    },


    displayProductsInCart: function (products) {
        let productRow = '';

        products.forEach(product => productRow += Cart.getProductRow(product));

        $('table.shop_table.cart tbody').html(productRow);
    },

    displayTotalPriceInCart: function (response) {
        let productRow = '';

        productRow += Cart.getTotalPriceRow(response);

        $('.cart_totals .order-total').html(productRow);
    },

    bindEvents: function () {
        $(".shop_table")
            .delegate(".remove", 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data("product_id");

                Cart.deleteProductFromCart(productId);
            });

    }

};

userId = 1;

Cart.getCart();
Cart.getTotalPrice(userId);
Cart.bindEvents();

