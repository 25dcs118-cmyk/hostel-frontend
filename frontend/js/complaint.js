async function addComplaint(text) {
  try {
    const res = await fetch("http://localhost:5000/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ text })
    });

    if (!res.ok) throw new Error("Complaint failed");

    alert("✅ Complaint Sent");

  } catch (err) {
    alert("❌ " + err.message);
  }
}
