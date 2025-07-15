import React from "react";
import { useQuery } from "@tanstack/react-query";

import ReviewCard from "../ReviewCard";
import secureAxios from "../../../utils/firebaseAxios";


const fetchReviews = async () => {
  const { data } = await secureAxios.get("/reviews");
  return data;
};

const ReviewSection = () => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Customer Reviews
        </h2>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Failed to load reviews: {error.message}
          </div>
        ) : reviews?.length === 0 ? (
          <div className="text-center text-gray-500">No reviews yet.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
