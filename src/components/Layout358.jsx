"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout358() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Order</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Your tools are ready
            </h2>
            <p className="md:text-md">
              Review your rental before completing payment
            </p>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 border border-border-primary md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-sm font-semibold">Standard</p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Pneumatic drill with delivery
              </h3>
              <p>
                Seven-day rental starting tomorrow. Includes pickup service and
                full insurance coverage. Equipment will arrive between 8 AM and
                5 PM.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Change order" variant="secondary">
                Change order
              </Button>
              <Button
                title="Add items"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Add items
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
