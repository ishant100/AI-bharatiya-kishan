// src/lib/agmarknet.ts




const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE = "https://api.data.gov.in/resource";

const key = import.meta.env.VITE_DATA_GOV_API_KEY;

function toISO(d) {
  const [dd, mm, yyyy] = d.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

export async function fetchPrices(q) {
  if (!key) throw new Error("Missing VITE_DATA_GOV_API_KEY");

  const limit = q.limit ?? 500;
  const offset = q.offset ?? 0;

  const params = new URLSearchParams({
    "api-key": key,
    format: "json",
    limit: String(limit),
    offset: String(offset),
  });

  // IMPORTANT: use filters[FIELD]=VALUE — this is what data.gov.in expects
  const filterPairs = [
    ["commodity", q.commodity],
    ["state", q.state],
    ["district", q.district],
    ["market", q.market],
    ["variety", q.variety],
    ["grade", q.grade],
  ];
  for (const [field, value] of filterPairs) {
    if (value && value.trim().length) {
      params.append(`filters[${field}]`, value.trim());
    }
  }

  const url = `${BASE}/${RESOURCE_ID}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`AGMARKNET error: ${res.status} ${text}`.trim());
  }
  const data = await res.json();
  const records = data.records ?? [];

  // Client-side date filter (inclusive)
  let filtered = records;
  if (q.from || q.to) {
    filtered = records.filter(r => {
      const iso = toISO(r.arrival_date);
      return (!q.from || iso >= q.from) && (!q.to || iso <= q.to);
    });
  }
  return filtered;
}

// Helpers
export function groupByDateAverageModal(rows) {
  const map = new Map();
  for (const r of rows) {
    const iso = toISO(r.arrival_date);
    const modal = Number(r.modal_price || 0);
    if (!map.has(iso)) map.set(iso, { sum: 0, n: 0 });
    const v = map.get(iso);
    v.sum += modal;
    v.n += 1;
  }
  return [...map.entries()]
    .map(([date, { sum, n }]) => ({ date, modal_avg: n ? sum / n : 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function pctChange(curr, prev) {
  if (!isFinite(curr) || !isFinite(prev) || prev === 0) return null;
  return ((curr - prev) / prev) * 100;
}
