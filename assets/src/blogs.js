document.addEventListener("DOMContentLoaded", function (e) {
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

  const showBlogData = function () {
    let publishList;
    if (localStorage.getItem("publishList") === null) {
      publishList = [];
    } else {
      publishList = JSON.parse(localStorage.getItem("publishList"));
    }

    let blogHtml = "";
    publishList.forEach((blog) => {
      blogHtml = `
        <div class="content">
          <h3>${blog.title}</h3>
          <div>
            <img
              src="https://images.unsplash.com/photo-1708439001065-b2947b811cf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"
            />
          </div>
        </div>
        <p>${blog.description}
        </p>
        <a href="/pages/readmore.html"><strong>Readmore...</strong></a>
        `;
      const container = document.createElement("div");
      container.innerHTML = blogHtml;
      container.classList.add("blog-container");
      blogMain.appendChild(container);
    });
  };

  showBlogData();
});
