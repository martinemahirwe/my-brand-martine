document.addEventListener("DOMContentLoaded", function () {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let loggedAdmin = JSON.parse(localStorage.getItem("loggedAdmin"));

  if (loggedUser !== null) {
    window.location.href = "../index.html";
  }
  if (loggedAdmin !== null) {
    window.location.href = "./admin.html";
  }
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");
  const form = document.querySelector("#signup");

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, "Email cannot be blank.");
    } else if (!isEmailValid(email)) {
      showError(emailEl, "Email is not valid.");
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkPassword = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordEl, "Password cannot be blank.");
    } else if (!isPasswordSecure(password)) {
      showError(
        passwordEl,
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
      );
    } else {
      showSuccess(passwordEl);
      valid = true;
    }

    return valid;
  };

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  const isRequired = (value) => (value === "" ? false : true);

  const showError = (input, message) => {
    const formField = input.parentElement;

    input.classList.remove("success");
    formField.classList.add("error");

    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove("error");
    input.classList.add("success");

    const error = formField.querySelector("small");
    error.textContent = "";
  };

  form.addEventListener("input", function (e) {
    switch (e.target.id) {
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isEmailValid = checkEmail(),
      isPasswordValid = checkPassword();

    let isFormValid = isEmailValid && isPasswordValid;

    if (isFormValid) {
      checkUser();
    }
  });

  const displayFailMessage = (element, message) => {
    const header6 = document.createElement("h6");
    element.classList.remove("hide");
    element.style.background = "#770a0afc";
    element.appendChild(header6).innerText = `${message}`;
    setTimeout(() => {
      element.classList.add("hide");
    }, 2000);
  };

  const checkUser = function () {
    const password = passwordEl.value.trim().toLowerCase();
    const email = emailEl.value.trim().toLowerCase();

    let getData = JSON.parse(window.localStorage.getItem("userArray"));

    if (getData === null) {
      displayFailMessage(
        document.querySelector(".mesgLogin"),
        "Sign Up First !!"
      );
    } else {
      let emailFound = false;
      for (const items of getData) {
        if (items.u_email === email) {
          emailFound = true;
          if (items.u_password === password) {
            if (email === "mahirwe@gmail.com") {
              loggedId = items.u_id;
              setAdmin(loggedId);
              window.location.href = "./admin.html";
              return;
            } else {
              loggedId = items.u_id;
              setLogged(loggedId);
              window.location.href = "./readmore.html";
              return;
            }
          } else {
            displayFailMessage(
              document.querySelector(".mesgLogin"),
              "Wrong Credentials!!"
            );
            return;
          }
        }
      }
      if (!emailFound) {
        displayFailMessage(
          document.querySelector(".mesgLogin"),
          "You are not registered !!"
        );
        return;
      }
    }
  };
  const setLogged = (userId) => {
    let userIdText = JSON.stringify(userId);
    window.localStorage.setItem("loggedUser", userIdText);
  };
  const setAdmin = (userId) => {
    let userIdText = JSON.stringify(userId);
    window.localStorage.setItem("loggedAdmin", userIdText);
  };
  const logoutFunction = () => {
    window.localStorage.removeItem("loggedUser");
    window.localStorage.removeItem("loggedAdmin");
    window.location.href = "../index.html";
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {
      logoutFunction();
    }
  });
});
