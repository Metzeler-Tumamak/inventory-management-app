lucide.createIcons();

console.log(products, categories);

const loader = document.querySelector(".loader-wrapper");

const addMenuBtn = document.querySelector(".add-menu");
const addDropdown = document.querySelector(".add-dropdown");

addMenuBtn.addEventListener("click", (event) => {
  addDropdown.classList.toggle("hidden");
});

const addProductBtn = document.querySelector(".add-product-btn");
const addProductModal = document.querySelector(".add-product-modal");
const addProductForm = document.querySelector(".add-product-form");
const modalContent = document.querySelector(".modal-content");

addProductBtn.addEventListener("click", (e) => {
  addProductModal.showModal();
  e.stopPropagation();
  addProductForm.classList.toggle("hidden");
  addDropdown.classList.toggle("hidden");
});

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  for (const [key, value] of new FormData(e.target)) {
    console.log(key, value);
  }
  modalContent.classList.toggle("hidden");
  loader.classList.toggle("hidden");
});

const clickEvent = new Event("click");
addProductBtn.dispatchEvent(clickEvent);
