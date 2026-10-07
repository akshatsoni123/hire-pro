"use client";
import React from "react";
import formatMoney from "./utils/formatMoney";
import { usejobsContext } from "@/context/jobsContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const Filters = () => {
  const {
    handleFilterChange,
    filters,
    setFilters,
    minSalary,
    maxSalary,
    setMinSalary,
    setMaxSalary,
    searchJobs,
    setSearchQuery,
  } = usejobsContext();

  const clearAllFilters = () => {
    setFilters({
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
      fullStack: false,
      backend: false,
      devOps: false,
      uiUx: false,
    });
    setSearchQuery({ tags: "", location: "", title: "", skills: "", jobType: "" });
  };

  const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);
    if (value[0] > maxSalary) setMaxSalary(value[0]);
  };

  const handleMaxSalaryChange = (value: number[]) => {
    setMaxSalary(value[0]);
    if (value[0] < minSalary) setMinSalary(value[0]);
  };

  const filterRow = (id: string, label: string) => (
    <div key={id} className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={filters[id as keyof typeof filters]}
        onCheckedChange={() => handleFilterChange(id)}
      />
      <Label htmlFor={id} className="text-sm font-normal cursor-pointer">
        {label}
      </Label>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Job Type</h2>
          <button
            onClick={() => { clearAllFilters(); searchJobs(); }}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="space-y-2.5">
          {filterRow("fullTime", "Full Time")}
          {filterRow("partTime", "Part Time")}
          {filterRow("contract", "Contract")}
          {filterRow("internship", "Internship")}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Tags</h2>
        <div className="space-y-2.5">
          {filterRow("fullStack", "Full Stack")}
          {filterRow("backend", "Backend")}
          {filterRow("devOps", "DevOps")}
          {filterRow("uiUx", "UI/UX")}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Salary Range</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="minSalary" className="text-xs text-muted-foreground">Min</Label>
              <span className="text-xs font-medium text-foreground">{formatMoney(minSalary, "Rs")}</span>
            </div>
            <Slider
              id="minSalary"
              min={0}
              max={200000}
              step={1000}
              value={[minSalary]}
              onValueChange={handleMinSalaryChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="maxSalary" className="text-xs text-muted-foreground">Max</Label>
              <span className="text-xs font-medium text-foreground">{formatMoney(maxSalary, "Rs")}</span>
            </div>
            <Slider
              id="maxSalary"
              min={0}
              max={200000}
              step={1000}
              value={[maxSalary]}
              onValueChange={handleMaxSalaryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
