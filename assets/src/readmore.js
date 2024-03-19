document.addEventListener("DOMContentLoaded", function () {
  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");
  const totalLikes = document.querySelector("#totalLikes");
  const likeB = document.getElementsByClassName("likeBlog");

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
   console.log(blog);
    let blogHtml = "";
    if (blog) {
      blogHtml += `
        <h2>${blog.title}</h2>
        <div class="content">
          <img src="${blog.imageLink}" alt="${blog.title}" class="eiffel-tower" />
        </div>
        <span>${blog.publishedDate}</span>
        <p>${blog.description}</p>
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

    if (blog) {
      displayComments(blog._id);
    }
  };
showBlogDetails();

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

  async function displayComments(id){
    const blog = await fetchPublishedBlogs();
    const commentData = blog.comments;
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
                <big>${new Date().getMinutes()} minutes ago</big>
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
    }
   
    async function addComment(blogId, comment) {
      try {
        const response = await fetch(`https://my-brand-martine-backendapis.onrender.com/comments/${blogId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({ comment }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to comment on this blog, please login first");
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error posting comment:", error.message);
        displayFailMessage(
          document.querySelector(".msgcom"),
          error.message
        );
      }
    }
    
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("send-message")) {
      const commentInput = document.getElementById("message");
      const commentMessage = commentInput.value.trim();

      if (commentMessage !== "") {
        addComment(clickedBlogId, commentMessage);
        commentInput.value = "";
      }
    }
  });

  
document.addEventListener("click",e =>{
if(e.target.classList.contains("likeBlog")){
  console.log("clicked");
 addLike(clickedBlogId);
}
})
  async function addLike(blogId){
    try {
      const response = await fetch(`https://my-brand-martine-backendapis.onrender.com/like/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        }
      });
  
      if (!response.ok) {
        throw new Error("you have to login before you like");
      }
  
      const data = await response.json();
      totalLikes.textContent = data.likes;

    } catch (error) {
      console.error("Error liking blog:", error.message);
      displayFailMessage(
        document.querySelector(".msglike"),
        error.message
      );
    }
  }
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
 
});
