const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function fetchAiResponse(
  messages: ChatMessage[],
): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI API request failed: ${response.status} ${errText}`);
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "";
}
