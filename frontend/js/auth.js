// ======================
// AUTHENTICATION LOGIC
// ======================

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const r = document.getElementById("role").value;

  // Demo users (temporary – will move to backend later)
  const users = {
    admin: { password: "admin123", role: "admin" },
    tenant: { password: "tenant123", role: "tenant" }
  };

  if (!users[u]) {
    alert("User does not exist");
    return;
  }

  if (users[u].password !== p || users[u].role !== r) {
    alert("Invalid credentials or role mismatch");
    return;
  }

  // Store session
  const session = {
    username: u,
    role: r,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem("session", JSON.stringify(session));

  // Prevent back navigation to login
  window.location.replace("dashboard.html");
}

// ======================
// LOGOUT
// ======================

function logout() {
  localStorage.removeItem("session");
  window.location.replace("index.html");
}

// ======================
// AUTH GUARD (use on protected pages)
// ======================

function requireAuth() {
  const session = localStorage.getItem("session");
  if (!session) {
    window.location.replace("index.html");
  }
}
