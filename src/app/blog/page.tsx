'use server';

import { validateMdxSlug, getMdxFiles, getPostMatter } from "@/lib/getMdx";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default async function BlogPage() {
  const files = await getMdxFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace('.mdx', '');
      const matter = await getPostMatter(slug);
      return {
        slug,
        ...matter,
      };
    })
  );

  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">博客文章</h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <article>
                  <h2 className="text-2xl font-semibold mb-4 hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex flex-col gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex gap-2">
                      {post.tags?.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'yyyy年MM月dd日')}
                    </time>
                  </div>

                  {post.description && (
                    <p className="text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </article>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}