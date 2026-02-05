// src/services/ai.js
// Client that calls our own backend proxy.
const API_URL = '/api/ai';

export async function getAIResponse(input) {
  // The body is now just the raw input. The proxy will handle the rest.
  const body = input;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      // Authorization header is removed. The proxy will add the API key.
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    const defaultError = 'The AI request failed. Please check the server logs.';
    // Try to parse the error from the proxy
    try {
      const jsonError = JSON.parse(errText);
      return {
        response: jsonError.error || jsonError.details || defaultError,
        confidence: 0,
      };
    } catch {
      return {
        response: defaultError,
        confidence: 0,
      };
    }
  }

  const data = await res.json();

  const text = data?.response || 'Sorry, I could not generate a response.';
  const confidence = data?.confidence || 0;

  return { response: text, confidence };
}
export * from "./ai.secure";
