"use client";
import React from "react";
import Header from "@/components/header";
import JobForm from "../../components/PostJob/jobForm";
import Footer from "@/components/footer";

const PostJobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Post a Job</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Fill in the details below to list a new role.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6 md:p-8">
            <JobForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostJobs;