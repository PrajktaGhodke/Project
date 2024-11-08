import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { useUser, useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { ApplyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Eduacation is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "applications/msword"),
      {
        message: "Only PDF or  Word files are allowed",
      }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(ApplyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply For {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill The Form Below.</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            type="number"
            placeholder="Years of experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          ></Input>
          {errors.experience && (
            <p className="text-red-500"> {errors.experience.message}</p>
          )}

          <Input
            type="text"
            placeholder="Skills (Comma Seperated)"
            className="flex-1"
            {...register("skills")}
          ></Input>
          {errors.skills && (
            <p className="text-red-500"> {errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Intermediate"
                    id="intermediate"
                  ></RadioGroupItem>
                  <label htmlFor="intermediate">Intermediate</label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Graduate"
                    id="graduate"
                  ></RadioGroupItem>
                  <label htmlFor="graduate">Graduate</label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value=" Post Graduate"
                    id="post graduate"
                  ></RadioGroupItem>
                  <label htmlFor="post graduate">Post Graduate</label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 "
            {...register("resume")}
          ></Input>
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply && <p className="text-red-500">{errorApply?.message}</p>}
          {loadingApply && (
            <BarLoader width={"100%"} color="#36d7b7"></BarLoader>
          )}

          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
