const API = "http://localhost:5000/api";

/* =========================
   ADD COMPLAINT
========================= */
async function addComplaint() {
  try {
    const subject = document.getElementById("subject").value.trim();
    const description = document.getElementById("text").value.trim();

    if (!subject || !description) {
      return showMessage("Please fill all fields", "error");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      showMessage("Login required", "error");
      setTimeout(() => window.location.href = "index.html", 1000);
      return;
    }

    const res = await fetch(`${API}/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        subject,
        description
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Complaint submission failed");
    }

    showMessage("Complaint submitted successfully", "success");

    document.getElementById("subject").value = "";
    document.getElementById("text").value = "";

    loadComplaints();

  } catch (err) {
    console.error(err);
    showMessage(err.message || "Server error", "error");
  }
}

/* =========================
   LOAD COMPLAINTS
========================= */
async function loadComplaints() {
  const list = document.getElementById("complaintList");

  if (!list) return;

  try {
    list.innerHTML = `<p>Loading complaints...</p>`;

    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/complaints`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const complaints = await res.json();

    if (!res.ok) {
      throw new Error("Failed to load complaints");
    }

    list.innerHTML = "";

    if (!complaints.length) {
      list.innerHTML = `<p>No complaints submitted</p>`;
      return;
    }

    complaints.forEach(c => {
      const card = document.createElement("div");
      card.className = "complaint-card";

      card.innerHTML = `
        <h3>${c.subject}</h3>
        <p>${c.description}</p>
        <span class="status">${c.status || "Pending"}</span>
      `;

      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = `<p>Failed to load complaints</p>`;
  }
}

/* =========================
   MESSAGE TOAST
========================= */
function showMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `msg ${type}`;
  msg.innerText = text;

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 2500);
}

/* =========================
   AUTO LOAD
========================= */
document.addEventListener("DOMContentLoaded", loadComplaints);
