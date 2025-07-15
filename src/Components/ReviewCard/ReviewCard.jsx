import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ review }) => {
    console.log(review);
  return (
    <Card className="w-full max-w-md shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12 border-2 border-[#ff8c00]">
            <AvatarImage src={review.profileImage} />
            <AvatarFallback className="bg-[#ff8c00] text-white">
              {review.userEmail?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1">
            {/* User + Stars */}
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-gray-800">
                {review.userEmail?.split("@")[0]}
              </h4>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-[#ff8c00] fill-[#ff8c00]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              {review.comment}
            </p>
          </div>
        </div>
      </CardContent>

      
    </Card>
  );
};

export default ReviewCard;
