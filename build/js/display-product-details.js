var productsApi = "../sanpham.json";

fetch(productsApi)
	.then((response) => response.json())
	.then((productList) => {
		var product = findProductById(productList);
		renderProductDetails(product);
	});

/* Find in product list and return product object by using id passed in the url search bar */
var findProductById = (productList) => {
	var productId = new URLSearchParams(window.location.search).get("id");
	return productList.find((product) => {
		return product.id == productId;
	});
};

/* Render product detail onto the screen */
var renderProductDetails = (product) => {
	var productThumbnail = document.querySelector("#product-thumbnail");
	var productName = document.querySelector("#product-name");
	var productAuthor = document.querySelector("#product-author");
	var productSize = document.querySelector("#product-size");
	var productMaterial = document.querySelector("#product-material");
	var productPrice = document.querySelector("#product-price");
    var formattedPrice = String(product.price/1000) + ".000 đồng";

    productThumbnail.src = `../img/sanpham/${product.thumbnail}`;
    productName.innerText = `${product.name}`;
    productAuthor.innerText = `Tác giả: ${product.author}`;
    productSize.innerText = `Kích thước: ${product.width} x ${product.height}`;
    productMaterial.innerText = `Chất liệu: ${product.material}`;
    productPrice.innerText = `Giá: ${formattedPrice}`;                    
};
