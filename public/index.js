lucide.createIcons();

console.log(products, categories);

const addMenuBtn = document.querySelector(".add-menu");
const addDropdown = document.querySelector(".add-dropdown");

addMenuBtn.addEventListener("click", (event) => {
  addDropdown.classList.toggle("hidden");
});

const addProductBtn = document.querySelector(".add-product-btn");
const addProductModal = document.querySelector(".add-product-modal");

addProductBtn.addEventListener("click", (e) => {
  addProductModal.showModal();
  e.stopPropagation();
  addDropdown.classList.toggle("hidden");
});
