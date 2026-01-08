const API_BASE = "http://localhost:8080/api/water";

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
