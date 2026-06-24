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
const addProductForm = document.querySelector("#form-add-product");
const addCategoryForm = document.querySelector("#form-add-category");
const productsTable = document.querySelector(".products tbody");
const deleteProductForm = document.querySelector("#form-delete-product");
const deleteCategoryForm = document.querySelector("#form-delete-category");
const updateProductForm = document.querySelector("#form-update-product");

function toggleLoader() {
  loader.classList.toggle("hidden");
}

function getFilterSearchParams() {
  return new URLSearchParams(new FormData(filters)).toString();
}

function showForm(targetElem) {
  const btnAction = targetElem.dataset.action;
  const formHeaderText = capitalize(btnAction.replaceAll("-", " "));
  modalFormHeader.textContent = formHeaderText;
  const formId = `form-${btnAction}`;
  submitModalFormBtn.setAttribute("form", formId);
  modal.showModal();
  const activeForm = document.querySelector(`#${formId}`);
  activeForm.classList.toggle("hidden");
  return activeForm;
}

addMenuBtn.addEventListener("click", (event) => {
  addDropdown.classList.toggle("hidden");
});

addDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  showForm(e.target);
  addDropdown.classList.toggle("hidden");
});

modal.addEventListener("close", (e) => {
  const activeForm = document.querySelector(".modal-form:not(.hidden)");
  activeForm.reset();
  activeForm.classList.toggle("hidden");
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

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalContent.classList.toggle("hidden");
  toggleLoader();
  const formData = new FormData(e.target);
  const reqBody = {
    name: formData.get("name").trim(),
    category_id: formData.get("category_id"),
    available: Number(formData.get("available")),
    minimum: Number(formData.get("minimum")),
    maximum: Number(formData.get("maximum")),
    price: Number(formData.get("price")),
  };

  const response = await fetch(e.target.action, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: e.target.method,
    body: new URLSearchParams(reqBody),
  });

  if (response.ok) window.location.href = `/?${getFilterSearchParams()}`;
});

addCategoryForm.addEventListener("submit", async (e) => {
  modalContent.classList.toggle("hidden");
  toggleLoader();
  const formData = new FormData(e.target);
  const reqBody = {
    name: formData.get("name").trim(),
  };

  const response = await fetch(e.target.action, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: e.target.method,
    body: new URLSearchParams(reqBody),
  });

  if (response.ok) window.location.href = `/?${getFilterSearchParams()}`;
});

deleteProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalContent.classList.toggle("hidden");
  toggleLoader();
  const queryParams = new URLSearchParams(new FormData(e.target));
  const targetUrl = `${e.target.action}?${queryParams}`;
  const response = await fetch(targetUrl, {
    method: "DELETE",
  });

  if (response.ok) window.location.href = `/?${getFilterSearchParams()};`;
});

deleteCategoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalContent.classList.toggle("hidden");
  toggleLoader();
  const queryParams = new URLSearchParams(new FormData(e.target));
  const targetUrl = `${e.target.action}?${queryParams}`;

  const response = await fetch(targetUrl, {
    method: "DELETE",
  });

  if (response.ok) window.location.href = `/?${getFilterSearchParams()}`;
});

updateProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  modalContent.classList.toggle("hidden");
  toggleLoader();
  const formData = new FormData(e.target);
  const reqBody = {
    id: formData.get("id").trim(),
    name: formData.get("name").trim(),
    category_id: formData.get("category_id"),
    available: Number(formData.get("available")),
    minimum: Number(formData.get("minimum")),
    maximum: Number(formData.get("maximum")),
    price: Number(formData.get("price")),
  };

  const response = await fetch(e.target.action, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "PUT",
    body: new URLSearchParams(reqBody),
  });

  if (response.ok) window.location.href = `/?${getFilterSearchParams()}`;
});

productsTable.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  const row = e.target.closest("tr");
  const activeForm = showForm(e.target);
  console.log(activeForm);
  activeForm.elements["id"].value = row.dataset.id;

  if (activeForm.getAttribute("id").includes("update")) {
    const fields = row.querySelectorAll("[data-field]");
    fields.forEach((field) => {
      activeForm.elements[field.dataset.field].value = field.dataset.value;
    });
  }
});
