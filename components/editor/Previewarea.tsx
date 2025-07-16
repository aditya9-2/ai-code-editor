
import { useState } from "react";
import { RefreshCw, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface PreviewAreaProps {
    fullHtml: string;
}

export function PreviewArea({ fullHtml }: PreviewAreaProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 500);
    };

    const handleOpenExternal = () => {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(fullHtml);
            newWindow.document.close();
        }
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                        Live Preview
                    </h2>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        className="w-8 h-8 p-0"
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenExternal}
                        className="w-8 h-8 p-0"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-auto">
                <div className="w-full">
                    {fullHtml ? (
                        <iframe
                            key={isRefreshing ? Date.now() : 'iframe'}
                            srcDoc={fullHtml}
                            className="w-full h-[calc(100vh-300px)] border-0 rounded-lg shadow-lg bg-white"
                            sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                            title="Code Preview"
                        />
                    ) : (
                        <div className="w-full h-[calc(100vh-300px)] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center">
                            <div className="text-center text-slate-500 dark:text-slate-400">
                                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">No content to preview</p>
                                <p className="text-sm">Start coding to see your creation!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Developer Tools Hint */}
            <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                        <strong>Pro tip:</strong> Open Developer Tools (F12) to view console logs and debug your JavaScript code.
                    </span>
                </p>
            </div>
        </div>
    );
}
