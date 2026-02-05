const API = "http://localhost:5000/api";

/* =========================
   ADD NOTICE (ADMIN ONLY)
========================= */
async function addNotice() {
  try {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
      return showMessage("Please fill all fields", "error");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      showMessage("Login required", "error");
      setTimeout(()=> window.location.href="index.html",1000);
      return;
    }

    const res = await fetch(`${API}/notices`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        title,
        content
      })
    });

    const data = await res.json();

    if(!res.ok){
      throw new Error(data.message || "Failed to publish notice");
    }

    showMessage("Notice published successfully","success");

    document.getElementById("title").value="";
    document.getElementById("content").value="";

    loadNotices();

  } catch(err){
    console.error(err);
    showMessage(err.message,"error");
  }
}

/* =========================
   LOAD NOTICES
========================= */
async function loadNotices(){
  const list=document.getElementById("noticeList");

  if(!list) return;

  try{
    list.innerHTML="<p>Loading notices...</p>";

    const res=await fetch(`${API}/notices`);
    const notices=await res.json();

    if(!res.ok){
      throw new Error("Failed to fetch notices");
    }

    list.innerHTML="";

    if(!notices.length){
      list.innerHTML="<p>No notices available</p>";
      return;
    }

    notices.forEach(n=>{
      const card=document.createElement("div");
      card.className="notice-card";

      card.innerHTML=`
        <h3>${n.title}</h3>
        <p>${n.content}</p>
        <span class="notice-date">
          ${new Date(n.createdAt).toLocaleDateString()}
        </span>
      `;

      list.appendChild(card);
    });

  }catch(err){
    console.error(err);
    list.innerHTML="<p>Failed to load notices</p>";
  }
}

/* =========================
   TOAST MESSAGE
========================= */
function showMessage(text,type){
  const msg=document.createElement("div");
  msg.className=`msg ${type}`;
  msg.innerText=text;

  document.body.appendChild(msg);

  setTimeout(()=>msg.remove(),2500);
}

/* =========================
   AUTO LOAD
========================= */
document.addEventListener("DOMContentLoaded",loadNotices);
