import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// Custom component to render code blocks with syntax highlighting
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={theme}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

// Main formatter component
const ContentFormatter = ({ content }) => {
  console.log(content);
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
      {content}
    </ReactMarkdown>
  );
};

export default ContentFormatter;
