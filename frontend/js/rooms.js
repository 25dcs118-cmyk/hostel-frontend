const API = "http://localhost:5000/api/rooms";

const addForm = document.getElementById("addRoomForm");
const roomList = document.getElementById("roomList");
const roomSelect = document.getElementById("roomSelect");

/* LOAD ROOMS */
async function loadRooms() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (!data.success) throw new Error();

    roomList.innerHTML = "";
    roomSelect.innerHTML = "";

    data.data.forEach(r => {

      const li = document.createElement("li");
      li.textContent =
        `Room ${r.number} | Capacity ${r.capacity} | ${r.status}`;
      roomList.appendChild(li);

      if (r.status === "available") {
        const opt = document.createElement("option");
        opt.value = r._id;
        opt.textContent = "Room " + r.number;
        roomSelect.appendChild(opt);
      }

    });

  } catch {
    alert("Failed to fetch data");
  }
}

/* ADD ROOM */
addForm.addEventListener("submit", async e => {
  e.preventDefault();

  const number = document.getElementById("number").value.trim();
  const capacity = parseInt(
    document.getElementById("capacity").value
  );

  if (!number || !capacity) {
    alert("Enter valid data");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        number,
        capacity
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    addForm.reset();
    loadRooms();

  } catch {
    alert("Failed to create");
  }
});

/* BOOK ROOM */
document.getElementById("bookBtn")
.addEventListener("click", async () => {

  const id = roomSelect.value;
  if (!id) return alert("Select room");

  await fetch(API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: "occupied"
    })
  });

  loadRooms();
});

loadRooms();
