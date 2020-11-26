window.SingleProduct = {

    API_URL: "http://localhost:8085",


    getProduct: function (productId) {
        $.ajax({
            url: SingleProduct.API_URL + "/products/" + productId,
            method: "GET"
        }).done(function (product) {
            SingleProduct.displayProductDetail(product);
        });
    },

    addProductToCart: function (productId) {
        //TODO: read userID dynamically
        const userId = 1;

        const requestBody = {
            userId: userId,
            productId: productId
        }

        $.ajax({
            url: SingleProduct.API_URL + "/carts",
            contentType: "application/json",
            method: "PUT",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("cart.html");
        });

    },


    getSingleProductRow: function (product) {
        return `
              <div class="row">
                  <div class="col-sm-6">
                      <div class="product-images">
                          <div class="product-main-img">
                              <img src="${product.imageUrl}" alt="">
                          </div>
                      </div>
                  </div>
                  
                  <div class="col-sm-6">
                      <div class="product-inner">
                          <h2 class="product-name">${product.name}</h2>
                          <div class="product-inner-price">
                              <ins>$${product.price}</ins>
                          </div>   
                           
                          <form action="" class="cart">
                              <div class="quantity">
                                  <input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1">
                              </div>
                              <button class="add_to_cart_button" type="submit" data-product_id="${product.id}">Add to cart</button>
                          </form>   
                          
                          <div class="product-inner-category">
                              <p>Category: <a href="">Summer</a>. Tags: <a href="">awesome</a>, <a href="">best</a>, <a href="">sale</a>, <a href="">shoes</a>. </p>
                          </div> 
                          
                          <div role="tabpanel">
                              <ul class="product-tab" role="tablist">
                                  <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Description</a></li>
                                  <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Reviews</a></li>
                              </ul>
                              <div class="tab-content">
                                  <div role="tabpanel" class="tab-pane fade in active" id="home">
                                      <h2>Product Description</h2>  
                                      <p>${product.description}</p>
                                  </div>
                                  <div role="tabpanel" class="tab-pane fade" id="profile">
                                      <h2>Reviews</h2>
                                      <div class="submit-review">
                                          <p><label for="name">Name</label> <input name="name" type="text"></p>
                                          <p><label for="email">Email</label> <input name="email" type="email"></p>
                                          <div class="rating-chooser">
                                              <p>Your r
                                              <div class="rating-wrap-post">
                                                  <i class="fa fa-star"></i>
                                                  <i class="fa fa-star"></i>
                                                  <i class="fa fa-star"></i>
                                                  <i class="fa fa-star"></i>
                                                  <i class="fa fa-star"></i>
                                              </div>
                                          </div>
                                          <p><label for="review">Your review</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
                                          <p><input type="submit" value="Submit"></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                      </div>
                  </div>
              </div>
        `
    },

    displayProductDetail: function (product) {
        let productsHtml = '';

        productsHtml += SingleProduct.getSingleProductRow(product);

        $('.single-product-area .row:first-child').html(productsHtml);
    },


    bindEvents: function () {
        $(".single-product-area .row:first-child")
            .delegate(".add_to_cart_button", 'click', function (event) {
                event.preventDefault();

                let productId = $(this).data('product_id');

                SingleProduct.addProductToCart(productId);
            });
    }
};

let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('productId');

SingleProduct.getProduct(productId);
SingleProduct.bindEvents();



