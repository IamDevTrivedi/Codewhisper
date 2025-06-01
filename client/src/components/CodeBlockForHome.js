import React from "react";
import { CodeBlock } from "./ui/code-block";

export default function CodeBlockUse() {
    const code = `
<div class="features-container">
  <h1>Why Choose CodeWhisper?</h1>
    <ul>
            <li>Code in multiple languages.</li>
            <li>Real-time collaboration.</li>
            <li>Smart AI Assitant for Code Debug</li>
            <li>Smart syntax highlighting.</li>
    </ul>
</div>
`;

    return (
        <div className="mt-10 max-w-3xl mx-auto w-full">
            <CodeBlock
                language="html"
                filename="CodeWhisperFeatures.html"
                highlightLines={[5, 6, 7, 8]}
                code={code}
            />
        </div>
    );
}
