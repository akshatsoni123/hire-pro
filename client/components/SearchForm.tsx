"use client";
import { usejobsContext } from "@/context/jobsContext";
import { Search, MapPin } from "lucide-react";

const SearchForm = () => {
  const { searchJobs, handleSearchChange, searchQuery } = usejobsContext();

  return (
    <form
      className="flex items-center rounded-md border border-border bg-white shadow-sm overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        const query = `title=${searchQuery.title}&location=${searchQuery.location}&tags=${searchQuery.tags}&jobType=${searchQuery.jobType}&skills=${searchQuery.skills}`;
        searchJobs(query);
      }}
    >
      <div className="flex-1 flex items-center px-3 gap-2">
        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          id="job-title"
          name="title"
          value={searchQuery.title}
          onChange={(e) => handleSearchChange("title", e.target.value)}
          placeholder="Job title or keyword"
          className="w-full py-2.5 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="w-px h-6 bg-border flex-shrink-0" />

      <div className="flex-1 flex items-center px-3 gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          id="location"
          name="location"
          value={searchQuery.location}
          onChange={(e) => handleSearchChange("location", e.target.value)}
          placeholder="Location"
          className="w-full py-2.5 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>

      <button
        type="submit"
        className="flex-shrink-0 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-sm font-medium transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
