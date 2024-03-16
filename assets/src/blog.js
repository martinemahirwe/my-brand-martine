
let loggedAdmin = localStorage.getItem("tokenAdmin");

if (loggedAdmin === null) {
  window.location.href = "./login.html";
}

document.addEventListener("DOMContentLoaded",()=>{
const modal15 = document.querySelector("#modall15");
const popup = document.querySelector(".popup");
const body = document.querySelector("body");
const button2 = document.querySelector(".art-button1");
const modal8 = document.querySelector("#modal8");
const modal7 = document.querySelector("#modal7");
const elem7 = document.querySelector("#element7 .num");
const modal3 = document.querySelector("#modal3");
const cancelBtn = document.querySelector(".btn-cancel");


const addArtBtn = document.getElementById("addArticles")

addArtBtn.addEventListener("click",addArticle);

async function addArticle() {
  const title = document.querySelector('[placeholder="Article Title"]').value;
  const author = document.querySelector(
    '[placeholder="Article Author"]'
  ).value;
  const description = document.querySelector(
    '[placeholder="Article Description"]'
  ).value;
  const date = document.querySelector('[type="date"]').value;
  const image = document.querySelector("#image2").value;

  try {
   
    const response = await fetch(
      "https://my-brand-martine-backendapis.onrender.com/blogs/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("tokenAdmin")
        },
        body: JSON.stringify({
          title,
          author,
          publishedDate: date,
          shortDescript: description.substr(0, 100),
          description,
          imageLink: image,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add article");
    }

    const responseData = await response.json();
    console.log(responseData);

     popup.innerText = "Data Added Successfully!";
     modal15.showModal();
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.error("Error adding article:", error.message);
  }
};


  const showData = async function () {
    let bloghtml = "";
    try {
      const response = await fetch(
        "https://my-brand-martine-backendapis.onrender.com/blogs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("tokenAdmin")
          }
        }
      );
      const blogList = await response.json();
     
  
      if (!response.ok) {
        throw new Error("Failed to load messages");
      }
      if(blogList){
       console.log(blogList)
  
    for(let i = 0;i < blogList.length;i++){
      let index = blogList[i]._id;
      bloghtml += `
      <div class="blog">
        <h4>${blogList[i].title}</h4>
        <div class="image-div">
         <img src="${blogList[i].image}"alt="Blog Image">
        </div>
        <p data-key="${blogList[i].publishedDate}"><strong>Written Date:</strong> ${blogList[i].publishedDate}</p>
        <p><strong>Author:</strong> ${blogList[i].author}</p>
        <p><strong>shortDescrption:</strong>${blogList[i].shortDescript}</p>
        <p><strong>isPublished:</strong>${blogList[i].isPublished}</p>
        <div class="actions">
          <button class="delete-blog" data-key="${index}">Delete</button>
          <button class="edit-blog" data-key="${encodeURIComponent(JSON.stringify(blogList[i]) + '|' + blogList[i]._id)}" type="button">Edit</button>
          <button class="publish" data-key="${encodeURIComponent(blogList[i].title + '|' + blogList[i].publishedDate)}" type="button">Publish</button>
          </div>
        </div>
      </div>`;
    };
  }
   let dataIndex ="";
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-blog")) {
        dataIndex = e.target.dataset.key;
        console.log(dataIndex)
        modal8.showModal();
      }
      if (e.target.classList.contains("edit-blog")) {
        const dataKey = e.target.dataset.key;
        const [blog,id] = decodeURIComponent(dataKey).split('|');
        const blogT = JSON.parse(blog)
        updateArticle(id,blogT);
      }
      if (e.target.classList.contains("btn-delete")) {
       deleteArticle(dataIndex);
        modal7.showModal();
      }
      if (e.target.classList.contains("publish")) {
        const dataKey = e.target.dataset.key;
        const [title, publishedDate] = decodeURIComponent(dataKey).split('|');
        publishArt(title,publishedDate);
        e.target.classList.remove("publish");
        e.target.style.opacity = "0.5";
        e.target.textContent = "Published"
      }
    });

    elem7.textContent = blogList.length;
    const container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = bloghtml;
    modal7.appendChild(container);
  }catch (error) {
      console.error("Error fetching blogs:", error.message);
  }
  };
showData();
  
// const btnLogout = document.querySelector(".logout-btn");

cancelBtn.addEventListener("click", function () {
  modal8.close();
});

   async function deleteArticle (id) {

    const response = await fetch(
      `https://my-brand-martine-backendapis.onrender.com/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("tokenAdmin")
        },
        body: JSON.stringify({
 
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add article");
    }

    const responseData = await response.json();
    console.log(responseData);

    location.reload();
    showData();
  };

  document.addEventListener("click", function (event) {
  
    if (event.target.classList.contains("edit-blog")) {
      modal3.showModal();
    }
  });

  const updateArticle = async function (id, articleData) {
    try {
      document.querySelector('[placeholder="Title"]').value = articleData.title;
      document.querySelector('[placeholder="Author"]').value = articleData.author;
      document.querySelector('[placeholder="description"]').value = articleData.description;
      document.querySelector("#date2").value = articleData.date;
      document.querySelector("#image2").value = articleData.imageLink; // Corrected property name
  
      button2.addEventListener("click", async function () {
        const updatedArticle = {
          title: document.querySelector('[placeholder="Title"]').value,
          shortDescript: document.querySelector('[placeholder="description"]').value,
          description: document.querySelector('[placeholder="description"]').value,
          imageLink: document.querySelector("#image2").value,
          publishedDate: document.querySelector("#date2").value
        };
        
        const patchResponse = await fetch(`https://my-brand-martine-backendapis.onrender.com/blogs/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("tokenAdmin")
          },
          body: JSON.stringify(updatedArticle)
        });
  
        if (!patchResponse.ok) {
          throw new Error("Failed to update article");
        }
  
        location.reload();
        showData();

        document.querySelector('[placeholder="Article Title"]').value = "";
        document.querySelector('[placeholder="Author"]').value = "";
        document.querySelector('[placeholder="Textarea"]').value = "";
        document.querySelector("#date2").value = "";
        document.querySelector("#image2").value = "";
      });
    } catch (error) {
      console.error("Error updating article:", error.message);
    }
  };
  

  async function publishArt(title,publishedDate) {
    try {
  
      const response = await fetch(
        "https://my-brand-martine-backendapis.onrender.com/blogs/publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("tokenAdmin")
          },
          body: JSON.stringify({
            title : title,
            publishedDate : publishedDate,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to publish article");
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      showData();
      
    } catch (error) {
      console.error("Error publishing article:", error.message);
    }
  };
  

  const logoutFunction = () => {
    localStorage.removeItem("tokenAdmin");
    window.location.href = "../index.html";
    
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-btn")) {
      logoutFunction();
    }
  });

  });
