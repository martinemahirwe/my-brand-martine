document.addEventListener("DOMContentLoaded", function () {
  const blogMain = document.querySelector("#blogMain");

  const btnLogout = document.querySelector(".logout-btn");
  const btnLogin = document.querySelector(".login-btn");

  let loggedId = localStorage.getItem("token");
  let loggedAd = localStorage.getItem("tokenAdmin");

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

  const showBlogData = async function () {
    try {
      const response = await fetch("https://my-brand-martine-backendapis.onrender.com/blogs/published", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("tokenAdmin")
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch published blogs");
      }
      
      const publishList = await response.json();
      
      let blogHtml = "";
      publishList.forEach((blog) => {
        blogHtml += `
            <h3>${blog.title}</h3>
            <div class="content">
              <img src="${blog.image}" alt="Blog Image" />
            </div>
            <p>${blog.shortDescript}</p>
            <strong data-blog='${blog._id}' class="readmore">Read more...</strong>
        `;
      });
  
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("readmore")) {
          const blogId = e.target.dataset.blog;
          const blogDetails = publishList.find(
            (blog) => blog._id === blogId
          );
          sessionStorage.setItem("blogDetails", JSON.stringify(blogDetails));
          window.location.href = "./readmore.html";
        }
      });
  
      const container = document.createElement("div");
      container.innerHTML = blogHtml;
      container.classList.add("blog-container");
      blogMain.appendChild(container);
    } catch (error) {
      console.error("Error fetching published blogs:", error.message);
    }
  };
  
  showBlogData();
  

  const logoutFunction = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedAdmin");
    window.location.href = "../index.html";
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {
      logoutFunction();
    }
  });
});
