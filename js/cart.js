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

    getProductRow: function (product) {
        return `
              <tr class="cart_item">
                 <td class="product-remove">
                     <a title="Remove this item" class="remove" href="#">×</a> 
                 </td>

                 <td class="product-thumbnail">
                     <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                 </td>

                 <td class="product-name">
                     <h4 href="single-product.html">${product.name}</h4> 
                 </td>

                 <td class="product-price">
                     <span class="amount">$${product.price}</span> 
                 </td>

                 <td class="product-quantity">
                     <div class="quantity buttons_added">
                             <h5 id="qty" class="input-text qty text">1</h5>
<!--                         <input type="button" class="minus" value="-">-->
<!--                         <input id="" type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">-->
<!--                         <input type="button" class="plus" value="+">-->
                     </div>
                 </td>

                 <td class="product-subtotal">
                     <span class="amount">$${product.price}</span> 
                 </td>
             </tr>
        `
    },

    getTotalOrder: function (product) {

    },

    displayProductsInCart: function (products) {
        let productRow = '';

        products.forEach(product => productRow += Cart.getProductRow(product));

        $('table.shop_table.cart tbody').html(productRow);
    }


};

Cart.getCart();