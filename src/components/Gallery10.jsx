"use client";

import React from "react";
import { Link } from "react-router-dom";
import { PLACEHOLDER_LANDSCAPE, PLACEHOLDER_SQUARE } from "../constants/placeholders";

const tiles = [
  { to: "/tools/circular-saw", src: PLACEHOLDER_SQUARE, alt: "Placeholder tool photo" },
  { to: "/tools/extension-ladder", src: PLACEHOLDER_SQUARE, alt: "Placeholder tool photo" },
  { to: "/all-tools", src: PLACEHOLDER_LANDSCAPE, alt: "Placeholder tool photo" },
  { to: "/categories", src: PLACEHOLDER_LANDSCAPE, alt: "Placeholder category photo" },
  { to: "/tools/scaffold-tower", src: PLACEHOLDER_SQUARE, alt: "Placeholder tool photo" },
  { to: "/tools/portable-generator", src: PLACEHOLDER_SQUARE, alt: "Placeholder tool photo" },
  { to: "/tools/plate-compactor", src: PLACEHOLDER_SQUARE, alt: "Placeholder tool photo" },
];

export function Gallery10() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Popular tools
          </h2>
          <p className="md:text-md">See what's available to rent right now</p>
        </div>
        <div className="gap-8 space-y-8 md:columns-3">
          {tiles.map(({ to, src, alt }) => (
            <Link key={to} to={to} className="block w-full">
              <img src={src} alt={alt} className="size-full object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
