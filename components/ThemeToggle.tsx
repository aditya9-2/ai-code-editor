import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if user has a saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
        setIsDark(shouldUseDark);

        if (shouldUseDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="w-8 h-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
            {isDark ? (
                <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
                <Moon className="w-4 h-4 text-slate-600" />
            )}
        </Button>
    );
}