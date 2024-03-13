document.addEventListener("DOMContentLoaded", function () {
  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");

  let loggedId = JSON.parse(localStorage.getItem("loggedUser"));
  let loggedAdmin = JSON.parse(localStorage.getItem("loggedAdmin"));

  if (loggedId !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  } else if (loggedAdmin !== null) {
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
  } else {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
  }

  let publishList;
  if (localStorage.getItem("publishList") === null) {
    publishList = [];
  } else {
    publishList = JSON.parse(localStorage.getItem("publishList"));
  }

  const showBlogDetails = function () {
    const singleBlog = document.querySelector("#singleBlog");

    let blogDetails;
    if (sessionStorage.getItem("blogDetails") === null) {
      blogDetails = [];
    } else {
      blogDetails = JSON.parse(sessionStorage.getItem("blogDetails"));
    }

    let blogHtml = "";
    if (blogDetails) {
      blogHtml += `
        <h2>${blogDetails.title}</h2>
        <div class="content">
          <img src="https://images.unsplash.com/photo-1708439001065-b2947b811cf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8" alt="Eiffel Tower during daytime" class="eiffel-tower" />
        </div>
        <span>${blogDetails.date}</span>
        <p>${blogDetails.description}</p>
        <div class="latest-comments" id="latest-comments-${blogDetails.b_id}" data-num='${blogDetails.b_id}'>
          <h3>Latest Comments here</h3>
        </div>
      </div>`;
    }
    const container = document.createElement("div");
    container.innerHTML = blogHtml;
    container.classList.add("read-container");
    singleBlog.prepend(container);

    const comId = document.querySelector(".latest-comments").dataset.num;
    displayComments(comId);
    // const lid = document.querySelector(".likes-count").dataset.like;
    // displayLikes(lid);
  };
  showBlogDetails();

  function displayComments(cid) {
    const latestCommentsContainer = document.querySelector(
      `#latest-comments-${cid}`
    );
    let commentData = JSON.parse(localStorage.getItem("comments")) || [];
    document.querySelector(
      "#comment-count"
    ).innerHTML = `${commentData.length} Comments`;
    let commentsHtml = "";
    commentData.forEach((comment) => {
      if (comment.b_id === cid) {
        // Check if comment is not null or undefined
        commentsHtml += `
          <div class="person11">
            <div class="person">
              <img src="/assets/images/WhatsApp Image 2024-02-01 at 17.41.01.jpeg" alt="my sis profile">
            </div>
            <div class="person">
              <div class="name">
                <strong>${comment.c_name}</strong>
                <big>${comment.c_date}</big>
              </div>
              <div class="message"><p>${comment.c_mes}</p></div>
              <div class="reacts">
                <box-icon name="like"class='like-btn' color='#555555' size="small"><span class="likes-count likes-count-${comment.c_id}" data-like = ${comment.c_id}>0</span></box-icon><span>0</span>
                <div><box-icon name='dislike' color='#555555'></box-icon></div>
                <p>Reply</p>
              </div>
            </div>
          </div>`;
      }
    });
    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = commentsHtml;
    commentDiv.classList.add("read");
    latestCommentsContainer.appendChild(commentDiv);
  }

  const addComment = function (id, message) {
    const currentId = JSON.parse(localStorage.getItem("loggedUser"));

    if (currentId === null) {
      alert("You need to be logged in to add a comment.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("userArray"));
    const currentUser = users.find((user) => user.u_id === parseInt(currentId));

    let comments;
    c_id = null;
    if (localStorage.getItem("comments") === null) {
      c_id = 1;
      comments = [];
    } else {
      comments = JSON.parse(localStorage.getItem("comments"));
      c_id = comments.length + 1;
    }

    const newComment = {
      b_id: id,
      u_id: currentUser.u_id,
      c_id,
      c_name: currentUser.u_email,
      c_date: new Date().toLocaleString(),
      c_mes: message,
    };
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments(id);
  };

  // function displayLikes(id) {
  //   let likeData = JSON.parse(localStorage.getItem("likes")) || [];
  //   document.querySelector("#totalLikes").innerHTML = likeData.length;
  // }

  // function addLikes(id) {
  //   let liked = false;
  //   if (liked) {
  //     const currentId = JSON.parse(localStorage.getItem("loggedUser"));

  //     if (currentId === null) {
  //       alert("You need to be logged in to add a comment.");
  //       return;
  //     }

  //     likesContainer.innerHTML += 1;

  //     const users = JSON.parse(localStorage.getItem("userArray"));
  //     const currentUser = users.find(
  //       (user) => user.u_id === parseInt(currentId)
  //     );

  //     let likes,
  //       l_id = null;
  //     if (localStorage.getItem("likes") === null) {
  //       l_id = 1;
  //       likes = [];
  //     } else {
  //       likes = JSON.parse(localStorage.getItem("likes"));
  //       l_id = likes.length + 1;
  //     }

  //     const newLike = {
  //       l_id,
  //       c_id: id,
  //       u_id: currentUser.u_id,
  //     };
  //     likes.push(newLike);
  //     localStorage.setItem("likes", JSON.stringify(likes));
  //     displayLikes(id);

  //     liked = true;
  //     return liked;
  //   }
  //   likee -= 1;
  // }

  // document.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("like-btn")) {
  //     const id = document.querySelector(".likes-count").dataset.like;
  //     addLikes(id);
  //   }
  // });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("send-message")) {
      const comId = document.querySelector(".latest-comments").dataset.num;
      const commentInput = document.getElementById("message");
      const commentMessage = commentInput.value.trim();

      if (commentMessage !== "") {
        addComment(comId, commentMessage);
        commentInput.value = "";
      }
    }
  });

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
  const commentInput = document.getElementById("message");
  console.log(commentInput.value);
});
