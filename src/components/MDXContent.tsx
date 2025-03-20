"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const LoadingContent = () => {
  return (
    <div className="space-y-6">
      {/* 标题骨架 */}
      <Skeleton className="h-12 w-3/4" />
      
      {/* 内容骨架 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      {/* 代码块骨架 */}
      <Skeleton className="h-32 w-full" />
      
      {/* 更多段落 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[88%]" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default function MDXContent({ slug }: { slug: string }) {
  const { resolvedTheme } = useTheme();

  const CSSComponent = dynamic(() => import(`@/assets/markdown/${resolvedTheme}`), { ssr: false })

  const Post = dynamic(() => import(`@/blog/${slug}.mdx`), {
    ssr: false,
    loading: () => <LoadingContent />
  });

  return <>
    <Post />
    <CSSComponent />
  </>;
}