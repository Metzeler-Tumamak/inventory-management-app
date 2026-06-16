lucide.createIcons();

console.log(products, categories);

const addMenuBtn = document.querySelector(".add-menu");
const addDropdown = document.querySelector(".add-dropdown");

addMenuBtn.addEventListener("click", (event) => {
  addDropdown.classList.toggle("hidden");
});
