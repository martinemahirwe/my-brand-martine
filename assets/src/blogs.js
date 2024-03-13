document.addEventListener("DOMContentLoaded", function () {
  const blogMain = document.querySelector("#blogMain");

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

  let publishList;
  if (localStorage.getItem("publishList") === null) {
    publishList = [];
  } else {
    publishList = JSON.parse(localStorage.getItem("publishList"));
  }
  const showBlogData = function () {
    let blogHtml = "";
    publishList.forEach((blog) => {
      blogHtml += `
          <h3>${blog.title}</h3>
          <div class="content">
            <img src="https://images.unsplash.com/photo-1708439001065-b2947b811cf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8" />
          </div>
          <p>${blog.description}</p>
          <strong data-blog='${blog.b_id}'class="readmore">Readmore...</strong>
      `;
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("readmore")) {
        const blogId = e.target.dataset.blog;
        const blogDetails = publishList.find(
          (blog) => blog.b_id === parseInt(blogId)
        );
        window.location.href = "./readmore.html";
        sessionStorage.setItem("blogDetails", JSON.stringify(blogDetails));
      }
    });

    const container = document.createElement("div");
    container.innerHTML = blogHtml;
    container.classList.add("blog-container");
    blogMain.appendChild(container);
  };
  showBlogData();

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
});
