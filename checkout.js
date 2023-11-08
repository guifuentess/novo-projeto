let listCart = [];
// get data cart from cookie

function checkCart() {
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

checkCart();
addCartToHTML();
function addCartToHTML(){
    //clear data from html
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    //if has product in cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML = `<img src="img/products/f1.jpg" alt="">
                <div class="info">
                    <div class="name">product 1</div>
                    <div class="price">$22/1 products</div>
                </div>
                <div class="quantity">1</div>
                <div class="returnPrice">$50</div>`;
                listCartHTML.appendChild(newP);
            }
        })
    }
}
