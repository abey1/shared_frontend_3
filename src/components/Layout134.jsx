"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout134() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Origin</p>
        <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Built on a simple belief
        </h2>
        <p className="md:text-md">
          We started ToolShare Ledger because we saw waste. Companies had
          equipment sitting idle while others paid premium prices for tools they
          used once. There had to be a better way.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Learn" variant="secondary">
            Learn
          </Button>
          <Button
            title="Explore"
            variant="link"
            size="link"
            iconRight={<RxChevronRight />}
          >
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}
