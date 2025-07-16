"use client"

import { Code, Play } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <nav className="bg-white shadow-sm dark:bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Code className="w-6 h-6 text-blue-500" />
                    <h1 className="text-xl font-bold">AI Code Editor</h1>
                </div>
                <div className="flex items-center space-x-4 justify-between">
                    <ThemeToggle />
                    <Button className="bg-blue-400 text-white hover:bg-blue-500 cursor-pointer dark:bg-slate-500 dark:text-white dark:hover:bg-slate-600">
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                    </Button>
                </div>

            </div>
        </nav>
    )
}