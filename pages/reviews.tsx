import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"
import { getAllPostSlugs } from "../utils/posts"

type PostMeta = {
  slug: string
  title: string
  thumbnail: string | null  // 新增字段
  platform?: string
}

export async function getStaticProps() {
  const slugs: PostMeta[] = getAllPostSlugs()
  return { props: { slugs } }
}

export default function ReviewsPage({ slugs }: { slugs: PostMeta[] }) {
  const [search, setSearch] = useState("");
const [searchVisible, setSearchVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("All")

  const platforms = ["All", "HypeDrop", "PackDraw", "Mrloot", "Lootie"];

  const filtered = slugs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = selectedPlatform === "All" || post.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">Review Articles</h1>

      {/* 平台按钮筛选 */}
      

      {/* 搜索框 */}
      <div className="flex items-center justify-between flex-wrap mb-8 gap-3">
  {/* 平台按钮区靠左 */}
  <div className="flex flex-wrap gap-3">
    {platforms.map((platform) => (
      <button
        key={platform}
        onClick={() => setSelectedPlatform(platform!)}
        className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
          selectedPlatform === platform
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
      >
        {platform}
      </button>
    ))}
  </div>

  {/* 搜索图标切换输入框 */}
  <div className="relative">
    <button
  onClick={() => setSearchVisible(!searchVisible)}
  className="text-gray-600 hover:text-blue-600 focus:outline-none"
>
  <Search className="w-5 h-5" />
</button>
    {searchVisible && (
      <input
        type="text"
        placeholder="Search reviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        className="ml-3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      />
    )}
  </div>
</div>

      {/* 文章列表卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ slug, title, thumbnail }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="block rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition duration-300 bg-white"
          >
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
