const COUNTER_API = "https://doughmination.uk/v2/counter";
const SITE_ID = "is.doughmination.gay";

function plural(n, word) {
  return `${n.toLocaleString()} ${word}${n === 1 ? "" : "s"}`;
}

async function showCount() {
  const el = document.getElementById("counter");
  if (!el) return;

  let stats;
  try {
    const res = await fetch(`${COUNTER_API}/${SITE_ID}`, { method: "POST" });
    if (!res.ok) return;
    stats = await res.json();
  } catch {
    return;
  }

  if (typeof stats.unique !== "number") return;

  el.textContent = plural(stats.unique, "visitor");
  el.title = `${plural(stats.total, "visit")} · ${stats.today.toLocaleString()} today`;
  el.hidden = false;
}

showCount();
