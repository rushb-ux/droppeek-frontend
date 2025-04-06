import { useEffect, useState } from 'react';

interface Review {
  id: number;
  attributes: {
    Title: string;
    Content: string;
    Rating: number;
    PublishedDate: string;
  };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
        const json = await res.json();
        setReviews(json.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{review.attributes.Title}</h2>
              <p className="text-gray-600">Rating: {review.attributes.Rating}</p>
              <p>{review.attributes.Content}</p>
              <p className="text-sm text-gray-500">Published: {review.attributes.PublishedDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
