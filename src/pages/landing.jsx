import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "../components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import Autoplay from "embla-carousel-autoplay";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  );
}

import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 justify-center ">
        <section className="text-center ml-20">
          <h1 className="flex flex-col items-center justify-center text-center gradient-title text-3xl font-extrabold sm:text-4xl lg:text-7xl tracking-tighter py-4 ml-20 ">
            Find Your Dream Job{" "}
            <span className="flex items-center gap-2">
              And Get Hired
              {/* <img src="/logo.png" alt="" className="h-12 sm:h-22 lg:h-32" /> */}
            </span>
          </h1>
          <p className="text-gray-300 sm:mt-5 ml-10 text-xs sm:text-xl">
            {" "}
            Explore thousands of job listing or find the perfect candidate
          </p>
        </section>
        <div className="flex gap-6 justify-center ml-20 rounded-sm">
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </Link>

          <Link to="/post-job">
            <Button size="xl" variant="destructive">
              Post a Job
            </Button>
          </Link>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10 ml-20 "
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div>
          <img src="/banner.jpeg" alt="" className="w-full ml-20" />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-14 ml-40 cursor-pointer">
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Search and apply for jobs, track applications, and more.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Post jobs, manage applications, and find the best candidates.
              </p>
            </CardContent>
          </Card>
        </section>

        <Accordion type="single" collapsible className="ml-20">
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </>
  );
};

export default LandingPage;
