// ======================
// API CONFIG
// ======================

const BASE_URL = "http://localhost:5000/api";

// Get auth token (future-proof)
function getToken() {
  const session = JSON.parse(localStorage.getItem("session"));
  return session ? session.token : null;
}

// Common headers
function getHeaders() {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ======================
// GENERIC API METHODS
// ======================

async function getAll(resource) {
  try {
    const res = await fetch(`${BASE_URL}/${resource}`, {
      headers: getHeaders()
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return await res.json();
  } catch (err) {
    alert(err.message);
    return [];
  }
}

async function create(resource, data) {
  try {
    const res = await fetch(`${BASE_URL}/${resource}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to create");

    return await res.json();
  } catch (err) {
    alert(err.message);
  }
}

async function update(resource, id, data) {
  try {
    const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Update failed");

    return await res.json();
  } catch (err) {
    alert(err.message);
  }
}

async function remove(resource, id) {
  try {
    const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });

    if (!res.ok) throw new Error("Delete failed");

    return await res.json();
  } catch (err) {
    alert(err.message);
  }
}

// ======================
// DOMAIN HELPERS
// ======================

// ROOMS
async function addRoom() {
  const number = document.getElementById("roomNumber").value;
  const capacity = document.getElementById("capacity").value;

  if (!number || !capacity) return alert("Fill all fields");

  await create("rooms", { number, capacity });
  location.reload();
}

async function bookRoom() {
  const roomId = document.getElementById("selectRoom").value;
  if (!roomId) return alert("Select a room");

  await create("bookings", { roomId });
  alert("Room booked successfully");
  location.reload();
}

// RENT
async function addRent() {
  const room = document.getElementById("room").value;
  const amount = document.getElementById("amount").value;
  const month = document.getElementById("month").value;

  if (!room || !amount || !month) return alert("Fill all fields");

  await create("rent", { room, amount, month });
  location.reload();
}

// COMPLAINTS
async function addComplaint() {
  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;

  if (!subject || !description) return alert("Fill all fields");

  await create("complaints", { subject, description });
  alert("Complaint submitted");
  location.reload();
}

// NOTICES
async function addNotice() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) return alert("Fill all fields");

  await create("notices", { title, content });
  location.reload();
}
