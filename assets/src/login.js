
document.addEventListener("DOMContentLoaded", function () {
  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");

  let loggedId = localStorage.getItem("token");
  let loggedAdmin = localStorage.getItem("tokenAdmin");
  
  if (loggedId !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  } else if (loggedAdmin !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
    window.location.href = "./admin.html";
  } else {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
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
    const header6 = document.createElement("h4");
    element.classList.remove("hide");
    header6.style.color = "white";
    element.style.background = "#770a0afc";
    element.appendChild(header6).innerText = `${message}`;
    setTimeout(() => {
      element.classList.add("hide");
    }, 2000);
  };
  
  const checkUser = async function () {
    const password = passwordEl.value.trim().toLowerCase();
    const email = emailEl.value.trim().toLowerCase();

    try {
      const response = await fetch(
        "https://my-brand-martine-backendapis.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          }),
        }
      );


      if (!response.ok) {
        throw new Error(response.message || "Failed to login");
      }

      const responseData = await response.json();
      console.log(responseData);
    

        if (responseData.user.userRole === "admin") {
          localStorage.setItem("tokenAdmin",responseData.token);
           window.location.href = "./admin.html";
        } else {
          localStorage.setItem("token",responseData.token);
         window.location.href = "./readmore.html";
        }
      
     } catch (error) {
      console.error("Error logging in:", error.message);
      displayFailMessage(
        document.querySelector(".msgLogin"),
        "Failed to login. Please try again later."
      );
     } 
  };

  const logoutFunction = () => {
    window.location.href = "../index.html";
    localStorage.removeItem("tokenAdmin");
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {
      logoutFunction();
    }
  });

});
