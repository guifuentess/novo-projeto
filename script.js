const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


//carrinho
let cartIcon = document.querySelector("#lg-bag");
let cart = document.querySelector(".cart-popap");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active")
}
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active")
}

//cart working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//making function
function ready(){
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName("cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

//checkout page
const buy = document.getElementById('buy');
const checkout = document.getElementById('checkout');
const closeCheckout = document.getElementById('close');

if (buy) {
    buy.addEventListener('click', () => {
        checkout.classList.add('active');
    })
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        checkout.classList.remove('active');
    })
}

const back = document.querySelector('.back');

if (back) {
    back.addEventListener('click', () => {
        checkout.classList.remove('active');
    })
}


//remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//add to cart 
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var produtImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductsToCart(title, price, produtImg);
    updatetotal();
}
function addProductsToCart(title, price, produtImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Você já adicionou este item ao seu carrinho");
            return;
        }
    }


    var cartBoxContent = `
                            <img src="${produtImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!--remove cart-->
                            <i class="fa-regular fa-trash-can cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
}

//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
}

//Barra de pesquisa
fetch('https://fakestoreapi.com/products?limit=50')
            .then(res=>res.json())
            .then((json) => {
                console.log(json);
                const ul = document.getElementById('listaProdutos');
                json.forEach((item)=>{
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <a href="#">
                            <img width="50" src="${item.image}" alt="">
                            <span class="item-name">${item.title}</span>
                        </a>
                    `;
                    ul.appendChild(li);
                })
            })

            function filtrar() {
                var input,
                filter,
                ul,
                li,
                a,
                i,
                span,
                txtValue,
                count = 0

                //ELEMENTOS HTML
                input = document.getElementById('inputBusca');
                ul = document.getElementById('listaProdutos');

                //FILTRO
                filter = input.value.toUpperCase();

                //PEGAR AS LI'S DA LISTA
                li = ul.getElementsByTagName("li");

                //PERCORRER OS LI'S
                for(i = 0; i < li.length; i++) {
                    //PEGAR A TAG A DO ELEMENTO PERCORRIDO
                    a = li[i].getElementsByTagName("a")[0];
                    //PEGAR O TEXTO DENTRO DO LINK
                    txtValue = a.textContent || a.innerText;
                    //VERIFICAR
                    if(txtValue.toUpperCase().indexOf(filter) > -1) {
                        //VALOR BATEU
                        li[i].style.display = "";
                        //INCREMENTAR O CONTADOR
                        count++
                        //PEGAR A TAG SPAN DO ITEM
                        span = li[i].getElementsByClassName("item-name");
                        //SE EXISTIR
                        if(span) {
                            span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
                                return "<strong"> + match + "</strong>";
                            })
                        }
                    } else {
                        //NAO MOSTRA O ITEM DA LISTA
                        li[i].style.display = "none";
                    }
                }

                if (count === 0) {
                    ul.style.display = "none";
                } else {
                    ul.style.display = "block";
                }
                
            }