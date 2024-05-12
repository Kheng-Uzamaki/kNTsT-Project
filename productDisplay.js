import Products from "./shopProduct.js";

const category = document.getElementById("category");
const input = document.getElementById("seachinput");
const proContainer = document.querySelector(".pro-container");
const paginationContainer = document.getElementById("pagination");
const productsPerPage = 8;
let allProducts = [];
let currentPage = 1;

// Function to show products for a specific page
const showProduct = (page) => {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  proContainer.innerHTML = "";

  currentProducts.forEach((productData) => {
    const productElement = document.createElement("div");
    productElement.classList.add("pro");
    productElement.innerHTML = `
            <img src="${productData.img}" />
            <div class="des">
                <span>Best Quality</span>
                <h5>${productData.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${productData.price}</h4>
            </div>
            <button class="cart" data-id="${productData.id}"><i class="fal fa-shopping-cart "></i></button>
        `;

    proContainer.appendChild(productElement);
  });

  updatePagination(page);

// Add event listeners to cart buttons
const cartBtn = document.querySelectorAll(".cart");
cartBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.currentTarget.dataset.id; // Retrieve the product ID
    const productImg =
      event.currentTarget.parentNode.querySelector("img").src; // Retrieve the product image
    const productName =
      event.currentTarget.parentNode.querySelector(".des h5").textContent; // Retrieve the product name
    const productPrice =
      parseFloat(
        event.currentTarget.parentNode.querySelector(".des h4").textContent.slice(1)
      ); // Retrieve the product price and convert to number

    // Retrieve existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("selectedProducts")) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
      // If the product exists, update quantity and price
      cart[existingProductIndex].quantity++;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1,
      });
    }
    alert("add to cart!");

    // Save updated cart data to localStorage
    localStorage.setItem("selectedProducts", JSON.stringify(cart));
  });
});





};

// Function to update pagination buttons
const updatePagination = (currentPage) => {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("a");
    pageButton.href = "#";
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    paginationContainer.appendChild(pageButton);
  }
};

// Event listener for category selection
category.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  filterProductsByCategory(selectedCategory);
  currentPage = 1; // Reset to first page
  showProduct(currentPage);
});

// Event listener for input search
input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  filterProductsByName(value);
  currentPage = 1; // Reset to first page
  showProduct(currentPage);
});

// Event listener for clicking on pagination buttons
paginationContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    currentPage = parseInt(event.target.textContent);
    showProduct(currentPage);
  }
});

// Function to filter products based on category
const filterProductsByCategory = (categoryValue) => {
  const value = categoryValue.toLowerCase();
  allProducts = Products.filter((product) => {
    return product.category.toLowerCase().includes(value) || value === "all";
  });
};

// Function to filter products based on name
const filterProductsByName = (nameValue) => {
  const value = nameValue.toLowerCase();
  allProducts = Products.filter((product) => {
    return product.name.toLowerCase().includes(value);
  });
};

// Initialize
filterProductsByCategory("all");
showProduct(currentPage);
