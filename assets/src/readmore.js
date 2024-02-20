document.addEventListener("DOMContentLoaded", function () {
  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");

  let loggedId = JSON.parse(localStorage.getItem("loggedUser"));

  if (!(loggedId === null)) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  }

  const showBlogData = function () {
    const singleBlog = document.querySelector("#singleBlog");

    let publishList;
    if (localStorage.getItem("publishList") === null) {
      publishList = [];
    } else {
      publishList = JSON.parse(localStorage.getItem("publishList"));
    }

    let blogHtml = "";
    publishList.forEach((blog, index) => {
      blogHtml += `<div class="content">
        <h2>${blog.title}</h2>
        <div class="content"> 
          <img src="https://images.unsplash.com/photo-1708439001065-b2947b811cf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8" alt="Eiffel Tower during daytime" class="eiffel-tower" />
        </div> 
        <span>${blog.date}</span>
        <p>${blog.description}</p>
        <div class="read">
        <div class="comments">
        <p class="numbers" id="comment-count-${index}">0 Comments</p>
        <div class="liked">
          <box-icon name='like' color='#555555' size="sm"></box-icon> <span class="totalLikes">0</span>
          <div class="likes"><box-icon name='dislike' color='#555555'></box-icon></div>
        </div>
      </div>
          <textarea name="message" class="textarea" id="message-${index}" cols="30" rows="10" placeholder="Type your comment here"></textarea>
          <small></small>
          <div class="send-comment">
            <span><box-icon name="wink-smile" class="wink1" color="#ffa800"></box-icon></span>
            <button class="send-message" data-index="${index}" type="submit">Send Comment</button>
          </div>
          <div class="latest" id="latest-comments-${index}"><h3>Latest Comments here</h3></div>
        </div>
      </div>
      `;
    });

    const container = document.createElement("div");
    container.innerHTML = blogHtml;
    container.classList.add("read-container");
    singleBlog.appendChild(container);

    // Event listener for sending comments
    document.querySelectorAll(".send-message").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        displayComment(index);
      });
    });
  };

  showBlogData();

  function displayComment(index) {
    const latest = document.querySelector(`#latest-comments-${index}`);
    const messageEl = document.querySelector(`#message-${index}`);

    if (!messageEl.value) return;

    let commentData;
    if (localStorage.getItem(`comments-${index}`) === null) {
      commentData = [];
    } else {
      commentData = JSON.parse(localStorage.getItem(`comments-${index}`));
    }

    let currentId = JSON.parse(localStorage.getItem("loggedUser"));

    if (currentId !== null) {
      const message = messageEl.value;
      const users = JSON.parse(localStorage.getItem("userArray")) || [];
      const currentUser = users.find((user) => user.id === currentId);
      let comment;
      if (currentUser) {
        comment = {
          userId: currentId,
          userName: currentUser.u_email,
          message: message,
          date: new Date().toISOString(),
        };
      }

      commentData.push(comment);
      localStorage.setItem(`comments-${index}`, JSON.stringify(commentData));

      let html = "";
      commentData.forEach((comment) => {
        html += `<div class="person11">
          <div class="person">
            <img src="/assets/images/WhatsApp Image 2024-02-01 at 17.41.01.jpeg" alt="my sis profile">
          </div>
          <div class="person">
            <div class="name">
              <strong>${comment.userName}</strong>
              <big>${new Date(comment.date).toDateString()}</big>
            </div>
            <div class="message"><p>${comment.message}</p></div>
            <div class="reacts">
              <box-icon name='like' color='#555555' size="small"><span class="likes">0</span></box-icon><span>0</span>
              <div><box-icon name='dislike' color='#555555'></box-icon></div>
              <p>Reply</p>
            </div>
          </div>
        </div>`;
      });

      latest.innerHTML = html;

      messageEl.value = "";

      let totalComments = commentData.length;
      document.querySelector(
        `#comment-count-${index}`
      ).textContent = `${totalComments} Comments`;
    } else {
      alert("You can't comment, please Sign up or Login");
      window.location.href = "./signup.html";
    }
    return;
  }

  const logoutFunction = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.href = "../index.html";
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {
      logoutFunction();
    }
  });
});
