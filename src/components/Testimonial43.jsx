"use client";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PLACEHOLDER_AVATAR, PLACEHOLDER_LOGO_WIDE } from "../constants/placeholders";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return `mx-[3px] inline-block size-2 rounded-full ${
      current === index + 1 ? "bg-black" : "bg-neutral-light"
    }`;
  };

  return { api, setApi, current, handleDotClick, dotClassName };
};

export function Testimonial43() {
  const navigate = useNavigate();
  const carousel = useCarousel();
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="w-full max-w-md lg:mb-24">
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Real stories
            </h2>
            <p className="md:text-md">
              Hear from people who've used ToolShare Ledger
            </p>
          </div>
          <Carousel
            setApi={carousel.setApi}
            opts={{ loop: true, align: "start" }}
            className="overflow-hidden"
          >
            <CarouselContent>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Webflow logo 1"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "I saved thousands by renting instead of buying. The tools
                    arrived in perfect condition and the whole process took
                    minutes."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Marcus Chen</p>
                      <p>Contractor, Denver</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Relume logo 2"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "Our equipment sits idle most months. Renting it out through
                    ToolShare Ledger generates real income with zero hassle."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 2"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Mitchell</p>
                      <p>Operations manager, Austin</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Webflow logo 1"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "No more waiting for equipment to arrive. Everything I need
                    is available within hours, not weeks."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">James Rodriguez</p>
                      <p>Project manager, Seattle</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Relume logo 2"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "The platform handles everything. We list our tools once and
                    the system manages all the rentals and payments."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 2"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Elena Vasquez</p>
                      <p>Fleet manager, Phoenix</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Webflow logo 1"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "Renting tools for a one-time project made perfect sense. No
                    storage problems, no maintenance headaches."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">David Park</p>
                      <p>Owner, Portland</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Relume logo 2"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "We've cut equipment costs by forty percent since switching
                    to ToolShare Ledger for our smaller jobs."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 2"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Lisa Thompson</p>
                      <p>Director, San Diego</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full">
                <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
                  <div className="mb-8 md:mb-10 lg:mb-12">
                    <img
                      src={PLACEHOLDER_LOGO_WIDE}
                      alt="Webflow logo 1"
                      className="max-h-12"
                    />
                  </div>
                  <blockquote className="md:text-md">
                    "The rental process is transparent and fair. We know exactly
                    what we're paying and what we're getting."
                  </blockquote>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src={PLACEHOLDER_AVATAR}
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Robert Walsh</p>
                      <p>Supervisor, Boston</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="py-1"
                      onClick={() => navigate("/testimonials")}
                    >
                      Read case study
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="mt-12 flex items-center justify-between">
              <div className="mt-5 flex w-full items-start justify-start">
                <button
                  onClick={carousel.handleDotClick(0)}
                  className={carousel.dotClassName(0)}
                />
                <button
                  onClick={carousel.handleDotClick(1)}
                  className={carousel.dotClassName(1)}
                />
                <button
                  onClick={carousel.handleDotClick(2)}
                  className={carousel.dotClassName(2)}
                />
                <button
                  onClick={carousel.handleDotClick(3)}
                  className={carousel.dotClassName(3)}
                />
                <button
                  onClick={carousel.handleDotClick(4)}
                  className={carousel.dotClassName(4)}
                />
                <button
                  onClick={carousel.handleDotClick(5)}
                  className={carousel.dotClassName(5)}
                />
                <button
                  onClick={carousel.handleDotClick(6)}
                  className={carousel.dotClassName(6)}
                />
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
                <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
