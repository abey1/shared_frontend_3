import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    closeMenus,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

/** In-app links: collapses mobile menu and Resources mega-menu after navigation. */
function NavbarLink({ onNavigate, to, className, children, onClick, ...rest }) {
  return (
    <RouterLink
      to={to}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        onNavigate();
      }}
    >
      {children}
    </RouterLink>
  );
}

export default function Navbar() {
  const useActive = useRelume();
  const navigate = useNavigate();
  const closeMenus = useActive.closeMenus;

  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <NavbarLink onNavigate={closeMenus} to="/">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Logo image"
          />
        </NavbarLink>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <NavbarLink onNavigate={closeMenus}
              to="/for-companies"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Companies
            </NavbarLink>
            <NavbarLink onNavigate={closeMenus}
              to="/categories"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Categories
            </NavbarLink>
            <NavbarLink onNavigate={closeMenus}
              to="/how-it-works"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              How it works
            </NavbarLink>
            <NavbarLink onNavigate={closeMenus}
              to="/about-company"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              About us
            </NavbarLink>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                className="relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>Resources</span>
                <motion.span
                  animate={useActive.animateDropdownMenuIcon}
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <RxChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                <motion.nav
                  variants={{
                    open: {
                      opacity: 1,
                      display: "block",
                      height: "var(--height-open, auto)",
                    },
                    close: {
                      opacity: 0,
                      display: "none",
                      height: "var(--height-close, 0)",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                >
                  <div className="mx-auto flex size-full max-w-full items-center justify-between">
                    <div className="flex w-full flex-col lg:flex-row">
                      <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                        <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                          <h4 className="text-sm font-semibold leading-[1.3]">
                            For users
                          </h4>
                          <NavbarLink onNavigate={closeMenus}
                            to="/how-it-works"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 1"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">How it works</h5>
                              <p className="hidden text-sm md:block">
                                Browse available tools in your area
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/all-tools"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 2"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">
                                See our rental rates and plans
                              </h5>
                              <p className="hidden text-sm md:block">
                                Sign in or create account
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/faqs"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 3"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">FAQs</h5>
                              <p className="hidden text-sm md:block">
                                Find answers to common questions
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/contact-company"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 4"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Contact us</h5>
                              <p className="hidden text-sm md:block">
                                Reach out with any inquiries
                              </p>
                            </div>
                          </NavbarLink>
                        </div>
                        <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                          <h4 className="text-sm font-semibold leading-[1.3]">
                            For companies
                          </h4>
                          <NavbarLink onNavigate={closeMenus}
                            to="/for-companies"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 5"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">For companies</h5>
                              <p className="hidden text-sm md:block">
                                List your tools and earn revenue
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/testimonials"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 6"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Testimonials</h5>
                              <p className="hidden text-sm md:block">
                                Read what our users say
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/rental-history"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 7"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Case studies</h5>
                              <p className="hidden text-sm md:block">
                                See real results from our platform
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/categories"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 8"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Blog</h5>
                              <p className="hidden text-sm md:block">
                                Tips and insights for tool sharing
                              </p>
                            </div>
                          </NavbarLink>
                        </div>
                        <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                          <h4 className="text-sm font-semibold leading-[1.3]">
                            About us
                          </h4>
                          <NavbarLink onNavigate={closeMenus}
                            to="/about-company"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 9"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Learn our story</h5>
                              <p className="hidden text-sm md:block">
                                Learn more
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/all-tools"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 10"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Featured</h5>
                              <p className="hidden text-sm md:block">
                                The right tool for every job
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/faqs"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 11"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Read more</h5>
                              <p className="hidden text-sm md:block">
                                View all articles
                              </p>
                            </div>
                          </NavbarLink>
                          <NavbarLink onNavigate={closeMenus}
                            to="/rental-account-dashboard"
                            className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                          >
                            <div className="flex size-6 flex-col items-center justify-center">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                alt="Icon 12"
                                className="shrink-0"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className="font-semibold">Sign up</h5>
                              <p className="hidden text-sm md:block">Log in</p>
                            </div>
                          </NavbarLink>
                        </div>
                      </div>
                      <div className="max-w-none relative mb-4 flex flex-1 p-6 md:max-w-[50rem] md:p-8 lg:mb-0 lg:max-w-xxs lg:py-8 lg:pl-8 lg:pr-0">
                        <div className="relative z-10 grid w-full grid-cols-1 grid-rows-[auto_max-content] gap-y-4">
                          <h4 className="text-sm font-semibold leading-[1.3]">
                            Latest from our blog
                          </h4>
                          <div className="max-w-none grid w-full grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start gap-y-2 md:block">
                            <NavbarLink onNavigate={closeMenus} to="/all-tools" className="flex flex-col py-2">
                              <div className="relative mb-3 w-full overflow-hidden pt-[56.25%]">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 2"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="mt-2 flex max-w-[18rem] flex-col justify-start md:mt-0">
                                <h5 className="mb-1 font-semibold">
                                  Equipment rental trends
                                </h5>
                                <p className="text-sm">
                                  What's changing in the rental market
                                </p>
                                <div className="mt-2">
                                  <span className="text-sm font-semibold text-link-primary underline underline-offset-[3px]">
                                    Read more
                                  </span>
                                </div>
                              </div>
                            </NavbarLink>
                          </div>
                          <div className="flex items-center">
                            <Button
                              title="See all articles"
                              variant="link"
                              size="link"
                              iconRight={<RxChevronRight />}
                              onClick={() => {
                                navigate("/all-tools");
                                closeMenus();
                              }}
                            >
                              See all articles
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-auto top-0 min-w-full bg-background-secondary lg:min-w-[100vw]" />
                      </div>
                    </div>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              title="Sign up"
              variant="secondary"
              size="sm"
              onClick={() => {
              navigate("/rental-account-dashboard");
              closeMenus();
            }}
            >
              Sign up
            </Button>
            <Button
              title="Login"
              size="sm"
              onClick={() => {
              navigate("/rental-account-dashboard");
              closeMenus();
            }}
            >
              Login
            </Button>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={useActive.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute left-0 right-0 top-full w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={useActive.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 top-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-8 pt-4"
          >
            <div className="flex flex-col">
              <NavbarLink onNavigate={closeMenus}
                to="/for-companies"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Companies
              </NavbarLink>
              <NavbarLink onNavigate={closeMenus}
                to="/categories"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Categories
              </NavbarLink>
              <NavbarLink onNavigate={closeMenus}
                to="/how-it-works"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                How it works
              </NavbarLink>
              <div>
                <button
                  className="relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                  onClick={useActive.openOnMobileDropdownMenu}
                >
                  <span>Resources</span>
                  <motion.span
                    animate={useActive.animateDropdownMenuIcon}
                    variants={{
                      rotated: { rotate: 180 },
                      initial: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  <motion.nav
                    variants={{
                      open: {
                        opacity: 1,
                        display: "block",
                        height: "var(--height-open, auto)",
                      },
                      close: {
                        opacity: 0,
                        display: "none",
                        height: "var(--height-close, 0)",
                      },
                    }}
                    animate={useActive.animateDropdownMenu}
                    initial="close"
                    exit="close"
                    transition={{ duration: 0.2 }}
                    className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                  >
                    <div className="mx-auto flex size-full max-w-full items-center justify-between">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group one
                            </h4>
                            <NavbarLink onNavigate={closeMenus}
                              to="/how-it-works"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 1"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">How it works</h5>
                                <p className="hidden text-sm md:block">
                                  Browse tools and rental basics
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/all-tools"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 2"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">All tools</h5>
                                <p className="hidden text-sm md:block">
                                  Plans and pricing
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/faqs"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 3"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">FAQs</h5>
                                <p className="hidden text-sm md:block">
                                  Common questions
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/contact-company"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 4"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Contact</h5>
                                <p className="hidden text-sm md:block">
                                  Get in touch
                                </p>
                              </div>
                            </NavbarLink>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group two
                            </h4>
                            <NavbarLink onNavigate={closeMenus}
                              to="/for-companies"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 5"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">For companies</h5>
                                <p className="hidden text-sm md:block">
                                  B2B rentals
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/testimonials"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 6"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Testimonials</h5>
                                <p className="hidden text-sm md:block">
                                  Customer stories
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/rental-history"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 7"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Rental history</h5>
                                <p className="hidden text-sm md:block">
                                  Past bookings
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/categories"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 8"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Categories</h5>
                                <p className="hidden text-sm md:block">
                                  Browse by type
                                </p>
                              </div>
                            </NavbarLink>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group three
                            </h4>
                            <NavbarLink onNavigate={closeMenus}
                              to="/about-company"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 9"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">About us</h5>
                                <p className="hidden text-sm md:block">
                                  Our story
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/all-tools"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 10"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Featured tools</h5>
                                <p className="hidden text-sm md:block">
                                  Popular picks
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/faqs"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 11"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Help center</h5>
                                <p className="hidden text-sm md:block">
                                  More answers
                                </p>
                              </div>
                            </NavbarLink>
                            <NavbarLink onNavigate={closeMenus}
                              to="/rental-account-dashboard"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 12"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Account</h5>
                                <p className="hidden text-sm md:block">
                                  Sign up or log in
                                </p>
                              </div>
                            </NavbarLink>
                          </div>
                        </div>
                        <div className="max-w-none relative mb-4 flex flex-1 p-6 md:max-w-[50rem] md:p-8 lg:mb-0 lg:max-w-xxs lg:py-8 lg:pl-8 lg:pr-0">
                          <div className="relative z-10 grid w-full grid-cols-1 grid-rows-[auto_max-content] gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Featured from Blog
                            </h4>
                            <div className="max-w-none grid w-full grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start gap-y-2 md:block">
                              <NavbarLink onNavigate={closeMenus} to="/all-tools" className="flex flex-col py-2">
                                <div className="relative mb-3 w-full overflow-hidden pt-[56.25%]">
                                  <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                    alt="Relume placeholder image 2"
                                    className="absolute inset-0 size-full object-cover"
                                  />
                                </div>
                                <div className="mt-2 flex max-w-[18rem] flex-col justify-start md:mt-0">
                                  <h5 className="mb-1 font-semibold">
                                    Article Title
                                  </h5>
                                  <p className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                  <div className="mt-2">
                                    <span className="text-sm font-semibold text-link-primary underline underline-offset-[3px]">
                                      Read more
                                    </span>
                                  </div>
                                </div>
                              </NavbarLink>
                            </div>
                            <div className="flex items-center">
                              <Button
                                title="See all articles"
                                variant="link"
                                size="link"
                                iconRight={<RxChevronRight />}
                                onClick={() => {
                                navigate("/all-tools");
                                closeMenus();
                              }}
                              >
                                See all articles
                              </Button>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-auto top-0 min-w-full bg-background-secondary lg:min-w-[100vw]" />
                        </div>
                      </div>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <Button
                  title="Sign up"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
              navigate("/rental-account-dashboard");
              closeMenus();
            }}
                >
                  Sign up
                </Button>
                <Button
                  title="Login"
                  size="sm"
                  onClick={() => {
              navigate("/rental-account-dashboard");
              closeMenus();
            }}
                >
                  Login
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
