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

  const urlParams = new URLSearchParams(window.location.search);

  const clickedBlogId = urlParams.get('id');
 
  async function fetchPublishedBlogs() {
    try {
      const response = await fetch(`https://my-brand-martine-backendapis.onrender.com/blogs/published/${clickedBlogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch published blogs");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching published blogs:", error.message);
      throw error;
    }
  }


  const showBlogDetails = async function () {
    const singleBlog = document.getElementById("singleBlog");
   const blog = await fetchPublishedBlogs();
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
    console.log(container,singleBlog);
    singleBlog.prepend(container);

    // if (blog) {
    //   displayComments(blog._id);
    // }
  };
showBlogDetails();
    

  function displayComments(id) {
    fetch(`https://my-brand-martine-backendapis.onrender.com/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json();
    })
    .then(commentData => {
      const latestCommentsContainer = document.querySelector(`#latest-comments-${id}`);
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

  // document.addEventListener("click", function (event) {
  //   if (event.target.classList.contains("send-message")) {
  //     const comId = document.querySelector(".latest-comments").dataset.num;
  //     const commentInput = document.getElementById("message");
  //     const commentMessage = commentInput.value.trim();

  //     if (commentMessage !== "") {
  //       addComment(comId, commentMessage);
  //       commentInput.value = "";
  //     }
  //   }
  // });

  const logoutFunction = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenAdmin");
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
