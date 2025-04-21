import Image from "next/image"
import Link from "next/link"

export function AlternativesList({ alternatives }: { alternatives: any[] }) {
  const sorted = [...alternatives].sort((a, b) => a.rank - b.rank)

  return (
    <div className="grid gap-4">
      {sorted.map((alt, idx) => (
      <Link key={idx} href={`/site/${alt.id}`} passHref> 
        <div
          key={idx}
          className="relative overflow-hidden rounded-xl shadow-md group"
        >
          {/* alternative图片 */}
          <Image
            src={alt.image || "/hero-bg.png"} // fallback 用默认图片
            alt={alt.name}
            width={400}
            height={200}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
          />

          {/* 遮罩 */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* 内容 */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <p className="text-xs text-gray-300">{alt.category}</p>
            <p className="text-sm text-gray-200 mb-1">Ranked #{alt.rank}</p>
            <p className="text-lg font-bold">{alt.name}</p>
          </div>
        </div>
      </Link>
      ))}
    </div>
  )
}
