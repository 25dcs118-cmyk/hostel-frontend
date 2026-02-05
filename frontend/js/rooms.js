const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Session expired. Please login again.");
  window.location.href = "index.html";
}

const roomList = document.getElementById("roomList");

async function loadRooms() {
  try {
    roomList.innerHTML = `<div class="loader"></div>`;

    const res = await fetch(`${API}/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const rooms = await res.json();

    if (!rooms.length) {
      roomList.innerHTML = `<p class="empty">No rooms available</p>`;
      return;
    }

    roomList.innerHTML = rooms.map(r => `
      <div class="room-card">
        <h3>Room ${r.number}</h3>
        <p><strong>Capacity:</strong> ${r.capacity}</p>
        <p><strong>Status:</strong> 
          <span class="${r.isOccupied ? 'badge red' : 'badge green'}">
            ${r.isOccupied ? "Occupied" : "Available"}
          </span>
        </p>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
    roomList.innerHTML = `<p class="error">Failed to load rooms</p>`;
  }
}

async function addRoom() {
  const number = document.getElementById("roomNumber").value.trim();
  const capacity = document.getElementById("capacity").value.trim();

  if (!number || !capacity) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        number,
        capacity: Number(capacity)
      })
    });

    if (!res.ok) throw new Error("Failed to create room");

    document.getElementById("roomNumber").value = "";
    document.getElementById("capacity").value = "";

    loadRooms();

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

document.addEventListener("DOMContentLoaded", loadRooms);
