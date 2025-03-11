import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, Flag, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  images?: string[];
  replies?: {
    id: string;
    userName: string;
    userRole: string;
    comment: string;
    date: string;
  }[];
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: { [key: number]: number };
  reviews?: Review[];
}

const mockReviews: Review[] = [
  {
    id: "review1",
    userId: "user1",
    userName: "Ahmed M.",
    rating: 5,
    title: "Excellent quality and fast delivery",
    comment:
      "The marble tiles are absolutely stunning. The quality is top-notch and they look even better in person than in the photos. Delivery was faster than expected and everything arrived in perfect condition.",
    date: "2023-09-15",
    helpful: 12,
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e4a92f082f6?w=300&q=80",
    ],
  },
  {
    id: "review2",
    userId: "user2",
    userName: "Fatima K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    rating: 4,
    title: "Great product, minor shipping issue",
    comment:
      "The tiles are beautiful and high quality. I'm very happy with my purchase. The only issue was a slight delay in shipping, but customer service was responsive and helpful.",
    date: "2023-08-22",
    helpful: 5,
    verified: true,
  },
  {
    id: "review3",
    userId: "user3",
    userName: "Mohamed H.",
    rating: 5,
    title: "Perfect for my renovation project",
    comment:
      "These tiles transformed my bathroom completely. The installation was straightforward and the result is stunning. Highly recommend for any renovation project.",
    date: "2023-07-30",
    helpful: 8,
    verified: true,
    replies: [
      {
        id: "reply1",
        userName: "Tiles & Tools",
        userRole: "Seller",
        comment:
          "Thank you for your kind review, Mohamed! We're thrilled to hear about your successful renovation project. Please share photos with us if you'd like!",
        date: "2023-08-01",
      },
    ],
  },
  {
    id: "review4",
    userId: "user4",
    userName: "Laila A.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
    rating: 3,
    title: "Good product but expensive shipping",
    comment:
      "The quality of the tiles is good, but I was surprised by the high shipping cost. Also, a few tiles had minor chips on the edges. Customer service offered a partial refund which was fair.",
    date: "2023-06-18",
    helpful: 15,
    verified: true,
  },
];

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  averageRating = 4.5,
  totalReviews = mockReviews.length,
  ratingDistribution = { 5: 70, 4: 20, 3: 5, 2: 3, 1: 2 },
  reviews = mockReviews,
}) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  // Sort and filter reviews
  const filteredAndSortedReviews = [...reviews]
    .filter((review) => {
      if (filterBy === "all") return true;
      if (filterBy === "verified" && review.verified) return true;
      if (filterBy === "with-images" && review.images?.length) return true;
      if (filterBy === "with-replies" && review.replies?.length) return true;
      const filterRating = parseInt(filterBy);
      if (!isNaN(filterRating) && review.rating === filterRating) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "helpful") {
        return b.helpful - a.helpful;
      }
      if (sortBy === "highest") {
        return b.rating - a.rating;
      }
      if (sortBy === "lowest") {
        return a.rating - b.rating;
      }
      return 0;
    });

  const handleSubmitReview = () => {
    // In a real app, this would send the review to an API
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    setReviewDialogOpen(false);
    setReviewText("");
    setReviewTitle("");
    setRating(5);
  };

  const handleHelpful = (reviewId: string) => {
    // In a real app, this would update the helpful count in the API
    toast({
      description: "Thank you for your feedback!",
    });
  };

  const handleReport = (reviewId: string) => {
    // In a real app, this would send a report to the API
    toast({
      description:
        "Review reported. Thank you for helping us maintain quality.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Rating Summary */}
        <div className="md:w-1/3 bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold mr-2">{averageRating}</div>
            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-12 text-sm">{star} stars</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${ratingDistribution[star] || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-sm text-right">
                  {ratingDistribution[star] || 0}%
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="mt-6">
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Write a Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with {productName}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Rating</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="review-title"
                      className="text-sm font-medium"
                    >
                      Review Title
                    </label>
                    <input
                      id="review-title"
                      className="w-full p-2 border rounded-md"
                      placeholder="Summarize your experience"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="review-text"
                      className="text-sm font-medium"
                    >
                      Review
                    </label>
                    <Textarea
                      id="review-text"
                      placeholder="Share your experience with this product"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add Photos</label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Drag and drop images or click to upload
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        type="button"
                      >
                        Upload Images
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleSubmitReview}
                    disabled={!reviewText.trim() || !reviewTitle.trim()}
                  >
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:w-2/3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                className="text-sm border rounded-md p-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <select
                className="text-sm border rounded-md p-1"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Reviews</option>
                <option value="verified">Verified Purchases</option>
                <option value="with-images">With Images</option>
                <option value="with-replies">With Seller Responses</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          {filteredAndSortedReviews.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-lg font-medium mb-2">No reviews found</p>
              <p className="text-muted-foreground mb-6">
                Be the first to review this product
              </p>
              <Button onClick={() => setReviewDialogOpen(true)}>
                Write a Review
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-lg p-6 shadow-sm space-y-4"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={
                            review.userAvatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`
                          }
                          alt={review.userName}
                        />
                        <AvatarFallback>
                          {review.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">{review.title}</h4>
                    <p className="mt-1 text-sm">{review.comment}</p>
                  </div>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}

                  {review.verified && (
                    <div className="text-xs text-green-600 font-medium">
                      ✓ Verified Purchase
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => handleHelpful(review.id)}
                      >
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        Helpful ({review.helpful})
                      </button>
                      <button
                        className="flex items-center text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => handleReport(review.id)}
                      >
                        <Flag className="h-3.5 w-3.5 mr-1" />
                        Report
                      </button>
                    </div>
                  </div>

                  {/* Seller Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-muted">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="mt-3">
                          <div className="flex items-center">
                            <div className="font-medium text-sm">
                              {reply.userName}
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {reply.userRole}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(reply.date).toLocaleDateString()}
                          </div>
                          <p className="mt-1 text-sm">{reply.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
