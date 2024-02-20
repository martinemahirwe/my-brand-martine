document.addEventListener("DOMContentLoaded", () => {
  const usernameEl = document.querySelector("#username");
  const emailEl = document.querySelector("#email");
  const messageEl = document.querySelector('[name="message"]');
  const emojis = document.querySelector("#emojis");
  const emoji = Array.from(document.querySelectorAll("#emojis span"));
  const winkSmile = document.querySelector(".wink1");
  const firstForm = document.querySelector("#signup");

  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");

  let loggedId = JSON.parse(localStorage.getItem("loggedUser"));
  let loggedAd = JSON.parse(localStorage.getItem("loggedAdmin"));

  if (loggedId !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  } else if (loggedAd !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  } else {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
  }

  const validateForm = function () {
    const checkUsername = () => {
      let valid = false;

      const min = 3,
        max = 25;

      const username = usernameEl.value.trim();

      if (!isRequired(username)) {
        showError(usernameEl, "Username cannot be blank.");
      } else if (!isBetween(username.length, min, max)) {
        showError(
          usernameEl,
          `Username must be between ${min} and ${max} characters.`
        );
      } else {
        showSuccess(usernameEl);
        valid = true;
      }
      return valid;
    };

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

    const isEmailValid = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const isRequired = (value) => (value === "" ? false : true);
    const isBetween = (length, min, max) =>
      length < min || length > max ? false : true;

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
    firstForm.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "email":
          checkEmail();
          break;
      }
    });

    firstForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail();

      let isFormValid = isUsernameValid && isEmailValid;

      if (isFormValid) {
        addMessage();
      }
    });
  };
  validateForm();

  const displaySuccessMsg = (element, message) => {
    const header6 = document.createElement("h6");
    element.classList.remove("hide");
    element.style.background = "#4cb54cb5";
    element.appendChild(header6).innerText = `${message}`;
    setTimeout(() => {
      element.classList.add("hide");
    }, 2000);
  };

  const toggleWink = function () {
    emojis.classList.add("hidden");
    messageEl.addEventListener("keydown", (e) => {
      winkSmile.style.opacity = "1";
    });
    winkSmile.addEventListener("click", function () {
      emojis.classList.toggle("hidden");
    });
    emoji.forEach((span) => {
      span.addEventListener("click", function () {
        const emoji = this.textContent;
        messageEl.value += emoji;
      });
    });
  };
  toggleWink();

  let id;

  const addMessage = function () {
    let messageList = [];
    const name = usernameEl.value;
    const message = messageEl.value;
    const email = emailEl.value;

    let getData = JSON.parse(localStorage.getItem("messageList"));

    if (getData === null) {
      id = 1;
      messageList.push({
        m_id: id,
        m_name: name,
        m_message: message,
        m_email: email,
      });
      localStorage.setItem("messageList", JSON.stringify(messageList));
     displaySuccessMsg(
       document.querySelector(".msgcontact"),
       "YOU ARE REGISTERED SUCCESSFULLY!! YOU CAN LOGIN "
     );
      location.reload();
      showData();

      name = "";
      message = "";
      email = "";
    } else {
      messageList = getData;
      const length = messageList.length;
      id = length + 1;

      messageList.push({
        m_id: id,
        m_name: name,
        m_message: message,
        m_email: email,
      });

      localStorage.setItem("messageList", JSON.stringify(messageList));
      alert("Message Sent success full");
      location.reload();
      showData();

      name = "";
      message = "";
      email = "";
    }
  };
});
