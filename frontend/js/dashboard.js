const API = "http://localhost:5000/api";

/* =========================
   AUTH CHECK
========================= */
function getSession(){
  const raw = localStorage.getItem("session");

  if(!raw){
    window.location.href="index.html";
    return null;
  }

  try{
    const session = JSON.parse(raw);

    if(!session.username || !session.role){
      throw "Invalid session";
    }

    return session;

  }catch(err){
    localStorage.removeItem("session");
    window.location.href="index.html";
    return null;
  }
}

const session = getSession();
if(!session) throw "No session";


/* =========================
   LOAD DASHBOARD STATS
========================= */
async function loadStats(){

  try{

    /* ROOMS */
    const roomRes = await fetch(`${API}/rooms`);
    const rooms = await roomRes.json();
    document.getElementById("roomCount").innerText = rooms.length;

    /* COMPLAINTS */
    const compRes = await fetch(`${API}/complaints`);
    const complaints = await compRes.json();
    document.getElementById("complaintCount").innerText = complaints.length;

    /* RENT */
    const rentRes = await fetch(`${API}/rent`);
    const rents = await rentRes.json();

    let totalRent = 0;
    rents.forEach(r=> totalRent += Number(r.amount));

    document.getElementById("rentCount").innerText = "₹" + totalRent;

    /* TENANTS */
    const userRes = await fetch(`${API}/users`);
    const users = await userRes.json();

    const tenants = users.filter(u => u.role === "tenant");
    document.getElementById("tenantCount").innerText = tenants.length;

  }catch(err){
    console.error("Dashboard Stats Error:",err);
  }
}


/* =========================
   LOGOUT
========================= */
function logout(){
  localStorage.removeItem("session");
  localStorage.removeItem("token");
  window.location.href="index.html";
}


/* =========================
   AUTO LOAD
========================= */
document.addEventListener("DOMContentLoaded", loadStats);
