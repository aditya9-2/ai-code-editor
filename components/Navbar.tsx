"use client"

import { Code, Play, Sparkles, Share, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";

export function Navbar() {
    const handleShare = () => {
        // Implement share functionality
        alert("Share functionality not implemented yet.");
    };
    const handleDownload = () => {
        // Implement download functionality
        alert("Download functionality not implemented yet.");
    };
    const handleRun = () => {
        // Implement run functionality
        alert("Run functionality not implemented yet.");
    };
    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Code className="w-8 h-8 text-blue-500" />
                                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    CODE AI
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Build • Test • Deploy
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            className="hidden md:flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            <Share className="w-4 h-4" />
                            <span>Share</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            className="hidden md:flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </Button>

                        <Separator orientation="vertical" className="h-6 hidden md:block" />

                        <ThemeToggle />

                        <Button
                            onClick={handleRun}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                            size="sm"
                        >
                            <Play className="w-4 h-4 mr-2" />
                            <span>Run Code</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}