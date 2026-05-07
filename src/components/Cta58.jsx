"use client";

import { Button, Input } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React from "react";

export function Cta58() {
  return (
    <section id="cta58" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          <h2>
            <motion.span
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{ type: "spring", bounce: 0 }}
              className="block text-6xl font-bold md:text-9xl lg:text-10xl"
            >
              Complete your
            </motion.span>
          </h2>
          <h2>
            <motion.span
              initial={{ x: "50%" }}
              animate={{ x: "0%" }}
              transition={{ type: "spring", bounce: 0 }}
              className="mb-5 block text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl"
            >
              rental payment
            </motion.span>
          </h2>
          <p className="md:text-md">
            Enter your card details below to secure your tool rental
          </p>
          <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
            <form className="mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Card number" />
              <Button title="Pay now">Pay now</Button>
            </form>
            <p className="text-xs">
              By clicking Pay now you're confirming that you agree with our
              Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
