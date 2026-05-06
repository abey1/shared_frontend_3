"use client";

import { Button } from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";

export function Timeline20() {
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Timeline</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Track your rentals from start to finish
            </h2>
            <p className="md:text-md">
              See what you have now, what's coming, and what's gone. Everything
              in order, nothing missed.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Extend" variant="secondary">
                Extend
              </Button>
              <Button
                title="↓"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                ↓
              </Button>
            </div>
          </div>
        </div>
        <div className="relative grid auto-cols-fr grid-flow-row grid-cols-1 items-center justify-center md:grid-flow-col md:grid-cols-[max-content_1fr] md:justify-normal">
          <div className="relative hidden md:grid md:grid-cols-1 md:gap-4">
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
            </div>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mb-0 md:mr-4">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">Today</h3>
                <p>Circular saw due back at the rental location by 5 PM.</p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mb-0 md:mr-4">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">Tomorrow</h3>
                <p>
                  Power drill pickup scheduled for 9 AM at the downtown
                  warehouse.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="hidden md:block" />
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mb-0 md:mr-4">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  Next week
                </h3>
                <p>
                  Scaffolding rental ends. Return window opens Monday through
                  Friday.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mb-0 md:mr-4">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  Two weeks
                </h3>
                <p>
                  Concrete mixer available for extension if your project runs
                  longer.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="hidden md:block" />
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full hidden md:block" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mb-0 md:mr-4">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">Past</h3>
                <p>
                  Jackhammer returned on schedule. Next rental ready whenever
                  you need it.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="absolute right-0 z-0 h-1 w-16 bg-gradient-to-r from-transparent to-white" />
        </div>
      </div>
    </section>
  );
}
