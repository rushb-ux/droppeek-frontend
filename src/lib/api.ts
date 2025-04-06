const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Review = {
  id: number;
  attributes: {
    title: string;
    publishedAt: string;
    rating: number;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

// 获取最新评测文章
export async function getReviews(): Promise<{ data: Review[] }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/reviews?sort[0]=publishedAt:desc&populate=image`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching reviews failed:", error);
    return { data: [] };
  }
}

// 获取评分最高的热门评测文章
export async function getTopReviews(): Promise<{ data: Review[] }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/reviews?sort[0]=rating:desc&populate=image`
    );
    if (!res.ok) throw new Error(`API 请求失败: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("获取热门评测文章失败:", error);
    return { data: [] };
  }
}