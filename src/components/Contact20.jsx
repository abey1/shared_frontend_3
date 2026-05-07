"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact20() {
  return (
    <section id="contact20" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Support</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Need help
          </h2>
          <p className="md:text-md">We're here when you need us most</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-3 md:gap-y-16">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Email
            </h3>
            <p className="mb-5 md:mb-6">Send us a message anytime</p>
            <a className="underline" href="#">
              hello@relume.io
            </a>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3>
            <p className="mb-5 md:mb-6">Call during business hours</p>
            <a className="underline" href="#">
              +1 (555) 000-0000
            </a>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Office
            </h3>
            <p className="mb-5 md:mb-6">Visit us in person</p>
            <a className="underline" href="#">
              123 Sample St, Sydney NSW 2000 AU
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
