/*
 * Visitor counter badge.
 *
 * POSTs to the counter on doughmination.uk, which records the visit and hands
 * back the running totals. Repeat loads from the same person inside the API's
 * 30-minute cooldown come back with counted:false and don't move the number.
 *
 * The badge starts hidden and is only revealed once we have a real figure, so
 * a slow or unreachable API leaves the page exactly as it was rather than
 * showing a broken placeholder.
 */

const COUNTER_API = "https://doughmination.uk/v2/counter";
const SITE_ID = "is.doughmination.gay";

/** "1 visitor" / "2 visitors" — the label has to agree with the number. */
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
    return; // offline, blocked, or the API is down — leave the badge hidden
  }

  if (typeof stats.unique !== "number") return;

  el.textContent = plural(stats.unique, "visitor");
  el.title = `${plural(stats.total, "visit")} · ${stats.today.toLocaleString()} today`;
  el.hidden = false;
}

showCount();
