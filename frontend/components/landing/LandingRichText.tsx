"use client";

import React from "react";

function renderChildren(children: any[]): React.ReactNode {
  if (!children) return null;
  return children.map((child: any, index: number) => {
    if (child.type === "text") {
      let text: React.ReactNode = child.text;
      if (child.bold) text = <strong key={index}>{text}</strong>;
      if (child.italic) text = <em key={index}>{text}</em>;
      return <span key={index}>{text}</span>;
    }
    if (child.type === "link") {
      return (
        <a
          key={index}
          href={child.url}
          target={child.target || "_self"}
          rel={child.target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary underline"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return renderChildren(child.children);
  });
}

export function LandingRichText({ content }: { content: any }) {
  if (!content) return null;
  if (typeof content === "string") {
    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  if (Array.isArray(content)) {
    return (
      <div className="prose max-w-none">
        {content.map((node: any, index: number) => {
          if (node.type === "paragraph") {
            return (
              <p key={index} className="mb-2">
                {renderChildren(node.children ?? [])}
              </p>
            );
          }
          return (
            <div key={index}>{renderChildren(node.children ?? [])}</div>
          );
        })}
      </div>
    );
  }
  return null;
}
