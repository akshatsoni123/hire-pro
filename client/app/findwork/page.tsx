"use client";
import Header from "@/components/header";
import React, { useState } from "react";
import { usejobsContext } from "@/context/jobsContext";
import SearchForm from "@/components/SearchForm";
import { LayoutGrid, List } from "lucide-react";
import JobCard from "@/components/JobItem/jobCard";
import { Job } from "@/types/types";
import Filters from "@/components/Filters";
import Footer from "@/components/footer";

const FindWork = () => {
  const { jobs, filters } = usejobsContext();
  const [listView, setListView] = useState(false);

  const filteredJobs =
    filters.fullTime || filters.partTime || filters.contract || filters.internship
      ? jobs.filter((job: Job) => {
          if (filters.fullTime && job.jobType.includes("Full Time")) return true;
          if (filters.partTime && job.jobType.includes("Part Time")) return true;
          if (filters.contract && job.jobType.includes("Contract")) return true;
          if (filters.internship && job.jobType.includes("Internship")) return true;
          if (filters.fullStack && job.tags.includes("Full Stack")) return true;
          if (filters.backend && job.tags.includes("Backend")) return true;
          if (filters.devOps && job.tags.includes("DevOps")) return true;
          if (filters.uiUx && job.tags.includes("UI/UX")) return true;
          return false;
        })
      : jobs;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Search bar area */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Find Work</h1>
          <SearchForm />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 items-start">
            {/* Filters sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <Filters />
            </aside>

            {/* Job listings */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"} found
                </p>
                <button
                  onClick={() => setListView(!listView)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 transition-colors hover:bg-accent"
                  aria-label="Toggle view"
                >
                  {listView ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                  {listView ? "Grid" : "List"}
                </button>
              </div>

              {filteredJobs.length > 0 ? (
                <div
                  className={`grid gap-4 ${
                    listView ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {filteredJobs.map((job: Job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-base font-medium text-foreground mb-1">No roles found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
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

export default FindWork;
