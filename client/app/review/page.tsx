"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useReviewContext } from "../../context/reviewContext";
import { Review } from "@/types/types";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star, PenLine } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
      />
    ))}
  </div>
);

const Page = () => {
  const { reviews } = useReviewContext();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Honest feedback from candidates about their interview experiences.
              </p>
            </div>
            <button
              onClick={() => router.push("/review/create")}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <PenLine className="h-3.5 w-3.5" />
              Write a review
            </button>
          </div>

          {/* Reviews grid */}
          {reviews && reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((r: Review) => (
                <div
                  key={r._id}
                  className="bg-white rounded-lg border border-border p-5 flex flex-col gap-3 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => router.push(`/review/${r._id}`)}
                >
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <img
                      src={r.user?.profilePicture || "/avatar.png"}
                      alt={r.user?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {r.name || r.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                  </div>

                  {/* Job ref */}
                  {r.job?.title && (
                    <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-2">
                      Applied for <span className="font-medium text-foreground">{r.job.title}</span>
                    </p>
                  )}

                  {/* Rating */}
                  <StarRating rating={r.rating} />

                  {/* Review text */}
                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                    {r.review}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-base font-medium text-foreground mb-1">No reviews yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to share your interview experience.
              </p>
              <button
                onClick={() => router.push("/review/create")}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <PenLine className="h-3.5 w-3.5" />
                Write a review
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
