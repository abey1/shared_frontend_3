"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PLACEHOLDER_SQUARE } from "../constants/placeholders";

export function Layout522() {
  const navigate = useNavigate();

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Why choose us</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              What sets us apart
            </h2>
            <p className="md:text-md">
              Thousands of tools ready when you need them
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="relative p-6 sm:col-span-2 md:p-8 lg:p-12">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src={PLACEHOLDER_SQUARE}
                className="size-full object-cover"
                alt=""
              />
            </div>
            <div className="relative z-10">
              <p className="mb-2 inline-block text-sm font-semibold text-text-alternative">
                Variety
              </p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] text-text-alternative md:mb-6 md:text-5xl lg:text-6xl">
                Tools from industry leaders
              </h3>
              <p className="text-text-alternative">
                Every tool comes from verified companies you can trust
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button variant="secondary-alt" onClick={() => navigate("/categories")}>
                  Explore
                </Button>
                <Button
                  iconRight={<RxChevronRight />}
                  variant="link-alt"
                  size="link"
                  onClick={() => navigate("/rental-history")}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col p-6 md:p-8 lg:p-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src={PLACEHOLDER_SQUARE}
                className="size-full object-cover"
                alt=""
              />
            </div>
            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-text-alternative md:text-2xl">
                Book in minutes, not hours
              </h3>
              <p className="text-text-alternative">
                Simple search and instant confirmation for your rentals
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <Button
                  iconRight={<RxChevronRight />}
                  variant="link-alt"
                  size="link"
                  onClick={() => navigate("/how-it-works")}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col p-6 md:p-8 lg:p-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src={PLACEHOLDER_SQUARE}
                className="size-full object-cover"
                alt=""
              />
            </div>
            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-text-alternative md:text-2xl">
                Transparent pricing with no surprises
              </h3>
              <p className="text-text-alternative">
                Know exactly what you pay before you commit
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <Button
                  iconRight={<RxChevronRight />}
                  variant="link-alt"
                  size="link"
                  onClick={() => navigate("/all-tools")}
                >
                  Check
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
