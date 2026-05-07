"use client";

import { Button } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const Circle = () => {
  const circleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });
  const backgroundColor = {
    backgroundColor: useTransform(scrollYProgress, [0.85, 1], ["#ccc", "#000"]),
  };
  return (
    <motion.div
      ref={circleRef}
      style={backgroundColor}
      className="z-20 mt-9 size-[0.9375rem] rounded-full shadow-[0_0_0_8px_white] md:mt-12"
    />
  );
};

export function Timeline12() {
  return (
    <section id="timeline12" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="relative z-10 w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Milestones</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Our journey so far
              </h2>
              <p className="md:text-md">
                From a conversation between two contractors to a platform
                connecting thousands, we've stayed true to our purpose. Every
                step forward was driven by listening to what people actually
                needed.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <Button title="Explore" variant="secondary">
                  Explore
                </Button>
                <Button
                  title="Learn"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Learn
                </Button>
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-1 justify-items-center gap-12 md:gap-20">
            <div className="absolute flex h-full w-8 flex-col items-center justify-self-start md:justify-self-auto">
              <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-background-primary to-transparent" />
              <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-neutral-black" />
              <div className="h-full w-[3px] bg-neutral-lighter" />
              <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-background-primary" />
              <div className="absolute top-[-50vh] h-[50vh] w-full bg-background-primary" />
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="hidden w-full md:block" />
                <div className="flex h-full w-8 justify-center">
                  <Circle />
                </div>
                <div className="grid grid-cols-1 border border-border-primary">
                  <div className="p-6 md:p-8">
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      2019
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      The beginning
                    </h4>
                    <p>
                      Two friends realized the equipment rental market was
                      broken. They decided to fix it.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <Button title="Read" variant="secondary">
                        Read
                      </Button>
                      <Button
                        title="More"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        More
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 1"
                      className="w-full"
                    />
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="grid grid-cols-1 border border-border-primary">
                  <div className="p-6 md:p-8">
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      2020
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      First partnerships
                    </h4>
                    <p>
                      Major contractors began listing their surplus equipment.
                      The platform proved it could work at scale.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <Button title="Read" variant="secondary">
                        Read
                      </Button>
                      <Button
                        title="More"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        More
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 2"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="order-first flex h-full w-8 justify-center md:order-none">
                  <Circle />
                </div>
                <div className="hidden w-full md:block" />
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="hidden w-full md:block" />
                <div className="flex h-full w-8 justify-center">
                  <Circle />
                </div>
                <div className="grid grid-cols-1 border border-border-primary">
                  <div className="p-6 md:p-8">
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      2022
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Rapid expansion
                    </h4>
                    <p>
                      We crossed into new markets and added thousands of tools.
                      The network effect became undeniable.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <Button title="Read" variant="secondary">
                        Read
                      </Button>
                      <Button
                        title="More"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        More
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 3"
                      className="w-full"
                    />
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="grid grid-cols-1 border border-border-primary">
                  <div className="p-6 md:p-8">
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      2024
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Where we stand
                    </h4>
                    <p>
                      ToolShare Ledger now connects companies and renters across
                      the country. We're just getting started.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <Button title="Read" variant="secondary">
                        Read
                      </Button>
                      <Button
                        title="More"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        More
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 4"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="order-first flex h-full w-8 justify-center md:order-none">
                  <Circle />
                </div>
                <div className="hidden w-full md:block" />
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
