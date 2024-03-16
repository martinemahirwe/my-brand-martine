document.addEventListener("DOMContentLoaded", function () {
  const element6 = document.querySelector("#element6 .num");
  const elem6 = document.querySelector("#element6");

  const modal9 = document.querySelector("#modal9");
  const modal6 = document.querySelector("#modal6");
  const btn9 = document.querySelector(".close-icon6");

  async function getAllUsers(){

  try {
    const response = await fetch(
      "https://my-brand-martine-backendapis.onrender.com/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("tokenAdmin")
        }
      }
    );
    let userList = await response.json();
    console.log(userList);
    element6.innerHTML = userList.length;

    if (!response.ok) {
      throw new Error("Failed to load users");
    }
    if(userList){
    let html = "";
  for(let i=0; i< userList.length; i++){
    html += `
<div class="grid">
  <div class="cell header">${i + 1}</div>
  <div class="cell cell1">${userList[i].email}</div>
  <div class="cell cell1">${userList[i].userRole}</div>
  <span class="cell cell1 delete-user" data-key= ${userList[i]._id}> &#x1F5D1;</span>
</div>
`;
  };
const divUsers = document.createElement("div");

divUsers.innerHTML = html;
modal9.appendChild(divUsers);
    
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("delete-user")){
    const userId = e.target.dataset.key;
    deleteUserById(userId);
  }
})
}
  }
  catch (error) {
    console.error("Error fetching users:", error.message);
};
  };
  getAllUsers();

  elem6.addEventListener("click", function () {
    modal9.showModal();
  });
  btn9.addEventListener("click", function () {
    modal9.close();
  });

  async function deleteUserById(userId) {
    try {
      const response = await fetch(`https://my-brand-martine-backendapis.onrender.com/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("tokenAdmin")
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      console.log("User deleted successfully");
     location.reload();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  }
  

  const logoutFunction = (e) => {
    localStorage.removeItem("loggedAdmin");
    window.location.href = "../index.html";
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout")) {
      logoutFunction();
      modal6.classList.add("hidden");
    }
  });
});
