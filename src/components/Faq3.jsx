"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Faq3() {
  const navigate = useNavigate();

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to questions about renting and listing tools
          </p>
          <p className="mt-4 md:text-md">
            <Link to="/faqs" className="font-semibold text-link-primary underline underline-offset-[3px]">
              Browse all FAQs
            </Link>
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary" onClick={() => navigate("/contact-company")}>
              Contact
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I rent tools?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Search for the tool you need, check availability and pricing, then
              book your rental dates. Confirmation is instant. You can arrange
              pickup or delivery based on what works for you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              What if a tool breaks?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Every rental includes basic protection. Damage beyond normal wear
              is covered by the rental agreement. Contact support immediately if
              something goes wrong and we'll handle it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can I cancel my rental?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes. Cancellations made seven days before your rental start date
              receive a full refund. Cancellations within seven days are subject
              to a cancellation fee.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do companies list tools?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Companies create an account, upload tool information and photos,
              set pricing, and manage availability. The platform handles
              payments and customer communication automatically.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Is my payment information secure?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              All payments are processed through encrypted connections. We never
              store credit card information. Your data is protected by industry
              standard security protocols.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
