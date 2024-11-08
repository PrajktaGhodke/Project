import { getJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/job-card";
import { getCompanies } from "@/api/apiCompanies";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();
  const {
    data: jobs,
    fn: fnJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search_query");
    if (query) setSearchQuery(query);
  };
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d767" />;
  }

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  };

  return (
    <div className="ml-20">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs By Title"
          name="search_query"
          className="h-full flex-1 px-4 text-md"
        ></Input>

        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter By Location"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter By Company"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={clearFilters}
          variant="destructive"
          className="am:w-12"
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7"></BarLoader>
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-col-2 lg:grid-cols-3 gap-1">
          {jobs?.length ? (
            jobs.map((job) => {
              // return <JobCard key={job.id} job={job} />;
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div No Jobs Found></div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
