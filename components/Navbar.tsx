"use client"

import { Code, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";


export function Navbar() {

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
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}