"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout399() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">How</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Four simple steps
            </h2>
            <p className="md:text-md">
              From search to return, the process is straightforward and built
              for your convenience.
            </p>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">One</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Search and find what you need
                </h3>
                <p>
                  Browse our catalog by category or search for specific tools.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Browse"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Browse
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Two</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Choose your rental dates and confirm
                </h3>
                <p>
                  Select when you need the tool and review transparent pricing
                  before checkout.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Select"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Select
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Three</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Receive your tools at your location
                </h3>
                <p>
                  We deliver to your address on your preferred date with
                  tracking updates.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Receive"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Receive
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Four</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Return when you're finished
                </h3>
                <p>
                  Schedule a pickup or drop off at a convenient location near
                  you.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Return"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Return
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
