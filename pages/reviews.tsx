import Link from "next/link";
import { getAllPostSlugs } from "../utils/posts";

type PostMeta = {
  slug: string;
  title: string;
};

export async function getStaticProps() {
  const slugs: PostMeta[] = getAllPostSlugs();
  return { props: { slugs } };
}

export default function ReviewsPage({ slugs }: { slugs: PostMeta[] }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      <ul className="space-y-4">
        {slugs.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
