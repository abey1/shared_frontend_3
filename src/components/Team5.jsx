"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiLogoDribbble, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function Team5() {
  return (
    <section id="team5" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">People</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Our team
          </h2>
          <p className="md:text-md">We hired people who understand the work</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">Marcus Webb</h5>
              <h6 className="md:text-md">Chief executive</h6>
            </div>
            <p>
              Spent fifteen years in construction before building this platform.
              Knows the pain points firsthand.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">
                Elena Rodriguez
              </h5>
              <h6 className="md:text-md">Chief operations</h6>
            </div>
            <p>
              Managed logistics for major equipment suppliers. Built the systems
              that keep everything running.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">James Chen</h5>
              <h6 className="md:text-md">Chief technology</h6>
            </div>
            <p>
              Former engineer at a Fortune 500 company. Designed the
              infrastructure that scales with us.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">
                Patricia Okafor
              </h5>
              <h6 className="md:text-md">Head of partnerships</h6>
            </div>
            <p>
              Spent a decade building relationships in industrial sectors. Knows
              every major player in the game.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">David Larson</h5>
              <h6 className="md:text-md">Head of product</h6>
            </div>
            <p>
              Started three companies before joining us. Understands what users
              actually want versus what they say.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">
                Sophie Mercier
              </h5>
              <h6 className="md:text-md">Head of marketing</h6>
            </div>
            <p>
              Built communities from nothing. Knows how to tell a story that
              matters to people.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            We're hiring
          </h4>
          <p className="md:text-md">
            Join us if you believe in what we're building
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button title="Open positions" variant="secondary">
              Open positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
