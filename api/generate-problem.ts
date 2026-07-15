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

    const { difficulty, topic } = req.body || {};

    if (!difficulty || !topic) {
        return res.status(400).json({ error: 'Missing difficulty or topic' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-pro-1.5",
            messages: [
                {
                    role: "system",
                    content: `You are an Algorithmic Problem Generator.
                    Generate a unique coding problem scenario based on:
                    - Difficulty: ${difficulty} (Easy/Medium/Hard)
                    - Topic: ${topic}

                    The Output MUST be valid JSON with this structure:
                    {
                        "id": "string (unique)",
                        "title": "string (short catchy title)",
                        "description": "string (the problem scenario)",
                        "input": [number] (an array of numbers representing sample input usually size 10-20),
                        "optimalAlgorithm": "string (one of: bubble-sort, selection-sort, insertion-sort, merge-sort, quick-sort, linear-search, binary-search)",
                        "explanation": "string (educational explanation of why the optimal algorithm is best)",
                        "suboptimalOptions": ["string (valid but slower/worse algo IDs)"],
                        "incorrectOptions": ["string (completely wrong algo IDs)"]
                    }
                    
                    ALGORITHM IDS TO USE:
                    bubble-sort, selection-sort, insertion-sort, merge-sort, quick-sort, linear-search, binary-search
                    
                    For "sorted" or "nearly sorted" scenarios, ensure the "input" array reflects that property.`
                },
                {
                    role: "user",
                    content: `Generate a ${difficulty} difficulty problem about ${topic}.`
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error("No content generated");

        const problem = JSON.parse(content);
        return res.status(200).json(problem);

    } catch (error: any) {
        console.error('AI Generation Error:', error);
        const timestamp = Date.now();
        let fallback;

        if (topic === 'searching') {
            fallback = {
                id: `fallback-search-${timestamp}`,
                title: "Emergency Backup: Search Mission",
                description: "The AI service is unavailable. Find the number 42 in this SORTED list.",
                input: [10, 20, 30, 40, 42, 50, 60, 70, 80, 90],
                optimalAlgorithm: "binary-search",
                explanation: "Since the data is sorted, Binary Search is O(log n), much faster than Linear Search.",
                suboptimalOptions: ["linear-search"],
                incorrectOptions: ["bubble-sort", "quick-sort"]
            };
        } else {
            fallback = {
                id: `fallback-sort-${timestamp}`,
                title: "Emergency Backup: Sorting Crisis",
                description: "The AI service is unavailable. Sort this list of numbers.",
                input: [5, 2, 9, 1, 5, 6],
                optimalAlgorithm: "quick-sort",
                explanation: "Quick sort is generally the fastest O(n log n) algorithm for random data.",
                suboptimalOptions: ["bubble-sort", "insertion-sort"],
                incorrectOptions: ["linear-search"]
            };
        }

        console.warn(`Using fallback problem for topic: ${topic}`);
        return res.status(200).json(fallback);
    }
}
