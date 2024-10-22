var productsApi = "../sanpham.json";
let productList = [];
let cartList = [];
const shoppingCart = document.getElementById("shopping-cart");
const addToCartBtn = document.getElementById("add-to-cart-button");
const currentProductId = new URLSearchParams(window.location.search).get("id");
const quantityInput = document.getElementById("quantity-input");
const totalCostHTML = document.getElementById("total-cost");
const cartQuantity = document.querySelector("#cart-quantity");

const renderCart = (productList) => {
	shoppingCart.innerHTML = "";
	var totalCost = 0;
	var totalQuantity = 0;
	cartList.forEach((cartItem) => {
		var cartItemInfo = productList.find((product) => {
			return product.id == cartItem.id;
		});
		totalCost += cartItem.quantity * cartItemInfo.price;
		totalQuantity += cartItem.quantity;
		var newItem = document.createElement("div");
		newItem.classList.add(
			"cart-item",
			"d-flex",
			"mb-3",
			"py-3",
			"border-bottom"
		);
		newItem.innerHTML = `<div
                class="thumbnail-container d-flex align-items-center justify-content-center w-25 ratio ratio-1x1">
                <img
                    src="../img/sanpham/${cartItemInfo.thumbnail}"
                    alt=""
                    class="object-fit-contain" />
            </div>
            <div class="w-75 p-3">
                <h4 id="cart-item-name">${cartItemInfo.name}</h4>
                <p>Tác giả: ${cartItemInfo.author}</p>
                <div class="d-flex justify-content-between mt-4">
                    <div class="d-flex align-items-center">
                        <span class="decrease-button btn btn-outline-dark">-</span>
                        <span class="item-quantity px-3">${
							cartItem.quantity
						}</span>
                        <span class="increase-button btn btn-outline-dark">+</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span>${cartItem.quantity * cartItemInfo.price}</span>
                        <span class="delete-button">X</i></span>
                    </div>
                </div>
                            </div>`;
		newItem.dataset.id = cartItemInfo.id;
		shoppingCart.appendChild(newItem);
	});

	totalCostHTML.innerText = `Tổng tiền: ${totalCost}`;
	cartQuantity.innerText = totalQuantity;
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const addItemToCart = () => {
	var positionInCart = cartList.findIndex((cartItem) => {
		return currentProductId == cartItem.id;
	});
	if (positionInCart == -1) {
		cartList.push({
			id: currentProductId,
			quantity: Number(quantityInput.value),
		});
	} else {
		cartList[positionInCart].quantity =
			cartList[positionInCart].quantity + Number(quantityInput.value);
	}

	renderCart(productList);
};

const deleteItem = (targetItem) => {
	targetItem.remove();
	cartList.forEach((item, currentPosition) => {
		if (item.id == targetItem.dataset.id) {
			cartList.splice(currentPosition, 1);
		}
	});
	renderCart(productList);

	localStorage.setItem("cart", JSON.stringify(cartList));
};

const increaseItemQuantity = (targetItem) => {
	cartList.forEach((item) => {
		if (item.id == targetItem.dataset.id) {
			item.quantity++;
		}
		renderCart(productList);
	});
};

const decreaseItemQuantity = (targetItem) => {
	cartList.forEach((item) => {
		if (item.id == targetItem.dataset.id && item.quantity > 1) {
			item.quantity--;
		}
		renderCart(productList);
	});
};

const initApp = () => {
	fetch(productsApi)
		.then((response) => response.json())
		.then((data) => {
			productList = data;

			if (localStorage.getItem("cart")) {
				cartList = JSON.parse(localStorage.getItem("cart"));
			}

			renderCart(productList);
		});

	if (addToCartBtn) {
		addToCartBtn.addEventListener("click", () => {
			addItemToCart();
		});
	}

	shoppingCart.addEventListener("click", (e) => {
		let positionClick = e.target;
		let targetItem =
			positionClick.parentElement.parentElement.parentElement
				.parentElement;
		if (positionClick.classList.contains("delete-button")) {
			deleteItem(targetItem);
		}

		if (positionClick.classList.contains("increase-button")) {
			increaseItemQuantity(targetItem);
		}

		if (positionClick.classList.contains("decrease-button")) {
			decreaseItemQuantity(targetItem);
		}
	});
};

initApp();
