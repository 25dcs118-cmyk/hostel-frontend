// ======================
// AUTH SYSTEM (IMPROVISED)
// ======================

/* LOGIN */
function login(){

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const users = {
    admin:{password:"admin123",role:"admin"},
    tenant:{password:"tenant123",role:"tenant"}
  };

  if(!users[username]){
    alert("User not found");
    return;
  }

  if(users[username].password !== password){
    alert("Wrong password");
    return;
  }

  if(users[username].role !== role){
    alert("Role mismatch");
    return;
  }

  const session={
    username,
    role,
    loginTime:Date.now()
  };

  localStorage.setItem("session",JSON.stringify(session));

  setTimeout(()=>{
    window.location.href="dashboard.html";
  },100);
}

/* LOGOUT */
function logout(){
  localStorage.removeItem("session");
  window.location.href="index.html";
}

/* AUTH GUARD */
function requireAuth(){

  const raw = localStorage.getItem("session");

  if(!raw){
    window.location.href="index.html";
    return;
  }

  try{
    const session = JSON.parse(raw);

    if(!session.username || !session.role){
      throw "Invalid session";
    }

  }catch(err){
    localStorage.removeItem("session");
    window.location.href="index.html";
  }
}
