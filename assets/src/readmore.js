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
  } else {
    btnLogin.style.display = "flex";
    btnLogout.style.display = "none";
  }

  // Fetch published blogs
  fetch(`https://my-brand-martine-backendapis.onrender.com/blogs/published/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": loggedAdmin || loggedId
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch published blogs");
    }
    return response.json();
  })
  .then(data => {
    const readmoreButtons = document.querySelectorAll(".readmore");
    readmoreButtons.forEach(button => {
      button.addEventListener("click", () => {
        const blogId = button.dataset.blog;
        const blog = data.find(blog => blog._id === blogId);
        if (blog) {
          showBlogDetails(blog);
        } else {
          console.error("Blog not found");
        }
      });
    });
  })
  .catch(error => {
    console.error("Error fetching published blogs:", error.message);
  });

  const showBlogDetails = function (blog) {
    const singleBlog = document.querySelector("#singleBlog");

    let blogHtml = "";
    if (blog) {
      blogHtml += `
        <h2>${blog.title}</h2>
        <div class="content">
          <img src="${blog.imageLink}" alt="${blog.title}" class="eiffel-tower" />
        </div>
        <span>${blog.publishedDate}</span>
        <p>${blog.shortDescript}</p>
        <div class="latest-comments" id="latest-comments-${blog._id}" data-num="${blog._id}">
          <h3>Latest Comments here</h3>
        </div>
      </div>`;
    }
    const container = document.createElement("div");
    container.innerHTML = blogHtml;
    container.classList.add("read-container");
    singleBlog.prepend(container);

    if (blog) {
      displayComments(blog._id);
    }
  };

  function displayComments(cid) {
    // Fetch comments for the given blog post
    fetch(`https://my-brand-martine-backendapis.onrender.com/blogs/${cid}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": loggedAdmin || loggedId
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json();
    })
    .then(commentData => {
      const latestCommentsContainer = document.querySelector(`#latest-comments-${cid}`);
      if (!latestCommentsContainer) return;
      
      document.querySelector("#comment-count").innerHTML = `${commentData.length} Comments`;

      let commentsHtml = "";
      commentData.forEach((comment) => {
        commentsHtml += `
          <div class="person11">
            <div class="person">
              <img src="/assets/images/WhatsApp Image 2024-02-01 at 17.41.01.jpeg" alt="my sis profile">
            </div>
            <div class="person">
              <div class="name">
                <strong>${comment.name}</strong>
                <big>${comment.date}</big>
              </div>
              <div class="message"><p>${comment.comment}</p></div>
              <div class="reacts">
                <box-icon name="like" class='like-btn' color='#555555' size="small">
                  <span class="likes-count likes-count-${comment._id}" data-like="${comment._id}">${comment.likes}</span>
                </box-icon>
                <span>${comment.likes}</span>
                <div><box-icon name='dislike' color='#555555'></box-icon></div>
                <p>Reply</p>
              </div>
            </div>
          </div>`;
      });

      const commentDiv = document.createElement("div");
      commentDiv.innerHTML = commentsHtml;
      commentDiv.classList.add("read");
      latestCommentsContainer.appendChild(commentDiv);
    })
    .catch(error => {
      console.error("Error fetching comments:", error.message);
    });
  }

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
