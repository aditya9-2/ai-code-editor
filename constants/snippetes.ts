export const HTML_SNIPPET = `<!DOCTYPE html>
<html>
<head>
    <title>My Web App</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to Code Sandbox</h1>
        <p>Start building something amazing!</p>
        <button onclick="showMessage()">Click me!</button>
    </div>
</body>
</html>`;

export const CSS_SNIPPET = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}`;

export const JS_SNIPPET = `function showMessage() {
    const messages = [
        "🎉 Awesome! You clicked the button!",
        "✨ Great job exploring the code!",
        "🔥 Keep building amazing things!",
        "💡 The possibilities are endless!",
        "🌟 You're doing fantastic!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
    
    console.log("Button clicked! 🚀");
    console.log("Current time:", new Date().toLocaleTimeString());
}

// Welcome message
console.log("🌈 Welcome to your Code Sandbox!");
console.log("Open the developer tools to see this message.");

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Page loaded successfully!");
});`;
