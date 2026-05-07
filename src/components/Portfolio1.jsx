"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Portfolio1() {
  return (
    <section id="portfolio1" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">History</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Your rental record
            </h2>
            <p className="md:text-md">Look back at what you've rented</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:gap-20">
          <div>
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="mt-5 grid grid-cols-1 items-start justify-between justify-items-start gap-x-12 gap-y-6 md:mt-6 md:grid-cols-[1fr_max-content] lg:gap-x-20">
              <div>
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  <a href="#">Drill rental</a>
                </h3>
                <p>Rented for three weeks last summer</p>
              </div>
              <div>
                <Button
                  title="View details"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  <a href="#">View details</a>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="mt-5 grid grid-cols-1 items-start justify-between justify-items-start gap-x-12 gap-y-6 md:mt-6 md:grid-cols-[1fr_max-content] lg:gap-x-20">
              <div>
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  <a href="#">Saw rental</a>
                </h3>
                <p>Used for weekend woodworking project</p>
              </div>
              <div>
                <Button
                  title="View details"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  <a href="#">View details</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button title="See all" variant="secondary" size="primary">
            See all
          </Button>
        </div>
      </div>
    </section>
  );
}
