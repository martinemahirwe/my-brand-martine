const body = document.querySelector("body");
const element1 = document.querySelector("#manage-art");
const element2 = document.querySelector("#conver");
const element3 = document.querySelector("#create-art");
const element4 = document.getElementsByClassName("green");
const element5 = document.querySelector(".delete");

const modal1 = document.querySelector("#modal1");
const modal2 = document.querySelector("#modal2");
const modal3 = document.querySelector("#modal3");
const modal5 = document.querySelector("#modal5");
const modal4 = document.querySelector("#modal4");
const modal6 = document.querySelector("#modal6");
const modal = document.querySelector("dialog");

const btn1 = document.querySelector(".close");
const btn2 = document.querySelector(".art-button");
const btn3 = document.querySelector(".art-button1");
const btn4 = document.querySelector(".reply-btn");
const btn5 = document.querySelector(".delete-btn");
const btn6 = document.querySelector(".drop-btn");
const menu1 = document.querySelector(".menu1");
const sideBar = document.querySelector(".side-bar");

menu1.addEventListener("click", () => {
  sideBar.classList.toggle("activate");
});

btn6.addEventListener("click", () => {
  modal6.classList.toggle("visible");
});

element1.addEventListener("click", () => {
  modal3.showModal();
  body.style.opacity = "0.4";
});

element2.addEventListener("click", () => {
  modal2.showModal();
  body.style.opacity = "0.4";
});
element3.addEventListener("click", () => {
  modal1.showModal();
  body.style.opacity = "0.4";
});
for (let i = 0; i < element4.length; i++) {
  element4[i].addEventListener("click", () => {
    modal5.showModal();
    body.style.opacity = "0.4";
  });
}

element5.addEventListener("click", () => {
  alert("are you sure you wanna delete this???");
  modal4.showModal();
});

btn1.addEventListener("click", () => {
  modal2.close();
  body.style.opacity = "1";
});
btn2.addEventListener("click", () => {
  modal1.close();
  body.style.opacity = "1";
});
btn3.addEventListener("click", () => {
  modal3.close();
  body.style.opacity = "1";
});

btn4.addEventListener("click", () => {
  modal5.close();
  body.style.opacity = "1";
});

btn5.addEventListener("click", () => {
  modal4.close();
});
