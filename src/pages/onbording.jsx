import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function Onbording() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })

      .catch((err) => {
        console.log("Erroe Updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  });

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradiant-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a....
      </h2>

      <div className="  mt-16 grid grid-cols-2 gap-4 w-full ma:px-40  ml-60">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onbording;