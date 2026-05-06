import React from 'react'
import { Navbar6 } from '../components/Navbar6'
import { Header77 } from '../components/Header77'
import { Layout522 } from '../components/Layout522'
import { Layout356 } from '../components/Layout356'
import { Gallery10 } from '../components/Gallery10'
import { Testimonial43 } from '../components/Testimonial43'
import { Layout237 } from '../components/Layout237'
import { Faq3 } from '../components/Faq3'
import { Cta51 } from '../components/Cta51'
import { Cta2 } from '../components/Cta2'
import { Footer1 } from '../components/Footer1'

export default function Home() {
  return (
    <div>
      <Navbar6 />
      <Header77 />
      <Layout522 />
      <Layout356 />
      <Gallery10 />
      <Testimonial43 />
      <Layout237 />
      <Faq3 />
      <Cta51 partnerPath="/contact-company" />
      <Cta2 />
      <Footer1 />
    </div>
  )
}
