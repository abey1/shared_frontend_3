"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog60() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Stories</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
              Learn from the companies
            </h1>
            <p className="md:text-md">
              Discover how businesses are succeeding with ToolShare Ledger
            </p>
          </div>
          <div className="hidden flex-wrap items-center justify-end md:block">
            <Button title="View all" variant="secondary">
              View all
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
          <div className="flex size-full flex-col items-center justify-start border border-border-primary">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              alt="Relume placeholder image"
              className="aspect-video size-full object-cover"
            />
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-3 flex w-full items-center justify-start md:mb-4">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Business
                </p>
                <p className="inline text-sm font-semibold">3 min read</p>
              </div>
              <h2 className="mb-2 text-xl font-bold md:text-2xl">
                How industrial firms built their rental programs
              </h2>
              <p>Learn what makes equipment sharing work at scale</p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 flex items-center justify-center gap-x-2 md:mt-6"
              >
                Read more
              </Button>
            </div>
          </div>
          <div className="flex size-full flex-col items-center justify-start border border-border-primary">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              alt="Relume placeholder image"
              className="aspect-video size-full object-cover"
            />
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-3 flex w-full items-center justify-start md:mb-4">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  Strategy
                </p>
                <p className="inline text-sm font-semibold">4 min read</p>
              </div>
              <h2 className="mb-2 text-xl font-bold md:text-2xl">
                Why major contractors choose ToolShare Ledger
              </h2>
              <p>Discover the advantages of centralized tool management</p>
              <Button
                title="Read more"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 flex items-center justify-center gap-x-2 md:mt-6"
              >
                Read more
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-end md:hidden">
          <Button title="View all" variant="secondary">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
