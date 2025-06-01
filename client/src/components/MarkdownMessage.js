import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const MarkdownMessage = ({ content, who }) => {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className={`"p-4 rounded-lg shadow-sm ${who === 'bot' ? 'bg-neutral-800' : 'bg-transparent'}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose-invert max-w-none"
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="my-4">
                                    <SyntaxHighlighter
                                        language={match[1]}
                                        style={vscDarkPlus}
                                        PreTag="div"
                                        className="rounded-md"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="px-1 py-0.5 rounded-md bg-gray-900 text-gray-100" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-200">{children}</p>,
                        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-white">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-white">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-200">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-200">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4 text-gray-300">
                                {children}
                            </blockquote>
                        ),
                        a: ({ children, href }) => (
                            <a href={href} className="text-blue-400 hover:underline">
                                {children}
                            </a>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownMessage;