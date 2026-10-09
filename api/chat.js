// Vercel serverless function: Justice AI powered by the OpenAI Responses API.
// Keep OPENAI_API_KEY in Vercel Project Settings > Environment Variables.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST for chat." });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "The website owner still needs to add OPENAI_API_KEY in Vercel Settings > Environment Variables." });
  try {
    const { messages, image, studentName } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: "Please enter a question first." });
    const input = messages.slice(-18).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: [{ type: "input_text", text: String(m.text || "").slice(0, 12000) }] }));
    if (image && typeof image === "string" && /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(image)) {
      const lastUser = [...input].reverse().find(m => m.role === "user");
      if (lastUser) lastUser.content.push({ type: "input_image", image_url: image });
    }
    const instructions = `You are Justice AI, a friendly, patient, encouraging AI assistant on the Great Dormass student website in Ghana. The student's name may be ${String(studentName || "student").slice(0,80)}. Be warm and conversational, like a helpful tutor and supportive friend. Answer a wide range of reasonable questions: school subjects, mathematics, science, English, writing, coding, technology, research, general knowledge, everyday questions, planning and creative work. Explain step by step in clear language suited to the learner. Be accurate, distinguish facts from guesses, and say when unsure. For Great Dormass-specific or current facts you cannot verify, do not invent details; say so and suggest checking official sources. If an image is attached, inspect it and help with what is visible. Encourage learning rather than judging. Do not claim to be human, a teacher, or school staff. Follow safety rules. You cannot literally know everything; when you do not know, be honest and offer the best safe next step.`;
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const upstream = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model, instructions, input, max_output_tokens: 1200 }) });
    const payload = await upstream.json();
    if (!upstream.ok) return res.status(502).json({ error: payload?.error?.message || "The AI provider returned an error." });
    const answer = (payload.output || []).flatMap(item => item.content || []).filter(part => part.type === "output_text").map(part => part.text).join("\n").trim();
    if (!answer) return res.status(502).json({ error: "The AI returned an empty answer. Please try again." });
    return res.status(200).json({ answer });
  } catch (error) { return res.status(500).json({ error: "Server error while contacting the AI. Please try again." }); }
}
