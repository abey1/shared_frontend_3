import { Button, Input } from '@relume_io/relume-ui'
import { useState } from 'react'
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const useForm = () => {
  const [email, setEmail] = useState('')
  const handleSetEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ email })
  }
  return {
    email,
    handleSetEmail,
    handleSubmit,
  }
}

export default function Footer() {
  const formState = useForm()
  return (
    <footer id="footer" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
          <div className="flex flex-col">
            <Link to="/" className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                alt="Logo image"
                className="inline-block"
              />
            </Link>
            <p className="mb-5 md:mb-6">
              Get updates on new tools and rental opportunities.
            </p>
            <div className="w-full max-w-md">
              <form
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                onSubmit={formState.handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formState.email}
                  onChange={formState.handleSetEmail}
                />
                <Button title="Subscribe" variant="secondary" size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs">
                By subscribing you agree to our{' '}
                <Link to="/faqs" className="underline">
                  Privacy Policy
                </Link>{' '}
                and consent to receive updates.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">Browse</h2>
              <ul>
                <li className="py-2 text-sm">
                  <Link to="/all-tools" className="flex items-center gap-3">
                    <span>Find tools</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/categories" className="flex items-center gap-3">
                    <span>Categories</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/how-it-works" className="flex items-center gap-3">
                    <span>How it works</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/all-tools" className="flex items-center gap-3">
                    <span>Pricing</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/about-company" className="flex items-center gap-3">
                    <span>Company</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-semibold md:mb-4">About us</h2>
              <ul>
                <li className="py-2 text-sm">
                  <Link to="/for-companies" className="flex items-center gap-3">
                    <span>For companies</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/rental-account-dashboard" className="flex items-center gap-3">
                    <span>For renters</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/categories" className="flex items-center gap-3">
                    <span>Blog</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/contact-company" className="flex items-center gap-3">
                    <span>Contact us</span>
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <a href="#relume-social" className="flex items-center gap-3">
                    <span>Follow us</span>
                  </a>
                </li>
              </ul>
            </div>
            <div id="relume-social" className="flex flex-col items-start justify-start scroll-mt-24">
              <h2 className="mb-3 font-semibold md:mb-4">Social</h2>
              <ul className="flex flex-col items-start">
                <li className="py-2 text-sm">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <BiLogoFacebookCircle className="size-6" aria-hidden />
                    <span>Facebook</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <BiLogoInstagram className="size-6" aria-hidden />
                    <span>Instagram</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <FaXTwitter className="size-6 p-0.5" aria-hidden />
                    <span>X</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <BiLogoLinkedinSquare className="size-6" aria-hidden />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <BiLogoYoutube className="size-6" aria-hidden />
                    <span>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-6 md:mt-0">© {new Date().getFullYear()} Relume. All rights reserved.</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <Link to="/faqs">Terms of service</Link>
            </li>
            <li className="underline">
              <Link to="/faqs">Cookie settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
