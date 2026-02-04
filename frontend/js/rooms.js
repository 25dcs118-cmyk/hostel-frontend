async function addRoom() {
  try {
    const number = document.getElementById("roomNumber").value;
    const capacity = document.getElementById("capacity").value;

    const res = await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ number, capacity })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    alert("✅ Room Added");
    loadRooms();

  } catch (err) {
    alert("❌ " + err.message);
  }
}
