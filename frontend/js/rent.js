const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Session expired. Please login again.");
  window.location.href = "index.html";
}

/* ===========================
   LOAD RENT RECORDS
=========================== */
async function loadRents() {
  try {
    const res = await fetch(`${API}/rents`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Failed to fetch rent data");

    const rents = await res.json();

    const container = document.getElementById("rentList");
    if (!container) return;

    container.innerHTML = rents.map(r => `
      <div class="rent-card">
        <strong>Room:</strong> ${r.roomNumber}<br>
        <strong>Amount:</strong> ₹${r.amount}<br>
        <strong>Month:</strong> ${r.month}
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
    alert("Failed to fetch data");
  }
}

/* ===========================
   ADD RENT
=========================== */
async function addRent() {
  try {
    const roomNumber = document.getElementById("roomNumber").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const month = document.getElementById("month").value.trim();

    if (!roomNumber || !amount || !month) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(`${API}/rents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        roomNumber,
        amount: Number(amount),
        month
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create");
      return;
    }

    alert("Rent Added Successfully");

    document.getElementById("roomNumber").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("month").value = "";

    loadRents();

  } catch (err) {
    console.error(err);
    alert("Server connection error");
  }
}

/* ===========================
   AUTO LOAD
=========================== */
document.addEventListener("DOMContentLoaded", loadRents);
