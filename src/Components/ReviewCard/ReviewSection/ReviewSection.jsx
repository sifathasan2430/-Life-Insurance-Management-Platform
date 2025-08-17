import React from "react";
import { useQuery } from "@tanstack/react-query";

import ReviewCard from "../ReviewCard";
import secureAxios from "../../../utils/firebaseAxios";
import Container from "../../Container/Container";
import Section from "../../Section/Section";
import SectionHeader from "../../../SectionHeader/SectionHeader";


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
 
      <Section>
        <SectionHeader title={'Review'}/>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Failed to load reviews: {error.message}
          </div>
        ) : reviews?.length === 0 ? (
          <div className="text-center text-gray-500">No reviews yet.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </Section>
   
  );
};

export default ReviewSection;
