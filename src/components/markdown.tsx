"use client";

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import MarkdownComponent from "react-markdown";
import gfm from "remark-gfm";
import highlight from "rehype-highlight";
import "@/app/markdown.css";

export const MarkdownStyle = () => {
  const { resolvedTheme } = useTheme();
  const CSSComponent = dynamic(() => import(`@/assets/markdown/${resolvedTheme}`), { ssr: false });

  return <CSSComponent />;
}

export const Markdown = ({ content }: { content: string }) => {
  return <>
    <MarkdownStyle />
    <div className="markdown-root">
      <MarkdownComponent remarkPlugins={[gfm]} rehypePlugins={[highlight]}>{content}</MarkdownComponent>
    </div>
  </>
}