import { capitalize } from "./utils.js";

lucide.createIcons();

const loader = document.querySelector(".loader-wrapper");

const addMenuBtn = document.querySelector(".add-menu");
const addDropdown = document.querySelector(".add-dropdown");
const modal = document.querySelector(".modal");
const modalFormHeader = document.querySelector(".modal-content .form-header");
const modalContent = document.querySelector(".modal-content");
const submitModalFormBtn = document.querySelector(".modal-btns .submit-btn");
const closeModalBtn = document.querySelector(".modal-btns .cancel-btn");
const toggleFiltersBtn = document.querySelector(".filter-btn");
const filters = document.querySelector(".filters");
const applyFiltersBtn = document.querySelector(
  `.filter-form-controls button[type="submit"]`,
);
const resetFiltersBtn = document.querySelector(".reset-filter-btn");
const searchInput = document.querySelector("#search-input");

function showLoader() {
  loader.classList.toggle("hidden");
}

addMenuBtn.addEventListener("click", (event) => {
  addDropdown.classList.toggle("hidden");
});

addDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  const btnAction = e.target.dataset.action;
  const formHeaderText = capitalize(btnAction.replaceAll("-", " "));
  modalFormHeader.textContent = formHeaderText;
  const formId = `form-${btnAction}`;
  submitModalFormBtn.setAttribute("form", formId);
  modal.showModal();
  const activeForm = document.querySelector(`#${formId}`);
  activeForm.classList.toggle("hidden");
  addDropdown.classList.toggle("hidden");
});

modal.addEventListener("close", (e) => {
  const activeForm = document.querySelector(".modal-form:not(.hidden)");
  activeForm.reset();
  activeForm.classList.toggle("hidden");
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

closeModalBtn.addEventListener("click", (e) => {
  modal.close();
});

searchInput.addEventListener("click", (e) => {
  if (filters.classList.contains("hidden")) {
    filters.classList.toggle("hidden");
  }
});

toggleFiltersBtn.addEventListener("click", (e) => {
  filters.classList.toggle("hidden");
});

filters.addEventListener("change", (e) => {
  applyFiltersBtn.removeAttribute("disabled");
});

resetFiltersBtn.addEventListener("click", (e) => {
  const defaultCategory = document.querySelector(
    `input[name="category_id"][value=""]`,
  );
  defaultCategory.click();

  const defaultSort = document.querySelector(
    `#sort-select option[value="name"]`,
  );
  defaultSort.selected = true;

  const defaultOrder = document.querySelector(
    `input[name="order"][value="ASC"]`,
  );
  defaultOrder.click();

  searchInput.value = "";
});
