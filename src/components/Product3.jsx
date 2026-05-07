"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product3() {
  return (
    <section id="product3" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="font-semibold">Partners</p>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Companies
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Browse the businesses powering ToolShare Ledger
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Concrete saws</h3>
              <div className="text-sm font-normal">3 min read</div>
            </div>
            <div className="text-md md:text-lg">$45</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Hydraulic lifts</h3>
              <div className="text-sm font-normal">4 min read</div>
            </div>
            <div className="text-md md:text-lg">$120</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Welding rigs</h3>
              <div className="text-sm font-normal">5 min read</div>
            </div>
            <div className="text-md md:text-lg">$85</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Pneumatic drills</h3>
              <div className="text-sm font-normal">3 min read</div>
            </div>
            <div className="text-md md:text-lg">$30</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Scaffolding sets</h3>
              <div className="text-sm font-normal">6 min read</div>
            </div>
            <div className="text-md md:text-lg">$200</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Compressors</h3>
              <div className="text-sm font-normal">4 min read</div>
            </div>
            <div className="text-md md:text-lg">$65</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Angle grinders</h3>
              <div className="text-sm font-normal">Industrial</div>
            </div>
            <div className="text-md md:text-lg">$40</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Nail guns</h3>
              <div className="text-sm font-normal">Pneumatic</div>
            </div>
            <div className="text-md md:text-lg">$25</div>
          </a>
        </div>
        <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
          <Button variant="secondary" size="primary" title="Read more">
            Read more
          </Button>
        </div>
      </div>
    </section>
  );
}
