"use client";

import { Button } from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { PLACEHOLDER_STEP } from "../constants/placeholders";

export function Layout356() {
  const navigate = useNavigate();

  return (
    <section id="relume">
      <div className="sticky top-0">
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 top-0 lg:mb-32">
            <div className="px-[5%]">
              <div className="container">
                <Link
                  to="/all-tools"
                  className="flex h-16 w-full items-center underline"
                >
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    01
                  </span>
                  <h1 className="font-semibold md:text-md">Search tools</h1>
                </Link>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                    <div>
                      <p className="mb-3 font-semibold md:mb-4">Browse</p>
                      <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                        Find what you need in seconds
                      </h2>
                      <p className="md:text-md">
                        Start with what you're looking for. Filter by type,
                        location, and availability. The platform shows you
                        everything available right now, nothing hidden or
                        delayed.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                        <Button title="Explore" variant="secondary" onClick={() => navigate("/all-tools")}>
                          Explore
                        </Button>
                        <Button
                          title="View"
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          onClick={() => navigate("/categories")}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={PLACEHOLDER_STEP(1)}
                        className="h-[25rem] w-full object-cover sm:h-[30rem] lg:h-[60vh]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-16 lg:-mt-16 lg:mb-16">
            <div className="px-[5%]">
              <div className="container">
                <Link
                  to="/how-it-works"
                  className="flex h-16 w-full items-center underline"
                >
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    02
                  </span>
                  <h1 className="font-semibold md:text-md">Select rental</h1>
                </Link>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                    <div>
                      <p className="mb-3 font-semibold md:mb-4">Browse</p>
                      <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                        Find what you need in seconds
                      </h2>
                      <p className="md:text-md">
                        Start with what you're looking for. Filter by type,
                        location, and availability. The platform shows you
                        everything available right now, nothing hidden or
                        delayed.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                        <Button title="Explore" variant="secondary" onClick={() => navigate("/categories")}>
                          Explore
                        </Button>
                        <Button
                          title="View"
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          onClick={() => navigate("/how-it-works")}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={PLACEHOLDER_STEP(2)}
                        className="h-[25rem] w-full object-cover sm:h-[30rem] lg:h-[60vh]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-32 lg:mb-16">
            <div className="px-[5%]">
              <div className="container">
                <Link
                  to="/rental-history"
                  className="flex h-16 w-full items-center underline"
                >
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    03
                  </span>
                  <h1 className="font-semibold md:text-md">Get tools</h1>
                </Link>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                    <div>
                      <p className="mb-3 font-semibold md:mb-4">Browse</p>
                      <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                        Find what you need in seconds
                      </h2>
                      <p className="md:text-md">
                        Start with what you're looking for. Filter by type,
                        location, and availability. The platform shows you
                        everything available right now, nothing hidden or
                        delayed.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                        <Button title="Explore" variant="secondary" onClick={() => navigate("/rental-history")}>
                          Explore
                        </Button>
                        <Button
                          title="View"
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          onClick={() => navigate("/rentals/demo-item")}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={PLACEHOLDER_STEP(3)}
                        className="h-[25rem] w-full object-cover sm:h-[30rem] lg:h-[60vh]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </section>
  );
}
