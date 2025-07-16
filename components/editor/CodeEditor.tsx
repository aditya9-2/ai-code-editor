import { useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";

interface CodeEditorProps {
    language: string;
    code: string;
    onChange: (code: string) => void;
}

export function CodeEditor({ language, code, onChange }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [code]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const getLanguageColor = () => {
        switch (language) {
            case 'html': return 'text-orange-500';
            case 'css': return 'text-blue-500';
            case 'javascript': return 'text-yellow-500';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="h-[60vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-t-lg">
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
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleChange}
                    className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-b-lg"
                    placeholder={`Enter your ${language.toUpperCase()} code here...`}
                    spellCheck={false}
                    style={{
                        minHeight: '400px',
                        lineHeight: '1.5',
                        tabSize: 2,
                    }}
                />

                {/* Line numbers overlay */}
                <div className="absolute left-0 top-0 p-4 pointer-events-none select-none">
                    <div className="font-mono text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
                        {code.split('\n').map((_, index) => (
                            <div key={index} className="h-[21px]">
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
          textarea {
            padding-left: ${code.split('\n').length.toString().length * 8 + 32}px;
          }
        `}</style>
            </div>
        </div>
    );
}