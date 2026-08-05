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
- If a question is NOT about this project — including random text, greetings, jokes, math problems, or any off-topic message — respond with exactly this text and nothing else: 'I Have No Answers'
- If you cannot answer a question with 100% confidence using only the knowledge base above, respond with exactly this text and nothing else: 'I Have No Answers'
- Never improvise, apologize, explain, or add any extra words when the question is off-topic. The response must be exactly 'I Have No Answers' and nothing else.
- Answer in simple, friendly, non-technical language that any visitor can understand. Imagine you are explaining to a friend who is not a developer.
- Keep answers short and clear. Avoid jargon like API, localStorage, HTTP, Bootstrap, or React unless the visitor explicitly asks about the technical side.
- Be concise and accurate. Use the project information above as your single source of truth.
- Do not make up information that is not in the knowledge base above.`;

export const NO_ANSWER_MARKER = "I Have No Answers";

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
