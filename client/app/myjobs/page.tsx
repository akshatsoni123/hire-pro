"use client";
import React from "react";
import { Job } from "@/types/types";
import Header from "@/components/header";
import MyJob from "@/components/JobItem/MyJob";
import Footer from "@/components/footer";
import { usejobsContext } from "@/context/jobsContext";
import { useGlobalContext } from "@/context/globalContext";
import Link from "next/link";

const tabs = [
  { id: "posts", label: "My Posts" },
  { id: "likes", label: "Saved" },
  { id: "applied", label: "Applied" },
];

const MyJobs = () => {
  const { userJobs, jobs } = usejobsContext();
  const { userProfile } = useGlobalContext();
  const [activeTab, setActiveTab] = React.useState("posts");
  const userId = userProfile?._id;

  const likedJobs = (jobs || []).filter((job: Job) => job.likes.includes(userId));
  const appliedJobs = (jobs || []).filter((job: Job) => job.applicants.includes(userId));

  const getJobs = () => {
    if (activeTab === "posts") return userJobs || [];
    if (activeTab === "likes") return likedJobs;
    return appliedJobs;
  };

  const activeJobs = getJobs();

  const emptyMessages: Record<string, { title: string; desc: string; action?: { href: string; label: string } }> = {
    posts: {
      title: "No job posts yet",
      desc: "Start by posting an open role to attract candidates.",
      action: { href: "/post", label: "Post a job" },
    },
    likes: {
      title: "No saved jobs",
      desc: "Bookmark jobs you're interested in and they'll appear here.",
      action: { href: "/findwork", label: "Browse jobs" },
    },
    applied: {
      title: "No applications yet",
      desc: "Jobs you've applied to will appear here.",
      action: { href: "/findwork", label: "Find work" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">My Jobs</h1>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border mb-6">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {id === "posts" && userJobs && userJobs.length > 0 && (
                  <span className="ml-1.5 text-xs bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                    {userJobs.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeJobs.map((job: Job) => (
                <MyJob key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-base font-medium text-foreground mb-1">
                {emptyMessages[activeTab].title}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {emptyMessages[activeTab].desc}
              </p>
              {emptyMessages[activeTab].action && (
                <Link
                  href={emptyMessages[activeTab].action!.href}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {emptyMessages[activeTab].action!.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyJobs;
