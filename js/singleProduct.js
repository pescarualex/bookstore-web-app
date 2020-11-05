window.SingleProduct = {

    API_URL: "http://localhost:8085",


    getProduct: function (productId) {
        $.ajax({
            url: SingleProduct.API_URL + "/products/" + productId,
            method: "GET"
        }).done(function (response) {
            // SingleProduct.displayProductDetail(response)
            console.log(response);
        });
    },


    getSingleProductRow: function (product) {
        return`
              <div class="row">
                  <div class="col-sm-6">
                      <div class="product-images">
                          <div class="product-main-img">
                              <img src="img/product-2.jpg" alt="">
                          </div>
                          
                          <div class="product-gallery">
                              <img src="img/product-thumb-1.jpg" alt="">
                              <img src="img/product-thumb-2.jpg" alt="">
                              <img src="img/product-thumb-3.jpg" alt="">
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
                              <button class="add_to_cart_button" type="submit">Add to cart</button>
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

        product.forEach(product => productsHtml += SingleProduct.getSingleProductRow(product));

        $('.single-product-area .row:first-child').html(productsHtml);
    }
};



SingleProduct.getProduct();