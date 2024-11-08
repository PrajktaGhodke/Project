import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
// import { saveJob } from "@/api/apijobs"; // Import saveJob function

import { Link } from "react-router-dom";
import { saveJobs } from "@/api/apijobs";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  // const {
  //   fn: fnSavedJob,

  //   data: savedJob,
  //   loading: loadingSavedJob,
  // } = useFetch(saveJobs, {
  //   alreadysaved: saved,
  // });
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJobs, {
    method: "POST",
    alreadysaved: saved,
  });

  const { user } = useUser();

  const handleSavedJob = async () => {
    setSaved((prevSaved) => !prevSaved);
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);
  return (
    <Card className="flex flex-col flex-1 m-2 ">
      <CardHeader>
        <CardTitle>
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img src={job.company.logo_url} className="h-6" alt="" />
          )}
          <div className="flex gP-2 items-center">
            <MapPinIcon size={15}></MapPinIcon>
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red"></Heart>
            ) : (
              <Heart size={20}></Heart>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
