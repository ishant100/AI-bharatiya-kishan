// // src/services/ai.js
// // Client that calls our own backend proxy.
// const API_URL = '/api/ai';

// export async function getAIResponse(input) {
//   // The body is now just the raw input. The proxy will handle the rest.
//   const body = input;

//   const res = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       // Authorization header is removed. The proxy will add the API key.
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });

//   if (!res.ok) {
//     const errText = await res.text().catch(() => '');
//     const defaultError = 'The AI request failed. Please check the server logs.';
//     // Try to parse the error from the proxy
//     try {
//       const jsonError = JSON.parse(errText);
//       return {
//         response: jsonError.error || jsonError.details || defaultError,
//         confidence: 0,
//       };
//     } catch {
//       return {
//         response: defaultError,
//         confidence: 0,
//       };
//     }
//   }

//   const data = await res.json();

//   const text = data?.response || 'Sorry, I could not generate a response.';
//   const confidence = data?.confidence || 0;

//   return { response: text, confidence };
// }
// export * from "./ai.secure";


// src/services/ai.js
// Client that calls backend AI safely

const API_URL =`${import.meta.env.VITE_BACKEND_URL}/api/ai`;

export async function getAIResponse(input) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    // 🔥 read text first (IMPORTANT FIX)
    const text = await res.text();

    // if backend sleeping → empty response
    if (!text || text.trim() === "") {
      return {
        response: "⚠️ Server waking up... try again in few seconds",
        confidence: 0,
      };
    }

    // try parsing JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON from server:", text);
      return {
        response: "⚠️ Server error. Please try again.",
        confidence: 0,
      };
    }

    // if backend returned error
    if (!res.ok) {
      return {
        response:
          data?.error ||
          data?.details ||
          "⚠️ AI request failed. Check backend logs.",
        confidence: 0,
      };
    }

    return {
      response:
        data?.response || "Sorry, I could not generate a response.",
      confidence: data?.confidence || 0,
    };

  } catch (error) {
    console.error("AI fetch error:", error);
    return {
      response: "⚠️ Server unreachable or sleeping. Try again.",
      confidence: 0,
    };
  }
}

export * from "./ai.secure";
