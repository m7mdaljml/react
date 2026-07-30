import { KNOWLEDGE_BASE } from "./knowledge-base";

const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are an AI assistant for a React learning project. You ONLY have knowledge about this project. Use the following project information to answer questions:

${KNOWLEDGE_BASE}

Rules:
- ONLY answer questions related to this project's content (features, technologies, tabs, implementation details).
- If a question is NOT about this project, respond with: "My knowledge is limited to this project only. I cannot answer questions about other topics, Do you have another question?"
- Be concise and accurate. Use the project information above as your single source of truth.
- Do not make up information that is not in the knowledge base above.`;

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
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI API request failed: ${response.status} ${errText}`);
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "";
}
