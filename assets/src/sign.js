let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser !== null) {
  window.location.href = "./login.html";
}

const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");
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

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
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
    case "confirm-password":
      checkConfirmPassword();
      break;
  }
});
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

  if (isFormValid) {
    addUser();
  }
});

const displaySuccessMsg = (element, message) => {
  const header6 = document.createElement("h6");
  element.classList.remove("hide");
  element.style.background = "#4cb54cb5";
  element.appendChild(header6).innerText = `${message}`;
  setTimeout(() => {
    element.classList.add("hide");
  }, 2000);
};

const displayFailMessage = (element, message) => {
  const header6 = document.createElement("h6");
  element.classList.remove("hide");
  element.style.background = "#770a0afc";
  element.appendChild(header6).innerText = `${message}`;
  setTimeout(() => {
    element.classList.add("hide");
  }, 2000);
};

const addUser = function () {
  let userArray = [];
  const confirmPassword = confirmPasswordEl.value.trim().toLowerCase();
  const email = emailEl.value.trim().toLowerCase();

  let getData = JSON.parse(window.localStorage.getItem("userArray"));

  if (getData === null) {
    let id = 1;
    let user = createUser(id, email, confirmPassword);

    userArray.push(user);
    window.localStorage.setItem("userArray", JSON.stringify(userArray));

    displaySuccessMsg(
      document.querySelector(".msgSignup"),
      "Signed Up successFull, You can Logon! "
    );

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2000);
  } else {
    userArray = getData;
    for (const items of userArray) {
      if (items.u_email === email) {
        displayFailMessage(
          document.querySelector(".msgSignup"),
          "this email already signed up !!"
        );
        return;
      }
    }
  }
  let currentDbLength = userArray.length;
  let id = currentDbLength + 1;
  let user = createUser(id, email, confirmPassword);

  userArray.push(user);
  window.localStorage.setItem("userArray", JSON.stringify(userArray));

  displaySuccessMsg(
    document.querySelector(".msgSignup"),
    "registerd success full "
  );
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 2000);
};

const createUser = (u_id, u_email, u_password) => {
  userAccount = {
    u_id: u_id,
    u_email: u_email,
    u_password: u_password,
    u_pic: "",
    u_dec: "",
  };

  return userAccount;
};
