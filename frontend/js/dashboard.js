// ======================
// DASHBOARD LOGIC
// ======================

// Auth guard (extra safety)
const session = JSON.parse(localStorage.getItem("session"));
if (!session) {
  window.location.replace("index.html");
}

// Set dashboard title
const titleEl = document.getElementById("title");
titleEl.innerText = session.role.toUpperCase() + " DASHBOARD";

// Menu configuration
const menus = {
  admin: [
    { name: "Rooms", link: "rooms.html", icon: "🏠" },
    { name: "Rent", link: "rent.html", icon: "💰" },
    { name: "Complaints", link: "complaints.html", icon: "🛠️" },
    { name: "Notices", link: "notices.html", icon: "📢" }
  ],
  tenant: [
    { name: "Rooms", link: "rooms.html", icon: "🏠" },
    { name: "Rent", link: "rent.html", icon: "💰" },
    { name: "Complaints", link: "complaints.html", icon: "🛠️" },
    { name: "Notices", link: "notices.html", icon: "📢" }
  ]
};

// Render menu
const menuContainer = document.getElementById("menu");
menus[session.role].forEach(item => {
  const card = document.createElement("a");
  card.className = "box";
  card.href = item.link;
  card.innerHTML = `
    <div style="font-size:32px">${item.icon}</div>
    <div style="margin-top:10px;font-weight:600">${item.name}</div>
  `;
  menuContainer.appendChild(card);
});

// Prevent browser back navigation
history.pushState(null, null, location.href);
window.onpopstate = function () {
  window.location.replace("dashboard.html");
};
