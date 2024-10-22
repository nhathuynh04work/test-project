var productsApi = "../sanpham.json";
var productsGrid = document.querySelector(".products-grid");
var productsRow = productsGrid.appendChild(document.createElement("div"));
productsRow.classList.add("row", "align-items-center");


fetch(productsApi)
	.then((response) => response.json())
	.then((productList) => {
		renderProducts(productList);
	});



var renderProducts = (productList) => {
	var html = productList.map((product) => {
		var formattedPrice = String(product.price / 1000) + ".000 đồng";

		return `<a href="chitietsanpham.html?id=${product.id}" class="product-item ratio ratio-1x1">
						<img
							src="../img/sanpham/${product.thumbnail}"
							alt=""
							class="object-fit-contain" />
						<div
							class="product-overlay bg-white align-items-center justify-content-center bg-opacity-75">
							<p class="text-black font-weight-bold text-center">
								Xem chi tiết
                                </br>
                                ${formattedPrice}
							</p>
						</div>
				</a>`;
	});

	productsRow.innerHTML = html.join("");
};
