"use client";

import { useState, useMemo } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Navbar } from "@/components/Navbar";
import { PreviewArea } from "@/components/editor/Previewarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { HTML_SNIPPET, CSS_SNIPPET, JS_SNIPPET } from "@/constants/snippetes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"

export default function Home() {
  const [htmlCode, setHtmlCode] = useState(HTML_SNIPPET);
  const [cssCode, setCssCode] = useState(CSS_SNIPPET);
  const [jsCode, setJsCode] = useState(JS_SNIPPET);
  const [currentTab, setCurrentTab] = useState<'html' | 'css' | 'js'>('html');
  const [aiEnabled, setAiEnabled] = useState(true);

  const injectThemeAndCode = (html: string, css: string, js: string) => {
    let modifiedHtml = html;

    // Add user CSS to <head>
    if (modifiedHtml.includes("</head>")) {
      modifiedHtml = modifiedHtml.replace(
        "</head>",
        `<style>${css}</style></head>`
      );
    } else if (modifiedHtml.includes("<head>")) {
      modifiedHtml = modifiedHtml.replace(
        "<head>",
        `<head><style>${css}</style>`
      );
    } else {
      modifiedHtml = `<head><style>${css}</style></head>` + modifiedHtml;
    }

    // Add user JS before </body>
    if (modifiedHtml.includes("</body>")) {
      modifiedHtml = modifiedHtml.replace("</body>", `<script>${js}</script></body>`);
    } else {
      modifiedHtml += `<script>${js}</script>`;
    }

    // Ensure it's a full HTML document
    if (!modifiedHtml.includes("<html")) {
      modifiedHtml = `<!DOCTYPE html><html><head></head><body>${modifiedHtml}</body></html>`;
    }

    return modifiedHtml;
  };

  const fullHtml = useMemo(() => {
    if (!htmlCode) return '';
    return injectThemeAndCode(htmlCode, cssCode, jsCode);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Editor Section */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                Code Editor
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-toggle"
                    checked={aiEnabled}
                    onCheckedChange={setAiEnabled}
                  />
                  <Label htmlFor="ai-toggle" className="text-sm text-slate-700 dark:text-slate-200">
                    AI Suggestions
                  </Label>
                </div>

              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
            </div>

            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'html' | 'css' | 'js')}>
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-100 dark:bg-slate-700">
                <TabsTrigger
                  value="html"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:cursor-pointer"
                >
                  HTML
                </TabsTrigger>
                <TabsTrigger
                  value="css"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:cursor-pointer"
                >
                  CSS
                </TabsTrigger>
                <TabsTrigger
                  value="js"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white hover:cursor-pointer"
                >
                  JS
                </TabsTrigger>
              </TabsList>

              <div className="h-[calc(100%-120px)]">
                <TabsContent value="html" className="h-full mt-0">
                  <CodeEditor
                    language="html"
                    code={htmlCode}
                    onChange={setHtmlCode}
                    aiEnabled={aiEnabled}
                  />
                </TabsContent>
                <TabsContent value="css" className="h-full mt-0">
                  <CodeEditor
                    language="css"
                    code={cssCode}
                    onChange={setCssCode}
                    aiEnabled={aiEnabled}
                  />
                </TabsContent>
                <TabsContent value="js" className="h-full mt-0">
                  <CodeEditor
                    language="javascript"
                    code={jsCode}
                    onChange={setJsCode}
                    aiEnabled={aiEnabled}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </Card>

          {/* Preview Section */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
            {/* <iframe srcDoc={fullHtml} className="w-full h-full border-0" /> */}
            <PreviewArea fullHtml={fullHtml} />
          </Card>
        </div>
      </div>
    </div>
  );
}