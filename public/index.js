import { capitalize } from "./utils.js";

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

const modal = document.querySelector(".modal");
const modalFormHeader = document.querySelector(".modal-content .form-header");
const modalContent = document.querySelector(".modal-content");

addDropdown.addEventListener("click", (e) => {
  const btnAction = e.target.dataset.action;
  const formHeaderText = capitalize(btnAction.replaceAll("-", " "));
  modalFormHeader.textContent = formHeaderText;
  modal.showModal();
  e.stopPropagation();
  const activeForm = document.querySelector(
    `form[data-form-label="${btnAction}"]`,
  );
  activeForm.classList.toggle("hidden");
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
