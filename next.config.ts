import createMDX from '@next/mdx';
import gfm from "remark-gfm"
import highlight from "rehype-highlight"
import remarkFrontmatter from 'remark-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [gfm, remarkFrontmatter],
    rehypePlugins: [highlight]
  }
})

export default withMDX(nextConfig)