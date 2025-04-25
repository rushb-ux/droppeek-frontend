import Link from "next/link"
import { useState } from "react"
import { getAllPostSlugs } from "../utils/posts"

type PostMeta = {
  slug: string
  title: string
  thumbnail: string | null  // 新增字段
}

export async function getStaticProps() {
  const slugs: PostMeta[] = getAllPostSlugs()
  return { props: { slugs } }
}

export default function ReviewsPage({ slugs }: { slugs: PostMeta[] }) {
  const [search, setSearch] = useState("")

  const filtered = slugs.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">Review Articles</h1>

      {/* 搜索框 */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* 文章列表卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ slug, title, thumbnail }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="block rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition duration-300 bg-white"
          >
            {/* 缩略图展示 */}
            <div className="w-full h-60 overflow-hidden rounded-md mb-4 bg-gray-100">
              <img
                src={thumbnail || "/images/default-thumbnail.png"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-500">Click to read more</p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No reviews found.</p>
        )}
      </div>
    </main>
  )
}
