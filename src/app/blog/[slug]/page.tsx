import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MDXContent from "@/components/MDXContent";
import { validateMdxSlug, getMdxFiles, getPostMatter } from "@/lib/getMdx";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

import "@/app/markdown.css"

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const isValid = await validateMdxSlug(slug);
  if (!isValid) {
    notFound();
  }

  const matter = await getPostMatter(slug);

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <Card className="w-full max-w-4xl">
        <article className="px-8">
          <header className="mb-8 pt-8">
            <h1 className="text-4xl font-bold mb-4">{matter.title}</h1>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <div className="flex gap-2">
                {matter.tags?.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <time dateTime={matter.date}>
                {format(new Date(matter.date), 'yyyy年MM月dd日')}
              </time>
            </div>
          </header>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="prose prose-lg dark:prose-invert max-w-none markdown-root">
              <MDXContent slug={slug} />
            </div>
          </div>

          <Separator className="my-8" />

          <footer className="text-sm text-muted-foreground pb-8">
            <p>© {new Date().getFullYear()} VRCD. All rights reserved.</p>
          </footer>
        </article>
      </Card>
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  const files = await getMdxFiles();
  return files.map(file => ({
    slug: file.replace('.mdx', '')
  }));
}