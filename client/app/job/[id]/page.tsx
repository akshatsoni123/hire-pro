"use client";
import Header from "@/components/header";
import React, { useEffect } from "react";
import { usejobsContext } from "@/context/jobsContext";
import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types/types";
import Image from "next/image";
import formatMoney from "@/components/utils/formatMoney";
import { useGlobalContext } from "@/context/globalContext";
import { formatDates } from "@/components/utils/formatDates";
import toast from "react-hot-toast";
import Footer from "@/components/footer";
import { MapPin, Calendar, Users, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const jobTypeBg = (type: string) => {
  switch (type) {
    case "Full Time":    return "bg-green-50 text-green-700 border-green-200";
    case "Part Time":   return "bg-blue-50 text-blue-700 border-blue-200";
    case "Contract":    return "bg-amber-50 text-amber-700 border-amber-200";
    case "Internship":  return "bg-violet-50 text-violet-700 border-violet-200";
    default:            return "bg-secondary text-secondary-foreground border-border";
  }
};

const JobDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const { jobs, likeJob, applyJob } = usejobsContext();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);
  const { userProfile, isAuthenticated } = useGlobalContext();
  const router = useRouter();

  const job = jobs.find((job: Job) => job._id === id);

  useEffect(() => {
    if (job) {
      setIsApplied(job.applicants.includes(userProfile._id));
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  if (!job) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Job not found.</p>
        </div>
      </main>
    );
  }

  const { title, location, description, salary, createdBy, applicants, jobType, createdAt, salaryType, negotiable, tags, skills } = job;
  const { name, profilePicture } = createdBy;

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    likeJob(job._id);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Back */}
          <Link
            href="/findwork"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            {/* Main content */}
            <div className="space-y-6">
              {/* Job header card */}
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-secondary border border-border overflow-hidden flex-shrink-0">
                      <Image
                        src={profilePicture || "/avatar.png"}
                        alt={name || "User"}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-foreground">{title}</h1>
                      <p className="text-sm text-muted-foreground mt-0.5">{name} · Recruiter</p>
                    </div>
                  </div>
                  <button
                    className={`p-2 rounded-md border transition-colors ${
                      isLiked
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    onClick={() => handleLike()}
                    aria-label={isLiked ? "Remove bookmark" : "Bookmark job"}
                  >
                    {isLiked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  </button>
                </div>

                {/* Meta row */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Posted {formatDates(createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"}
                  </span>
                </div>

                {/* Job type badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {jobType.map((type: string, i: number) => (
                    <span key={i} className={`px-2.5 py-1 text-xs font-medium rounded border ${jobTypeBg(type)}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Job Description</h2>
                <div
                  className="wysiwyg text-sm text-foreground/90"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Apply button */}
              <button
                className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors ${
                  isApplied
                    ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={() => {
                  if (!isApplied) { applyJob(job._id); setIsApplied(true); }
                  else toast.error("You have already applied to this job.");
                }}
              >
                {isApplied ? "Applied" : "Apply Now"}
              </button>

              {/* Details */}
              <div className="bg-white rounded-lg border border-border p-5 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary</span>
                    <span className="font-medium">
                      {formatMoney(salary, "Rs")}/{salaryType === "Yearly" ? "yr" : salaryType === "Monthly" ? "mo" : salaryType === "Weekly" ? "wk" : "hr"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Negotiable</span>
                    <span className={negotiable ? "text-green-600 font-medium" : "text-muted-foreground"}>
                      {negotiable ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-right max-w-[140px]">{location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{jobType[0]}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="bg-white rounded-lg border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 text-xs font-medium rounded border border-border bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="bg-white rounded-lg border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 text-xs font-medium rounded border border-primary/20 bg-primary/5 text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default JobDetailPage;
