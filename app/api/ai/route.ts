import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function extractCodeBlocks(text: string) {
    const htmlMatch = text.match(/```html\n([\s\S]*?)\n```/);
    const cssMatch = text.match(/```css\n([\s\S]*?)\n```/);
    const jsMatch = text.match(/```javascript\n([\s\S]*?)\n```/);
    return {
        html: htmlMatch ? htmlMatch[1].trim() : '',
        css: cssMatch ? cssMatch[1].trim() : '',
        js: jsMatch ? jsMatch[1].trim() : '',
    };
}

export async function POST(req: NextRequest) {
    const { type, input, language, mode = 'single' } = await req.json();

    if (!type || !input) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        if (type === 'prompt') {
            let contents;
            if (mode === 'full') {
                contents = `You are an expert web‑developer coding assistant embedded in a browser IDE that only handles HTML, CSS and JavaScript.
                - For "full" requests, generate exactly three fenced code blocks—in the order HTML, CSS, JavaScript—using \`\`\`html\`\`\`, \`\`\`css\`\`\`, and \`\`\`javascript\`\`\` labels, containing only the code needed to implement the user's feature request. Do not include any explanations or extra text
                -  For autocompletion requests (normal typing or explicit completion triggers), complete the code context provided by returning only the continuation snippet—no comments, no prose, just valid HTML/CSS/JS code that fits seamlessly.
                Always output exactly the code required, with no additional commentary.`;
            } else {
                contents = `You are an expert web‑developer coding assistant embedded in a browser IDE that only handles HTML, CSS and JavaScript.. Generate only the ${language} code for: ${input}. Do not include any explanations or additional text.
                Always output exactly the code required, with no additional commentary.`;
            }
            const result = await model.generateContent(contents);
            const suggestion = result.response.text();
            if (mode === 'full') {
                const { html, css, js } = extractCodeBlocks(suggestion);
                return NextResponse.json({ html, css, js });
            } else {
                return NextResponse.json({ suggestion });
            }
        } else if (type === 'completion') {
            const codeContext = input.code;
            const contents = `Complete the following ${language} code:\n${codeContext}. Do not include any explanations or additional text.`;
            const result = await model.generateContent(contents);
            const suggestion = result.response.text();
            return NextResponse.json({ suggestion });
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
    }
}