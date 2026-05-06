"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PLACEHOLDER_SQUARE } from "../constants/placeholders";

export function Header77() {
  const navigate = useNavigate();

  return (
    <section
      id="relume"
      className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
    >
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          Rent tools from trusted companies
        </h1>
        <p className="md:text-md">
          Access thousands of professional tools without the cost of ownership.
          ToolShare Ledger connects you with equipment from the companies that
          know it best.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          <Button title="Browse" onClick={() => navigate("/all-tools")}>
            Browse
          </Button>
          <Button title="Learn" variant="secondary" onClick={() => navigate("/how-it-works")}>
            Learn
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 overflow-hidden bg-background-secondary py-8 md:py-16 lg:h-screen">
        <div className="grid shrink-0 grid-cols-1 gap-y-4">
          <div className="ml-[-8.5%] grid w-full animate-marquee-horizontally auto-cols-fr grid-cols-2 gap-4 self-center">
            <div className="grid w-full grid-flow-col gap-4">
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 1"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 2"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 3"
                />
              </div>
            </div>
            <div className="grid w-full grid-flow-col gap-4">
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 1"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 2"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 3"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full animate-marquee-horizontally grid-cols-2 gap-4 self-center">
            <div className="grid w-full grid-flow-col gap-4">
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 1"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 2"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 3"
                />
              </div>
            </div>
            <div className="grid w-full grid-flow-col gap-4">
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 1"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 2"
                />
              </div>
              <div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src={PLACEHOLDER_SQUARE}
                  alt="Relume placeholder image 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
