
if (loggedAdmin === null) {
  window.location.href = "./login.html";
}

document.addEventListener("DOMContentLoaded", () => {

  const messagesContainer = document.querySelector("#conversation");
  const replyContainer = document.querySelector("#modal5");


  const getMessages = async function () {
    try {
      const response = await fetch(
        "https://my-brand-martine-backendapis.onrender.com/messages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("tokenAdmin")
          }
        }
      );
      let messageList = await response.json();
     
  
      if (!response.ok) {
        throw new Error("Failed to load messages");
      }
      if(messageList){
    
    let messagehtml = "";
    for(i=0;i<messageList.data.length;i++){
      messagehtml += `
       <div id="conversation">
      <div class="article-data">
      <div class="person11"><div class="person">
      <img src="/assets/images/WhatsApp Image 2024-02-01 at 17.41.01.jpeg" alt="my sis profile">
      </div>
      <div class="person">
      <div class="name">
      <strong>${messageList.data[i].email}</strong>
      <big>${new Date().getHours()} hours ago</big>
      </div>
      <div class="message"><p>${messageList.data[i].message}</p>
      <div><span class="green ">reply</span>
      <span class="red">mark as read</span>
      <span class="delete delete-btn"  data-key="${messageList.data[i]._id}">Delete</span></div></div>
         </div>
       </div>
      </div>
    </div>`;
    };

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const dataKey = e.target.dataset.key;
        deleteArticle(dataKey);
      }
      if (e.target.classList.contains("green")) {
        replyContainer.showModal();
      }
    });
    const container = document.createElement("div");
    container.innerHTML = messagehtml;
    messagesContainer.appendChild(container);
  }}
    catch (error) {
      console.error("Error fetching messages:", error.message);
  };
  };

  getMessages();

  async function deleteArticle (id) {

    const response = await fetch(
      `https://my-brand-martine-backendapis.onrender.com/messages/${id}`,
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
    
  };

  const mark = document.querySelector(".read");
  mark.addEventListener("click", () => {
    this.style.innerHTML = "read";
  });
});

