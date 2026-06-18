lucide.createIcons();

const loader = document.querySelector(".loader-wrapper");

function showLoader() {
  loader.classList.toggle("hidden");
}

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

modalContent.addEventListener("submit", async (e) => {
  modalContent.classList.toggle("hidden");
  showLoader();
  e.preventDefault();
  e.stopPropagation();
  const formData = new FormData(e.target);
  const reqBody = {
    name: formData.get("name").trim(),
    category_id: formData.get("category_id"),
    available: Number(formData.get("available")),
    minimum: Number(formData.get("minimum")),
    maximum: Number(formData.get("maximum")),
    price: Number(formData.get("price")),
  };

  const url = e.target.action;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: new URLSearchParams(reqBody),
  });

  window.location.href = await response.url;
});

// const clickEvent = new Event("click");
// addProductBtn.dispatchEvent(clickEvent);
