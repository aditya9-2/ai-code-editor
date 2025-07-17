import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { minimalSetup } from "codemirror"
import {
    autocompletion,
    CompletionContext,
    CompletionResult
} from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import toast from "react-hot-toast";


interface CodeEditorProps {
    language: string;
    code: string;
    onChange: (code: string) => void;
    aiEnabled: boolean; //toggle ai
}

export function CodeEditor({ language, code, onChange, aiEnabled }: CodeEditorProps) {
    //const textareaRef = useRef<HTMLTextAreaElement>(null);

    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    // Function to fetch prompt-based suggestions from Gemini API
    async function callGeminiAPIForPrompt(prompt: string, lang: string): Promise<string> {
        try {

            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'prompt', input: prompt, language: lang }),
            });

            if (!response.ok) {
                console.error('API request failed:', response.statusText);
                return '';
            }

            const data = await response.json();
            toast.loading('Loading the AI', { duration: 4000 })
            return data.suggestion || '';
        } catch (error) {
            console.error('Error calling Gemini API for prompt:', error);
            toast.error('Error calling Gemini API for prompt:', {
                duration: 4000
            })
            return '';
        }
    }

    async function callGeminiAPIForCompletion(codeContext: string, cursorPos: number, lang: string): Promise<string> {
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'completion', input: { code: codeContext, cursorPos }, language: lang }),
            });

            if (!response.ok) {
                console.error('API request failed:', response.statusText);
                return '';
            }

            const data = await response.json();
            toast.loading('Loading the AI', { duration: 4000 })
            return data.suggestion || '';
        } catch (error) {
            console.error('Error calling Gemini API for completion:', error);
            toast.error('Error calling Gemini API for completion:', { duration: 4000 })
            return '';
        }
    }

    // Custom completion source for AI suggestions
    async function geminiCompletionSource(context: CompletionContext): Promise<CompletionResult | null> {

        const line = context.state.doc.lineAt(context.pos);

        if (line.text.startsWith('// prompt:') && context.pos > line.from + 9) {
            // Handle "// prompt:" feature
            const prompt = line.text.slice(10).trim();
            const suggestion = await callGeminiAPIForPrompt(prompt, language);

            return {
                from: line.from,
                options: [{ label: suggestion, apply: suggestion, type: 'text' }],
            };

        } else if (context.explicit || context.pos > 0) {
            // General code completion (triggered explicitly or while typing)
            const codeContext = context.state.doc.toString();
            const suggestion = await callGeminiAPIForCompletion(codeContext, context.pos, language);

            return {
                from: context.pos,
                options: [{ label: suggestion, apply: suggestion, type: 'text' }],
            };
        }

        return null;
    }

    useEffect(() => {

        if (editorRef.current && !viewRef.current) {

            const cursorTheme = EditorView.theme({
                ".cm-content": {
                    caretColor: "auto !important",
                },

            });
            // Select language extension based on props
            const langExtension =
                language === 'html' ? html() : language === 'css' ? css() : javascript();

            // Set up extensions, conditionally including AI autocompletion
            const extensions = [
                minimalSetup,
                langExtension,
                cursorTheme,
                aiEnabled ? autocompletion({ override: [geminiCompletionSource] }) : autocompletion(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(update.state.doc.toString());
                    }
                }),
            ];

            // Initialize CodeMirror editor
            viewRef.current = new EditorView({
                state: EditorState.create({
                    doc: code,
                    extensions,
                }),
                parent: editorRef.current,
            });
        }

        return () => {
            viewRef.current?.destroy();
            viewRef.current = null;
        };
    }, [language, aiEnabled]);

    // Sync external code changes with editor
    useEffect(() => {
        if (viewRef.current && code !== viewRef.current.state.doc.toString()) {
            viewRef.current.dispatch({
                changes: { from: 0, to: viewRef.current.state.doc.length, insert: code },
            });
        }
    }, [code]);

    const getLanguageColor = () => {
        switch (language) {
            case 'html': return 'text-orange-500';
            case 'css': return 'text-blue-500';
            case 'javascript': return 'text-yellow-500';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="h-[55vh] flex flex-col overflow-hidden">
            <div className="sticky top-0 z-10 flex items-center justify-between mb-3 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-t-lg">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${language === 'html' ? 'bg-orange-500' :
                        language === 'css' ? 'bg-blue-500' :
                            'bg-yellow-500'
                        }`}></div>
                    <span className={`text-sm font-medium ${getLanguageColor()}`}>
                        {language.toUpperCase()}
                    </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                    {code.split('\n').length} lines
                </div>
            </div>

            <div className="flex-1 relative">
                <div
                    id="editor"
                    ref={editorRef}

                    className="h-[55vh] w-full bg-white dark:bg-slate-900 rounded-b-lg overflow-x-hidden overflow-y-auto font-mono text-sm text-slate-800 dark:text-slate-200"
                />

            </div>
        </div>
    );
}

// Todo:
// 1. Need to change the cater color in the editor in dark theme I've tried everything but not able to do it
// 2. // prompt is working perfectly but auto completion goives extra ```code``` need to remove it - can be done in the prompt engineering 