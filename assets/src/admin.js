let loggedAdmin = JSON.parse(localStorage.getItem("loggedAdmin"));
// if (loggedAdmin === null) {
//   window.location.href = "./login.html";
// }

document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.querySelector("#conversation");
  const replyContainer = document.querySelector("#modal5");

  const showData = function () {
    let messageList;
    if (localStorage.getItem("messageList") === null) {
      messageList = [];
    } else {
      messageList = JSON.parse(localStorage.getItem("messageList"));
    }
    let html = "";
    messageList.forEach((message, index) => {
      html += `
       <div id="conversation">
      <div class="article-data">
      <div class="person11"><div class="person">
      <img src="/assets/images/WhatsApp Image 2024-02-01 at 17.41.01.jpeg" alt="my sis profile">
      </div>
      <div class="person">
      <div class="name">
      <strong>${message.m_name}</strong>
      <big>${new Date().getDay()} hours ago</big>
      </div>
      <div class="message"><p>${message.m_message}</p>
      <div><span class="green ">reply</span>
      <span class="red">mark as read</span>
      <span class="delete delete-btn">Delete</span></div></div>
         </div>
       </div>
      </div>
    </div>`;
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        deleteArticle(this.m_id);
      }
      if (e.target.classList.contains("green")) {
        replyContainer.showModal();
      }
    });
    const container = document.createElement("div");
    container.innerHTML = html;
    messagesContainer.appendChild(container);
  };

  showData();

  const deleteArticle = function (index) {
    let messageList;

    if (localStorage.getItem("messageList") === null) {
      messageList = [];
    } else {
      messageList = JSON.parse(localStorage.getItem("messageList"));
    }

    messageList.splice(index, 1);

    localStorage.setItem("messageList", JSON.stringify(messageList));
    location.reload();
    showData();
  };

  const mark = document.querySelector(".read");
  mark.addEventListener("click", () => {
    this.style.innerHTML = "read";
  });
});

const logoutFunction = (e) => {
  window.localStorage.removeItem("loggedAdmin");

  window.location.href = "../index.html";
};
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("logout-btn")) {
    logoutFunction();
  }
});
