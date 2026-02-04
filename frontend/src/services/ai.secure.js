// src/services/ai.secure.js
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function getAIResponse(input) {
  try {
    const r = await fetch(`${API_BASE}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!r.ok) {
      // Try to parse server error json; fallback to text
      let detail = "";
      try { const j = await r.json(); detail = j?.details || j?.message || ""; }
      catch { detail = await r.text().catch(() => ""); }
      const msg = `AI request failed (${r.status}). ${detail || "Please try again."}`;
      throw new Error(msg);
    }

    return await r.json();
  } catch (err) {
    // Normalize network errors
    const msg = err?.message || "Network error";
    throw new Error(msg);
  }
}
