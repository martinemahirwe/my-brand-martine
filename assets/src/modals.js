document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const element1 = document.querySelector("#manage-art");
  const element2 = document.querySelector("#conver");
  const element3 = document.querySelector("#create-art");
  const element4 = document.getElementsByClassName("green");
  const element7 = document.querySelector("#element7");

  const modal1 = document.querySelector("#modal1");
  const modal2 = document.querySelector("#modal2");
  const modal3 = document.querySelector("#modal3");
  const modal5 = document.querySelector("#modal5");
  const modal6 = document.querySelector("#modal6");
  const modal7 = document.querySelector("#modal7");
  const modal8 = document.querySelector("#modal8");
  const modal10 = document.querySelector("#modal10");

  const btn2 = document.querySelector(".art-button");
  const btn1 = document.querySelector(".close");

  const btn4 = document.querySelector(".reply-btn,#reply-btn");
  const btn5 = document.querySelector(".delete-btn");
  const btn6 = document.querySelector(".drop-btn");
  const btn7 = document.querySelector(".close-icon3");
  const btn8 = document.querySelector(".close-icon2");
  const btn9 = document.querySelector(".close-icon1");
  const btn10 = document.querySelector(".btn-cancel");
  const cancel6 = document.querySelector("#cancel6");
  const actionBtn = document.querySelectorAll(".action-btn");
  const replyBtn = document.querySelectorAll("#reply-btn");
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("action-btn")) {
      modal10.showModal();
    }
  });

  btn10.addEventListener("click", () => {
    modal8.close();
  });

  btn7.addEventListener("click", () => {
    modal1.close();
    body.style.opacity = "1";
  });
  btn8.addEventListener("click", () => {
    modal3.close();
    body.style.opacity = "1";
  });

  btn9.addEventListener("click", () => {
    modal7.close();
    body.style.opacity = "1";
  });
  element7.addEventListener("click", () => {
    modal7.showModal();
    body.style.opacity = "0.4";
  });
  btn6.addEventListener("click", () => {
    modal6.classList.add("visible");
  });

  cancel6.addEventListener("click", () => {
    modal6.classList.add("hidden");
    location.reload();
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
  btn1.addEventListener("click", () => {
    modal2.close();
    body.style.opacity = "1";
  });

  btn4.addEventListener("click", () => {
    modal5.close();
    body.style.opacity = "1";
  });
});
