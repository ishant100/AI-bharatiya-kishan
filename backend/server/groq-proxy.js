// groq-proxy.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js";


// If Node < 18, uncomment these 2 lines and run: npm i node-fetch@3
// // @ts-ignore
 import fetch from "node-fetch";
connectDB().catch(err => {
  console.error("MongoDB connection failed:", err);
  process.exit(1); // force crash so Render shows error
});

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://kishan-ai-frontend.onrender.com"
  ],
  credentials: true,
}));

//app.use(express.json());
app.use(express.json({ limit: "5mb" }));
app.use("/api/auth", authRoutes);


//
app.get("/", (_req, res) => {
  res.json({ status: "Backend running" });
});

// -------------------------------
// Health
// -------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// -------------------------------
// GROQ Chat Completions Proxy
// -------------------------------
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";


app.post("/api/ai", async (req, res) => {
  try {
    console.log("[/api/ai] incoming", { hasKey: !!process.env.GROQ_API_KEY });

    const { type, content, imageUrl } = (req.body ?? {});
    const model =
      (type === "image"
        ? process.env.GROQ_VISION_MODEL
        : process.env.GROQ_MODEL) || "llama-3.1-8b-instant";

    const messages = [
      {
        role: "system",
        content:
          "You are an agriculture assistant for Indian farmers. Be concise, practical, and safe.",
      },
    ];

    if (type === "image" && imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: content || "Analyze this crop image and help." },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      });
    } else {
      messages.push({ role: "user", content: content || "" });
    }

    const r = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.4 }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("[/api/ai] groq_error", r.status, errText);
      return res.status(r.status).json({ error: "groq_error", details: errText });
    }

    const data = await r.json();
    const text =
      data?.choices?.[0]?.message?.content?.toString()?.trim() ||
      "Sorry, I could not generate a response.";
    const confidence = 85;
    res.json({ response: text, confidence });
  } catch (e) {
    console.error("[/api/ai] server_error", e);
    res.status(500).json({ error: "server_error", message: e?.message || String(e) });
  }
});

// -------------------------------
// AGMARKNET (data.gov.in) Proxy
// -------------------------------
const DATA_API_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

/** Convert DD/MM/YYYY -> YYYY-MM-DD */
function toISO(d) {
  const [dd, mm, yyyy] = d.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

app.get("/api/prices", async (req, res) => {
  try {
    const apiKey =
      process.env.DATA_GOV_API_KEY ||
      process.env.VITE_DATA_GOV_API_KEY || // fallback if only client var set
      "";

    if (!apiKey) {
      return res.status(400).json({ error: "missing_api_key" });
    }

    const {
      commodity,
      state,
      district,
      market,
      variety,
      grade,
      from,
      to,
      limit = "500",
      offset = "0",
    } = req.query;

    const qs = new URLSearchParams({
      "api-key": apiKey,
      format: "json",
      limit: String(limit),
      offset: String(offset),
    });

    // IMPORTANT: data.gov.in expects filters as filters[FIELD]=value
    const filters = [
      ["commodity", commodity],
      ["state", state],
      ["district", district],
      ["market", market],
      ["variety", variety],
      ["grade", grade],
    ];
    for (const [field, value] of filters) {
      if (value && value.trim()) {
        qs.append(`filters[${field}]`, value.trim());
      }
    }

    const url = `${DATA_API_URL}?${qs.toString()}`;
    const r = await fetch(url);
    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      console.error("[/api/prices] ogd_error", r.status, errText);
      return res.status(r.status).json({ error: "ogd_error", details: errText });
    }

    const data = await r.json();
    let rows = Array.isArray(data?.records) ? data.records : [];

    // Optional server-side date filtering (inclusive)
    if (from || to) {
      rows = rows.filter((row) => {
        const iso = toISO(String(row.arrival_date));
        return (!from || iso >= from) && (!to || iso <= to);
      });
    }

    res.json({ records: rows });
  } catch (e) {
    console.error("[/api/prices] server_error", e);
    res.status(500).json({ error: "server_error", message: e?.message || String(e) });
  }
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "server_error" });
});


// -------------------------------
// Start server
// -------------------------------
//const port = Number(process.env.PORT || 8787 ||8080);
const port = Number(process.env.PORT || 8787);

app.listen(port, () => {
  console.log(`[groq-proxy] listening on http://localhost:${port}`);
});
