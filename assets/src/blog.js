document.addEventListener("DOMContentLoaded", function () {
  let loggedAdmin = JSON.parse(localStorage.getItem("loggedAdmin"));
  if (loggedAdmin === null) {
    window.location.href = "./login.html";
  }
  const modal15 = document.querySelector("#modall15");
  const popup = document.querySelector(".popup");
  const body = document.querySelector("body");
  const buttonEl = document.querySelector(".art-button");
  const button2 = document.querySelector(".art-button1");
  const modal8 = document.querySelector("#modal8");
  const modal7 = document.querySelector("#modal7");
  const elem7 = document.querySelector("#element7 .num");
  const modal3 = document.querySelector("#modal3");
  const cancelBtn = document.querySelector(".btn-cancel");

  const showData = function () {
    let blogList;
    if (localStorage.getItem("blogList") === null) {
      blogList = [];
    } else {
      blogList = JSON.parse(localStorage.getItem("blogList"));
    }
    let html = "";
    blogList.forEach((blog, index) => {
      html += `
      <div class="blog">
        <h4>${blog.title}</h4>
        <div class="image-div">
         <img src="https://images.unsplash.com/photo-1708439001065-b2947b811cf8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8" alt="Blog Image">
        </div>
        <p><strong>Written Date:</strong> ${blog.date}</p>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p>${blog.description}</p>
        <div class="actions">
          <button class="delete-blog" data-key="${index}">Delete</button>
          <button class="edit-blog" data-key="${index}" type="button">Edit</button>
          <button class="publish" data-key="${index}" type="button">Publish</button>
        </div>
      </div>`;
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-blog")) {
          updateArticle(index);
        }
        if (e.target.classList.contains("publish")) {
          publishArt(index);
          e.target.classList.remove("publish");
          e.target.style.opacity = "0.5";
          e.target.style.textContent = "Published";
        }
      });
    });

    const deleteButton = document.querySelector(".btn-delete");

    deleteButton.addEventListener("click", function () {
      deleteArticle(this.m_id);
      modal7.showModal();
    });

    elem7.textContent = blogList.length;
    const container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = html;
    modal7.appendChild(container);
  };

  showData();

  const addArticle = function () {
    const title = document.querySelector('[placeholder="Article Title"]').value;
    const author = document.querySelector(
      '[placeholder="Article Author"]'
    ).value;
    const description = document.querySelector(
      '[placeholder="Article Description"]'
    ).value;
    const date = document.querySelector('[type="date"]').value;
    const image = document.querySelector("#image2").value;

    let blogList;
    if (localStorage.getItem("blogList") === null) {
      blogList = [];
    } else {
      blogList = JSON.parse(localStorage.getItem("blogList"));
    }
    blogList.push({
      title,
      author,
      description,
      date,
      image,
    });
    localStorage.setItem("blogList", JSON.stringify(blogList));

    setTimeout(() => {
      popup.innerText = "Data Added Successfully!";
      modal15.showModal();
    }, 2000);
    location.reload();
    showData();

    document.querySelector('[placeholder="Article Title"]').value = "";
    document.querySelector('[placeholder="Article Author"]').value = "";
    document.querySelector('[placeholder="Article Description"]').value = "";
    document.querySelector('[type="date"]').value = "";
    document.querySelector("#image2").value = "";

    // alert("Data Added Successfully");
  };

  const deleteArticle = function (index) {
    let blogList = JSON.parse(localStorage.getItem("blogList")) || [];
    let publishList = JSON.parse(localStorage.getItem("publishList")) || [];

    blogList.splice(index, 1);
    publishList.splice(index, 1);
    localStorage.setItem("blogList", JSON.stringify(blogList));
    localStorage.setItem("publishList", JSON.stringify(publishList));

    location.reload();
    showData();
    alert("Data Deleted Successfully");
  };

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-blog")) {
      modal8.showModal();
    }
    if (event.target.classList.contains("edit-blog")) {
      modal3.showModal();
    }
  });

  const updateArticle = function (index) {
    let blogList;
    if (localStorage.getItem("blogList") === null) {
      blogList = [];
    } else {
      blogList = JSON.parse(localStorage.getItem("blogList"));
    }

    document.querySelector('[type="search"]').value = blogList[index].title;
    document.querySelector('[placeholder="Title"]').value =
      blogList[index].title;
    document.querySelector('[placeholder="Author"]').value =
      blogList[index].author;
    document.querySelector('[placeholder="Textarea"]').value =
      blogList[index].description;
    document.querySelector("#date2").value = blogList[index].date;
    document.querySelector("#image2").value = blogList[index].image;

    button2.addEventListener("click", function (index) {
      blogList[index].title = document.querySelector('[type="search"]').value;
      blogList[index].title = document.querySelector(
        '[placeholder="Title"]'
      ).value;
      blogList[index].author = document.querySelector(
        '[placeholder="Author"]'
      ).value;
      blogList[index].description = document.querySelector(
        '[placeholder="Textarea"]'
      ).value;
      blogList[index].date = document.querySelector("#date2").value;
      blogList[index].image = document.querySelector("#image2").value;

      localStorage.setItem("blogList", JSON.stringify(blogList));
      location.reload();
      showData();

      document.querySelector('[placeholder="Article Title"]').value = "";
      document.querySelector('[placeholder="Author"]').value = "";
      document.querySelector('[placeholder="Textarea"]').value = "";
      document.querySelector("#date2").value = "";
      document.querySelector("#image2").value = "";
      alert("Data Updated Successfully");
    });
  };

  buttonEl.addEventListener("click", addArticle);

  cancelBtn.addEventListener("click", function () {
    modal8.close();
  });

  const publishArt = function (index) {
    let blogList;
    let publishList = [];
    if (localStorage.getItem("blogList") === null) {
      blogList = [];
    } else {
      blogList = JSON.parse(localStorage.getItem("blogList"));
    }
    publishList.push(blogList[index]);

    localStorage.setItem("publishList", JSON.stringify(publishList));
  };
});
