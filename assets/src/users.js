document.addEventListener("DOMContentLoaded", function () {
  const element6 = document.querySelector("#element6 .num");
  const elem6 = document.querySelector("#element6");

  userArray = JSON.parse(localStorage.getItem("userArray"));

  //element6.innerHTML = userArray.length;

  const modal9 = document.querySelector("#modal9");
  const modal6 = document.querySelector("#modal6");
  const btn9 = document.querySelector(".close-icon6");

  let html;
  userArray.forEach((element) => {
    html += `
<div class="grid">
  <div class="cell header">${element.u_id}</div>
  <div class="cell cell1">${element.u_email}</div>
</div>
`;
  });

  const divUsers = document.createElement("div");

  divUsers.innerHTML = html;
  modal9.appendChild(divUsers);
  elem6.addEventListener("click", function () {
    modal9.showModal();
  });
  btn9.addEventListener("click", function () {
    modal9.close();
  });

  const logoutFunction = (e) => {
    window.localStorage.removeItem("loggedAdmin");

    window.location.href = "../index.html";
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout")) {
      logoutFunction();
      modal6.classList.add("hidden");
    }
  });
});
