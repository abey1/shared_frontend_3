"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React, { Fragment, useEffect, useState } from "react";

const Star = () => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

const useCarousel = () => {
  const [mainApi, setMainApi] = useState();
  const [thumbApi, setThumbApi] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!mainApi || !thumbApi) {
      return;
    }
    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi.scrollTo(index);
    });
  }, [mainApi, thumbApi]);
  const handleClick = (index) => () => {
    return mainApi?.scrollTo(index);
  };
  const getThumbStyles = (index) => {
    return clsx("block", current === index && "opacity-60");
  };
  return {
    setMainApi,
    setThumbApi,
    handleClick,
    getThumbStyles,
  };
};

export function ProductHeader8() {
  const useActive = useCarousel();
  return (
    <header id="productheader8" className="px-[5%] py-12 md:py-14 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-center lg:gap-x-16">
          <div>
            <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
              <BreadcrumbList>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Tools</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Category</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      Professional grade equipment
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              </BreadcrumbList>
            </Breadcrumb>
            <div>
              <h1 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Professional grade equipment
              </h1>
              <div className="mb-5 flex flex-col flex-wrap sm:flex-row md:mb-6">
                <p className="text-xl font-bold md:text-2xl">$45</p>
                <div className="mx-4 hidden w-px self-stretch bg-background-alternative sm:block" />
                <div className="flex flex-col gap-1">
                  <Star rating={3.5} />
                  <p className="text-sm">(4.8 stars) • 127 reviews</p>
                </div>
              </div>
              <Tabs defaultValue="tab-details">
                <TabsList className="mb-5 flex-wrap items-center gap-6 md:mb-6">
                  <TabsTrigger
                    value="tab-details"
                    className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                  >
                    Specs
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab-shipping"
                    className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                  >
                    Delivery arrives within two business days to your specified
                    location. We handle all logistics and setup.
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab-returns"
                    className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                  >
                    Return the tool within your rental window with no questions
                    asked. Full refund of your security deposit guaranteed.
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="tab-details"
                  className="data-[state=active]:animate-tabs"
                >
                  <p>Excellent</p>
                </TabsContent>
                <TabsContent
                  value="tab-shipping"
                  className="data-[state=active]:animate-tabs"
                >
                  <p>Excellent</p>
                </TabsContent>
                <TabsContent
                  value="tab-returns"
                  className="data-[state=active]:animate-tabs"
                >
                  <p>Excellent</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="order-first lg:order-none">
            <div className="flex flex-col gap-y-4">
              <div className="overflow-hidden">
                <Carousel
                  setApi={useActive.setMainApi}
                  opts={{ loop: true, align: "start" }}
                  className="m-0"
                >
                  <CarouselContent className="m-0">
                    <CarouselItem className="basis-full pl-0">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 1"
                        className="aspect-square size-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem className="basis-full pl-0">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 2"
                        className="aspect-square size-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem className="basis-full pl-0">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 3"
                        className="aspect-square size-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem className="basis-full pl-0">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 4"
                        className="aspect-square size-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem className="basis-full pl-0">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Relume placeholder image 5"
                        className="aspect-square size-full object-cover"
                      />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
              <div className="hidden overflow-y-auto lg:block">
                <Carousel
                  setApi={useActive.setThumbApi}
                  opts={{
                    align: "start",
                    containScroll: "keepSnaps",
                    dragFree: true,
                  }}
                  className="m-0"
                >
                  <CarouselContent className="gap-y-4">
                    <CarouselItem className="basis-1/5">
                      <button
                        onClick={useActive.handleClick(0)}
                        className={useActive.getThumbStyles(0)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 1"
                          className="aspect-square size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="basis-1/5">
                      <button
                        onClick={useActive.handleClick(1)}
                        className={useActive.getThumbStyles(1)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 2"
                          className="aspect-square size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="basis-1/5">
                      <button
                        onClick={useActive.handleClick(2)}
                        className={useActive.getThumbStyles(2)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 3"
                          className="aspect-square size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="basis-1/5">
                      <button
                        onClick={useActive.handleClick(3)}
                        className={useActive.getThumbStyles(3)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 4"
                          className="aspect-square size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                    <CarouselItem className="basis-1/5">
                      <button
                        onClick={useActive.handleClick(4)}
                        className={useActive.getThumbStyles(4)}
                      >
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Relume placeholder image 5"
                          className="aspect-square size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <div>
            <form className="mb-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <Label className="mb-2">Variant</Label>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
                    >
                      Select
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2"
                    >
                      Qty
                    </a>
                    <a
                      href="#"
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
                    >
                      1
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_4rem] gap-x-4">
                  <div className="flex flex-col">
                    <Label className="mb-2">Variant</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-choice">Option One</SelectItem>
                        <SelectItem value="second-choice">
                          Option Two
                        </SelectItem>
                        <SelectItem value="third-choice">
                          Option Three
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="quantity" className="mb-2">
                      Qty
                    </Label>
                    <Input
                      type="number"
                      id="quantity"
                      placeholder="1"
                      className="w-16"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 mt-8 flex flex-col gap-y-4">
                <Button title="Reserve now">Reserve now</Button>
                <Button title="Save for later" variant="secondary">
                  Save for later
                </Button>
              </div>
              <p className="text-center text-xs">Satisfaction guaranteed</p>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
