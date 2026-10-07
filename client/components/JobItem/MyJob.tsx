"use client";
import React, { useEffect, useState } from "react";
import { Job } from "@/types/types";
import { usejobsContext } from "@/context/jobsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { formatDates } from "../utils/formatDates";
import { Badge } from "../ui/badge";
import { Pencil, Trash, Bookmark, BookmarkCheck, MapPin, Calendar } from "lucide-react";
import { Separator } from "../ui/separator";

interface JobInterface {
  job: Job;
}

const MyJob = ({ job }: JobInterface) => {
  const router = useRouter();
  const { deleteJob, likeJob } = usejobsContext();
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated, userProfile } = useGlobalContext();

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    if (userProfile?._id) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job.likes, userProfile._id]);

  return (
    <div className="bg-white rounded-lg border border-border p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex items-center gap-3 cursor-pointer min-w-0"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-md border border-border overflow-hidden bg-secondary">
            <Image
              alt={job.title}
              src={job.createdBy.profilePicture || "/avatar.png"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate">
              {job.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{job.createdBy.name}</p>
          </div>
        </div>

        <button
          className={`flex-shrink-0 p-1.5 rounded transition-colors ${
            isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => isAuthenticated ? handleLike(job._id) : router.push(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:7895"}/login`)}
          aria-label={isLiked ? "Remove bookmark" : "Bookmark"}
        >
          {isLiked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        {job.location && (
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
        )}
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />Posted {formatDates(job.createdAt)}
        </span>
      </div>

      {/* Skills & Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill, i) => (
          <Badge key={i} variant="secondary" className="text-xs font-normal">
            {skill}
          </Badge>
        ))}
        {job.tags.slice(0, 2).map((tag, i) => (
          <Badge key={`tag-${i}`} variant="outline" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions — only show edit/delete to creator */}
      {job.createdBy._id === userProfile?._id && (
        <>
          <Separator />
          <div className="flex justify-end gap-1">
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              aria-label="Edit job"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-md transition-colors"
              onClick={() => deleteJob(job._id)}
              aria-label="Delete job"
            >
              <Trash className="h-3 w-3" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyJob;
