async function addNotice(title, content) {
  try {
    const res = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ title, content })
    });

    if (!res.ok) throw new Error("Notice failed");

    alert("✅ Notice Posted");

  } catch (err) {
    alert("❌ " + err.message);
  }
}
