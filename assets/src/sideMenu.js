
const toggleSideMenu = function () {
  const menu1 = document.querySelector(".menu1");
  const sideBar = document.querySelector(".side-bar");
  menu1.addEventListener("click", () => {
    sideBar.classList.toggle("activate");
  });
};
toggleSideMenu();
