const addToShoppingCartButtons = document.querySelectorAll('.addToCart');

addToShoppingCartButtons.forEach(addToCartButton =>{ //indicamos que por cada uno de los elementos del array ser realice una evento de tipo click en su respectivo button
    addToCartButton.addEventListener('click', addToCartClicked)
})

const buyButton = document.querySelector('.comprarButton');
buyButton.addEventListener('click', buyButtonClicked)

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');


function addToCartClicked (event){ //indicamos que al hacer click en el button recoga la informacion de cada item
    const button = event.target;
    const item = button.closest('.item')

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src

    addItemToShoppingCart(itemTitle, itemPrice, itemImage)
}

//funcion agregar al carrito
function addItemToShoppingCart(itemTitle, itemPrice, itemImage){
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    for(let i = 0; i < elementsTitle.length; i++){
        if(elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();// se coloca para que modifique las cantidades al hacer click agregar al carrito
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`

    shoppingCartRow.innerHTML = shoppingCartContent; //indicamos que en el elemento creado le agreguemos la informacion que ingresamos en shoppingCartContent
    shoppingCartItemsContainer.append(shoppingCartRow) //indicamos que se agregue shoppingCartRow como un hijo

    shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged)

    updateShoppingCartTotal()
}

//function acutalizar precio
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem =>{
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice');
        //                            Number te convierte todo el valor en número
        const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('€', '')
        ); //replece cambia el elemento mencionado

        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity')

        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    })
    //                                 Con toFixed elegimos la cantidad de digitos que queremos
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`
}


//function eliminar producto
function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    //        con closest hacemos referencia al elemento mas cercano con dicha clase o indicador
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

//funcion cambiar cantidad de producto
function quantityChanged (event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

//funcion finalizar compra
function buyButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal(); //volvemos a llamar la funcion para actualice el precio al finalizar la compra
}
