import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY || "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, algorithm } = req.body || {};

    if (!message || !algorithm) {
        return res.status(400).json({ error: 'Missing message or algorithm' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
                {
                    role: "system",
                    content: `You are an expert Algorithms Tutor. 
                    The user is asking a question about the "${algorithm}" algorithm.
                    
                    STRICT RULES:
                    1. Answer ONLY questions related to "${algorithm}" or general computer science concepts directly relevant to it.
                    2. If the user asks about a different topic (e.g., "What is the capital of France?", "How to bake a cake", or another algorithm not relevant here), politely decline and say: "Please ask only about this algorithm."
                    3. Explain concepts clearly and simply, suitable for a beginner to intermediate student.
                    4. Include time and space complexity if relevant to the question.
                    5. Keep your answer concise (under 200 words) unless a detailed explanation is specifically requested.
                    6. Do not include conversational filler like "Hello" or "I hope this helps". Get straight to the answer.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
        });

        const answer = completion.choices[0]?.message?.content || "No response received.";
        return res.status(200).json({ answer });

    } catch (error: any) {
        console.error('AI Error:', error);
        return res.status(500).json({
            error: 'Failed to get answer from AI',
            details: error?.message || "Unknown error"
        });
    }
}
