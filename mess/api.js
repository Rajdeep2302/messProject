const IS_PROD = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
const API_BASE = IS_PROD 
    ? "https://aquamonitor-wmlb.onrender.com/api/water" 
    : "http://localhost:8080/api/water";

console.log("Environment Detect:", IS_PROD ? "Production" : "Local", API_BASE);

/* GET ALL ENTRIES */
async function fetchAllEntries() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
}

/* GET ENTRIES BY MONTH */
async function fetchEntriesByMonth(year, month) {
  const res = await fetch(`${API_BASE}/${year}/${month}`);
  if (!res.ok) throw new Error("Failed to fetch month data");
  return res.json();
}

/* ADD ENTRY */
async function addEntry(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add entry");
  return res.json();
}

/* UPDATE ENTRY */
async function updateEntry(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update entry");
  return res.json();
}
