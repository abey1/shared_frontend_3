"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog2() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Categories</p>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Browse Categories
            </h1>
            <p className="md:text-md">
              Find exactly what you need by exploring our complete collection
              organized by type and purpose
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
            <a
              href="#"
              className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary bg-background-primary border px-4 py-2 border-border-primary"
            >
              View all
            </a>
            <a
              href="#"
              className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
            >
              Power tools
            </a>
            <a
              href="#"
              className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
            >
              Gardening gear
            </a>
            <a
              href="#"
              className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
            >
              Hand tools
            </a>
            <a
              href="#"
              className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
            >
              Specialty equipment
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Construction
                </p>
                <p className="inline text-sm font-semibold">3 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Choosing the right drill for your project
                </h2>
              </a>
              <p>
                Learn which drill type works best for concrete, wood, and metal
                applications.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Landscaping
                </p>
                <p className="inline text-sm font-semibold">4 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Seasonal tool rentals save money and space
                </h2>
              </a>
              <p>
                Rent mowers and trimmers only when you need them instead of
                storing year-round.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  General
                </p>
                <p className="inline text-sm font-semibold">5 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Essential hand tools every homeowner should know
                </h2>
              </a>
              <p>
                Master the basics with wrenches, hammers, and screwdrivers that
                handle most jobs.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Professional
                </p>
                <p className="inline text-sm font-semibold">6 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Heavy equipment rental for serious contractors
                </h2>
              </a>
              <p>
                Access industrial-grade tools without the burden of ownership
                and maintenance costs.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Maintenance
                </p>
                <p className="inline text-sm font-semibold">4 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Keep your tools in shape between rentals
                </h2>
              </a>
              <p>
                Simple maintenance tips extend tool life and ensure reliable
                performance every time.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Seasonal
                </p>
                <p className="inline text-sm font-semibold">3 min read</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Plan ahead for spring and fall projects
                </h2>
              </a>
              <p>
                Rent seasonal tools early to avoid shortages during peak demand
                periods.
              </p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Read more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
