async function addRent(roomNumber, amount, month) {
  try {
    const res = await fetch("http://localhost:5000/api/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ roomNumber, amount, month })
    });

    if (!res.ok) throw new Error("Failed to add rent");

    alert("✅ Rent Added");

  } catch (err) {
    alert("❌ " + err.message);
  }
}
