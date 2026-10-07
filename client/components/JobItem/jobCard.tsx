"use client";

import { Job } from "@/types/types";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { Calendar, Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import formatMoney from "../utils/formatMoney";
import { formatDates } from "../utils/formatDates";
import Image from "next/image";
import { usejobsContext } from "@/context/jobsContext";

interface jobInterface {
  job: Job;
  activeJob?: boolean;
}

const jobTypeBg = (type: string) => {
  switch (type) {
    case "Full Time":    return "bg-green-50 text-green-700 border-green-200";
    case "Part Time":   return "bg-blue-50 text-blue-700 border-blue-200";
    case "Contract":    return "bg-amber-50 text-amber-700 border-amber-200";
    case "Internship":  return "bg-violet-50 text-violet-700 border-violet-200";
    default:            return "bg-secondary text-secondary-foreground border-border";
  }
};

const JobCard = ({ job, activeJob }: jobInterface) => {
  const { title, salaryType, salary, createdBy, applicants, jobType, createdAt, location } = job;
  const { name, profilePicture } = createdBy;
  const [isLiked, setIsLiked] = React.useState(false);

  const router = useRouter();
  const { likeJob } = usejobsContext();
  const { userProfile, isAuthenticated } = useGlobalContext();

  const handleLike = async (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    setIsLiked(job.likes.includes(userProfile._id));
  }, [job.likes, userProfile._id]);

  return (
    <div
      className={`p-5 rounded-lg border flex flex-col gap-4 transition-shadow hover:shadow-sm ${
        activeJob
          ? "border-primary bg-primary/5"
          : "border-border bg-white"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex gap-3 items-center cursor-pointer min-w-0"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-md bg-secondary border border-border overflow-hidden">
            <Image
              src={profilePicture || "/avatar.png"}
              alt={name || "User"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors truncate">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{name}</p>
          </div>
        </div>

        <button
          className={`flex-shrink-0 p-1 rounded transition-colors ${
            isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => handleLike(job._id)}
          aria-label={isLiked ? "Remove bookmark" : "Bookmark job"}
        >
          {isLiked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      {/* Job type badges */}
      <div className="flex flex-wrap gap-1.5">
        {jobType.map((type, index) => (
          <span
            key={index}
            className={`px-2 py-0.5 text-xs font-medium rounded border ${jobTypeBg(type)}`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Location */}
      {location && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {location}
        </p>
      )}

      <Separator />

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">
          {formatMoney(salary, "Rs")}
          <span className="font-normal text-muted-foreground text-xs ml-0.5">
            /{salaryType === "Yearly" ? "yr" : salaryType === "Monthly" ? "mo" : salaryType === "Weekly" ? "wk" : "hr"}
          </span>
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDates(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
