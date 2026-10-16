'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ArrowRight,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  Utensils,
  Wine,
  Calendar,
  Compass,
  Check,
  Menu,
  X,
  Phone,
  Clock,
} from 'lucide-react';
import { HeroSwiper } from '@/components/HeroSwiper';
import { DishDetailModal } from '@/components/DishDetailModal';
import { ReservationModal } from '@/components/ReservationModal';
import { AtelierModal } from '@/components/AtelierModal';
import { CellarModal } from '@/components/CellarModal';
import { MenuModal } from '@/components/MenuModal';
import { ReviewsModal } from '@/components/ReviewsModal';
import { GalleryModal } from '@/components/GalleryModal';
import { LocationModal } from '@/components/LocationModal';
import { SerialMenuShowcase } from '@/components/SerialMenuShowcase';
import { PEDESTAL_DISHES, DishItem } from '@/lib/restaurant-data';

export default function HomePage() {
  // Modal states
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);
  const [isCellarOpen, setIsCellarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [infoDialog, setInfoDialog] = useState<{ title: string; text: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active navigation indicator
  const [activeNav, setActiveNav] = useState('home');

  // Scroll spy to dynamically sync activeNav with visible section
  React.useEffect(() => {
    const handleScroll = () => {
      // Do not override if user opened a modal like cellar, reservation, or contact
      if (isCellarOpen || isBookingOpen || isLocationOpen || isReviewsOpen) return;

      const scrollPos = window.scrollY + 220;
      const aboutEl = document.getElementById('about');
      const menuEl = document.getElementById('menu');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveNav('about');
      } else if (menuEl && scrollPos >= menuEl.offsetTop) {
        setActiveNav('menu');
      } else {
        setActiveNav('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCellarOpen, isBookingOpen, isLocationOpen, isReviewsOpen]);

  // Close mobile menu on resize to desktop (>= 1024px)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on Escape key and manage body overflow
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Static dishes from our curated data
  const scallopDish = PEDESTAL_DISHES[0];
  const morelsDish = PEDESTAL_DISHES[1];
  const ganacheDish = PEDESTAL_DISHES[2];

  return (
    <div className="min-h-screen py-2 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8 max-w-full overflow-x-hidden">
      {/* Outer framed container matching the exact tablet mockup border from the screenshot */}
      <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-10 lg:px-12 bg-[#F3EFE6] rounded-2xl sm:rounded-[36px] md:rounded-[48px] shadow-2xl border border-[#DFD8C9] overflow-hidden">
        
        {/* BEGIN: Header (Sticky & Fully Responsive Across All Devices) */}
        <header
          className="sticky top-0 z-40 bg-[#F3EFE6]/95 backdrop-blur-md py-3 sm:py-5 border-b border-[#E3DBD0]/80 transition-all duration-300 -mx-3.5 sm:-mx-6 md:-mx-10 lg:-mx-12 px-3.5 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between"
          data-purpose="main-nav"
        >
          {/* Monogram Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('home');
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="L'ÉTOILE Home"
            className="group flex items-center gap-2 sm:gap-3 transition-transform duration-300 shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-[#8C7A65] flex items-center justify-center p-1.5 sm:p-2 text-[#715E49] transition-all duration-500 group-hover:scale-105 group-hover:border-[#524438] group-hover:shadow-[0_4px_16px_rgba(113,94,73,0.18)]">
              {/* Stylized Gastronomy Monogram Emblem */}
              <svg
                className="w-4.5 h-4.5 sm:w-6 sm:h-6 stroke-[1.2] transition-transform duration-700 ease-out group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 40 40"
              >
                <circle cx="20" cy="20" r="18" strokeDasharray="2 2" />
                <path
                  d="M20 7V33M12 15C12 21 28 21 28 15M14 26C14 29 26 29 26 26"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-serif text-base sm:text-xl md:text-2xl tracking-widest text-[#2D261E] font-medium transition-colors duration-300 group-hover:text-[#15110E] whitespace-nowrap">
              {"L'ÉTOILE"}
            </span>
          </a>

          {/* Desktop Navigation Menu (Active on screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-2 py-1.5 rounded-full bg-[#EDE6D8]/80 backdrop-blur-md border border-[#DDD3C2]/90 shadow-[0_2px_12px_-4px_rgba(46,40,32,0.08)] text-xs font-semibold tracking-[0.18em]">
            {[
              {
                key: 'home',
                label: 'HOME',
                onClick: () => {
                  setActiveNav('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                },
              },
              {
                key: 'menu',
                label: 'MENU',
                onClick: () => {
                  setActiveNav('menu');
                  const el = document.getElementById('menu');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setIsMenuOpen(true);
                  }
                },
              },
              {
                key: 'about',
                label: 'ABOUT',
                onClick: () => {
                  setActiveNav('about');
                  const el = document.getElementById('about');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setIsAtelierOpen(true);
                  }
                },
              },
              {
                key: 'cellar',
                label: 'CELLAR',
                onClick: () => {
                  setActiveNav('cellar');
                  setIsCellarOpen(true);
                },
              },
              {
                key: 'reservations',
                label: 'RESERVATION',
                onClick: () => {
                  setActiveNav('reservations');
                  setIsBookingOpen(true);
                },
              },
              {
                key: 'contact',
                label: 'CONTACT',
                onClick: () => {
                  setActiveNav('contact');
                  setIsLocationOpen(true);
                },
              },
            ].map((item) => {
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.onClick}
                  className={`relative px-3.5 xl:px-4 py-1.5 rounded-full uppercase cursor-pointer select-none transition-colors duration-200 z-10 text-[11px] xl:text-xs font-semibold tracking-[0.18em] ${
                    isActive
                      ? 'text-[#1F1A14] font-bold'
                      : 'text-[#655848] hover:text-[#1F1A14] hover:bg-[#E2D8C5]/40'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 inline-block">
                    {item.label}
                  </span>

                  {isActive && (
                    <>
                      {/* Modern Floating Cream Pill with Spring Layout Animation */}
                      <motion.div
                        layoutId="activeDesktopNavPill"
                        className="absolute inset-0 rounded-full bg-[#FAF7F2] border border-[#D5C6B1] shadow-[0_2px_10px_rgba(46,40,32,0.12),0_1px_3px_rgba(46,40,32,0.06)] -z-0"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }}
                      />
                      {/* Modern Radiant Golden Micro-Underline with Ambient Glow */}
                      <motion.div
                        layoutId="activeDesktopNavGlow"
                        className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent shadow-[0_0_8px_rgba(193,154,107,0.75)] z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }}
                      />
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Book A Table CTA Button & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              data-purpose="cta-booking"
              className="inline-flex items-center justify-center px-3 sm:px-6 md:px-7 py-2 sm:py-2.5 rounded-full border border-[#443C32] text-[11px] sm:text-xs font-semibold tracking-wider text-[#2E2820] hover:bg-[#2E2820] hover:text-[#FAF8F5] active:scale-95 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(46,40,32,0.35)] cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">BOOK A TABLE</span>
              <span className="sm:hidden">RESERVE</span>
            </button>

            {/* Mobile / Tablet Menu Button (Visible on screens < 1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-[#8C7A65]/50 text-[#332A21] hover:bg-[#EAE2D3] active:scale-95 transition-all cursor-pointer shrink-0 relative overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.75 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.75 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </header>

        {/* Mobile / Tablet Responsive Slide-over Navigation Drawer with Smooth Spring Physics */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
              {/* Backdrop with smooth fade in/out */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-black/55 backdrop-blur-xs"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer Content with smooth spring slide */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                  mass: 0.85,
                }}
                className="relative w-full max-w-[340px] sm:max-w-[380px] h-full bg-[#F3EFE6] text-[#2E2820] shadow-[0_0_50px_rgba(0,0,0,0.3)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l border-[#DFD8C9] z-10"
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#E3DBD0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full border border-[#8C7A65] flex items-center justify-center p-1.5 text-[#715E49]">
                        <svg
                          className="w-5 h-5 stroke-[1.2]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 40 40"
                        >
                          <circle cx="20" cy="20" r="18" strokeDasharray="2 2" />
                          <path
                            d="M20 7V33M12 15C12 21 28 21 28 15M14 26C14 29 26 29 26 26"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="font-serif text-lg tracking-widest text-[#2D261E] font-medium">
                        {"L'ÉTOILE"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close navigation"
                      className="w-9 h-9 rounded-full border border-[#8C7A65]/40 flex items-center justify-center text-[#554C40] hover:bg-[#EAE2D3] active:scale-95 transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Navigation Items with smooth staggered entrance */}
                  <nav className="py-6 flex flex-col space-y-1 text-sm font-semibold tracking-wider">
                    {[
                      {
                        key: 'home',
                        label: 'HOME',
                        desc: 'Overview',
                        action: () => {
                          setActiveNav('home');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        },
                      },
                      {
                        key: 'menu',
                        label: 'OUR MENU',
                        desc: '6 Courses',
                        action: () => {
                          setActiveNav('menu');
                          setIsMobileMenuOpen(false);
                          const el = document.getElementById('menu');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            setIsMenuOpen(true);
                          }
                        },
                      },
                      {
                        key: 'about',
                        label: 'ABOUT US',
                        desc: 'Chef Alexandre',
                        action: () => {
                          setActiveNav('about');
                          setIsMobileMenuOpen(false);
                          const el = document.getElementById('about');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            setIsAtelierOpen(true);
                          }
                        },
                      },
                      {
                        key: 'cellar',
                        label: 'WINE CELLAR',
                        desc: 'Grand Cru',
                        action: () => {
                          setActiveNav('cellar');
                          setIsMobileMenuOpen(false);
                          setIsCellarOpen(true);
                        },
                      },
                      {
                        key: 'reviews',
                        label: 'REVIEWS',
                        desc: 'Michelin 3★',
                        action: () => {
                          setActiveNav('reviews');
                          setIsMobileMenuOpen(false);
                          setIsReviewsOpen(true);
                        },
                      },
                      {
                        key: 'reservations',
                        label: 'RESERVATION',
                        desc: 'Book Table',
                        action: () => {
                          setActiveNav('reservations');
                          setIsMobileMenuOpen(false);
                          setIsBookingOpen(true);
                        },
                      },
                      {
                        key: 'contact',
                        label: 'CONTACT',
                        desc: 'Mayfair',
                        action: () => {
                          setActiveNav('contact');
                          setIsMobileMenuOpen(false);
                          setIsLocationOpen(true);
                        },
                      },
                    ].map((item, idx) => {
                      const isActive = activeNav === item.key;
                      return (
                        <motion.button
                          key={item.key}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.08 + idx * 0.035,
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onClick={item.action}
                          className={`relative flex items-center justify-between py-3 px-4 rounded-xl transition-all cursor-pointer text-left overflow-hidden select-none ${
                            isActive
                              ? 'text-[#1F1A14] font-bold shadow-xs'
                              : 'text-[#554C40] hover:bg-[#EAE2D3] hover:text-[#1F1A14]'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveNavPill"
                              className="absolute inset-0 bg-[#E5DCCB] border-l-4 border-[#C19A6B] rounded-xl z-0"
                              transition={{
                                type: 'spring',
                                stiffness: 420,
                                damping: 32,
                              }}
                            />
                          )}
                          <span className="relative z-10">{item.label}</span>
                          <span
                            className={`relative z-10 text-[11px] font-normal transition-colors ${
                              isActive ? 'text-[#5B4C38] font-medium' : 'text-[#8A7965]'
                            }`}
                          >
                            {item.desc}
                          </span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

                {/* Drawer Footer & Direct CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-5 border-t border-[#E3DBD0] space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3.5 px-4 rounded-full bg-[#2E2820] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase hover:bg-[#443C32] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C19A6B]" />
                    <span>Reserve A Table</span>
                  </button>

                  <div className="space-y-2 text-xs text-[#6B5F50] pt-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#8C7A65] shrink-0" />
                      <span>Dinner: Daily 17:30 – 23:30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8C7A65] shrink-0" />
                      <span>14 Berkeley Square, Mayfair, London</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8C7A65] shrink-0" />
                      <a href="tel:+442079460912" className="hover:text-[#1F1A14] transition-colors underline-offset-2 hover:underline">
                        +44 20 7946 0912
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* END: Header */}

        {/* BEGIN: Hero Section with Swiper JS */}
        <HeroSwiper
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
        {/* END: Hero Section */}

        {/* BEGIN: Main Content Grid (Our Menu with Serial Cards + Philosophy + Reviews) */}
        <section className="py-4 sm:py-10 relative space-y-8 sm:space-y-10" data-purpose="menu-showcase" id="menu">
          {/* The Serial Menu Cards (Up-to-down on mobile, side-by-side on tablet/desktop) */}
          <SerialMenuShowcase
            dishes={PEDESTAL_DISHES}
            onSelectDish={(dish) => setSelectedDish(dish)}
            onOpenMenu={() => setIsMenuOpen(true)}
          />

          {/* Culinary Philosophy Banner with reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#EAE2D3]/70 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div className="max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A7965] font-semibold">
                Kitchen Ethos
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#221C16] mt-1">
                Culinary Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5F50] mt-2 leading-relaxed">
                Every creation is built with seasonal biodynamic harvests, artisanal fermentations, and ancient fire roasting techniques. We honor French precision and coastal nature.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#2E2820] text-xs font-semibold tracking-wider text-[#FAF8F5] hover:bg-[#443C32] transition-all duration-300 shrink-0 cursor-pointer whitespace-nowrap active:scale-95"
            >
              Explore Tasting Journey
            </button>
          </motion.div>

          {/* CUSTOMER REVIEWS with reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#EAE2D3]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            data-purpose="customer-reviews"
            id="reviews"
          >
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#C19A6B]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[11px] font-sans text-[#786D5E] font-medium">
                  The Michelin Guide 2024
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#221C16] font-normal">
                Customer Reviews
              </h3>
              <div
                onClick={() => setIsReviewsOpen(true)}
                className="border-l-2 border-[#8A7965] pl-3 py-1 cursor-pointer group/rev"
              >
                <p className="text-xs sm:text-sm text-[#5D5243] leading-relaxed italic group-hover/rev:text-[#1F1A14] transition-colors">
                  &ldquo;An unforgettable symphonic dinner. The scallop crudo and wine pairing remain unequaled in all our travels.&rdquo;
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsReviewsOpen(true)}
                className="inline-block px-6 py-2.5 rounded-full bg-[#D4C8B5] hover:bg-[#C2B5A0] text-[#29221B] text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Read Guest Stories
              </button>
            </div>
          </motion.div>
        </section>
        {/* END: Main Content Grid */}

        {/* BEGIN: Bento Highlights Section with Staggered Card Reveal */}
        <section className="py-12 border-t border-[#E1D8CA]" data-purpose="gallery-bento-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bento 1: Cellar Reserves */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#DFD7C7] p-6 rounded-3xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 group"
            >
              <div>
                <h3 className="font-serif text-2xl text-[#221C16] font-medium transition-transform duration-300 group-hover:translate-x-0.5">
                  Cellar Reserves
                </h3>
                <p className="text-xs text-[#635747] mt-3 leading-relaxed">
                  Rare vintages, natural small-batch biodynamic vineyards, and bespoke pairings curated by head sommelier.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => setIsCellarOpen(true)}
                  className="px-5 py-2 rounded-full bg-[#1F1A14] text-[#FAF8F5] text-xs font-semibold tracking-wider hover:bg-[#383027] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Explore Cellar
                </button>
              </div>
            </motion.div>

            {/* Bento 2: Dark Food Feature Card (The Tasting Table) */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setGalleryIndex(0)}
              className="bg-[#181410] rounded-3xl overflow-hidden p-3 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="View Tasting Table gallery photo"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setGalleryIndex(0);
              }}
            >
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  alt="Gourmet dinner tabletop arrangement"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm_F8GT_y-pZMb-m_IoE2MNAfZo0pShbzfkbmV53BeV2MKvH2U7CsVYRH0cLf3pol3e1GQCGPmMiUluGgtYKZqdmL-5EWQdGL2sqzENso_yd2ZEN_cqjx9BwnZ5PbFIcdaQQxFDrUN9a34XHZz9kvMmZKAlhV1zuw5JWvQsoor5CutH8yp97EYn77MspEGE6LVDXp6rgBKEkAQNyXYTAOPWMtsSF6RbVM6GbJA3YRIGUcKckyYYGJc"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-3 text-center">
                <span className="text-xs text-[#D8CEBF] font-serif tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
                  The Tasting Table
                </span>
              </div>
            </motion.div>

            {/* Bento 3: The Gallery Editorial Card */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#DFD7C7] p-6 rounded-3xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 group"
            >
              <div>
                <h3 className="font-serif text-2xl text-[#221C16] font-medium transition-transform duration-300 group-hover:translate-x-0.5">
                  The Gallery
                </h3>
                <p className="text-xs text-[#635747] mt-3 leading-relaxed">
                  Step into the architectural ambiance: brutalist travertine textures, soft linen drapery, and warm candlelit intimacy.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => setGalleryIndex(3)}
                  className="px-5 py-2 rounded-full bg-[#1F1A14] text-[#FAF8F5] text-xs font-semibold tracking-wider hover:bg-[#383027] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Private Events
                </button>
              </div>
            </motion.div>

            {/* Bento 4: Gallery Imagery Collage / Plating */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#D9CEBC] rounded-3xl overflow-hidden p-3 transition-all duration-500 hover:-translate-y-1.5 group cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-2 h-full">
                <div
                  onClick={() => setGalleryIndex(1)}
                  className="rounded-xl overflow-hidden h-24 sm:h-28"
                  role="button"
                  tabIndex={0}
                  aria-label="View refined appetizers"
                >
                  <img
                    alt="Refined appetizers"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJfV1b0n63xPYWRkjuFlRNU0_3qla259BYULyzajV_6fNIBGx_6GMQ7p0Rzod6zWV6CLo09ie6_yMSKwPXsJPWmPfw5PKOzYktZPIJrynEFu4CZEh4Egn3ZUckE44ljr4wfmPIrWSYy2-l5MqeLQnieUQgk9qkPj98uu4KomsIh1KZlseoKYD7hpkw-rxM2e5XmN7eJ0NANWTn7qzkrmin2gJuDNb6HC9SNIv5IDS9FCSk7lSbIRC_"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div
                  onClick={() => setGalleryIndex(2)}
                  className="rounded-xl overflow-hidden h-24 sm:h-28"
                  role="button"
                  tabIndex={0}
                  aria-label="View dessert architecture"
                >
                  <img
                    alt="Culinary delicacy presentation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYe8e27w9DFls_l-i5TKujtOKAC_lXwAu-jxjSlQUonIiAQzTsgWbotEgO3bXR9_r9qp1mJG1kCodWUaHZI0ckQQIYCk-NleMsb6lMu24KDLkAJLv1D2N9UZTJQiaKD2lsJxfeTdZhoHv108PnQSJiirVeCqY05FIs7KkaEP9Q1IUmdqLJkhUPJbLF9H8tetKqM4x6vkIxry0YNb-WNfRIiTUxcPAyjYPyg7xhTewKnH8RMRuC4i1"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div
                  onClick={() => setGalleryIndex(3)}
                  className="rounded-xl overflow-hidden col-span-2 h-24"
                  role="button"
                  tabIndex={0}
                  aria-label="View dining ambiance"
                >
                  <img
                    alt="Candlelit dining atmosphere"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlk9e-E_idyC7lqb_DrGFHlNLf8rTVdpQtWF9a2TYverDRyw2f60tF8Cxd1f775SYssVWWEScF8i1Xtvmnm-jbPKlIQrOTfS6m6o_jGbYfwl4ePXhz6WQ78rxviziqCosNew_AMykkT0t6ZnLPGDJZVXQZKEIAIh-AM6NVpcZmu6Tqv_91ousnBaoua1AaV-wU03X-DGisL7o1Yw7MzLrRVYQob2tQVaVnf21DR19NgD1JjwsYa01K"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>
        {/* END: Bento Highlights Section */}

        {/* BEGIN: About Us Section (Positioned Directly Above Footer) with Reveal */}
        <section className="my-10 sm:my-16" id="about" data-purpose="about-section">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsAtelierOpen(true)}
            className="relative rounded-3xl overflow-hidden bg-[#1E1914] text-[#FAF8F5] flex flex-col lg:flex-row group transition-all duration-500 cursor-pointer"
            data-purpose="about-card"
            role="button"
            tabIndex={0}
            aria-label="Meet Executive Chef Alexandre Moreau and the Atelier"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsAtelierOpen(true);
            }}
          >
            {/* Floating Indicator Icon */}
            <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-xs animate-badge-pulse">
              ✦
            </div>

            {/* Left Text Content */}
            <div className="p-7 sm:p-10 lg:p-12 lg:w-1/2 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C19A6B] font-semibold">
                  Mastery &amp; Lineage
                </span>
                <span className="text-[10px] text-[#A89C8C] uppercase tracking-wider">
                  • Three Michelin Stars
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5EFE6] font-normal mb-4 transition-transform duration-500 group-hover:translate-x-1">
                About Us
              </h2>
              <p className="text-xs sm:text-sm text-[#BCB0A0] leading-relaxed mb-4 transition-colors duration-500 group-hover:text-[#D5C9B8]">
                Led by Michelin-starred Executive Chef Alexandre Moreau, our kitchen elevates gastronomy into sculptural storytelling. We honor French precision, coastal nature, and ancestral fire roasting.
              </p>
              <p className="text-xs text-[#8E8272] leading-relaxed mb-6 hidden sm:block">
                Every plate is a tribute to small-batch biodynamic farmers, maritime fishermen, and wild botanicals gathered daily from Brittany to Provence.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E5D7C2] uppercase group/link">
                <span className="border-b border-transparent group-hover:border-[#E5D7C2] transition-all duration-300">
                  Meet the Atelier &amp; Philosophy
                </span>
                <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>

            {/* Right Chef Portrait */}
            <div className="lg:w-1/2 h-72 sm:h-80 lg:h-auto min-h-[280px] relative overflow-hidden">
              <img
                alt="Executive Chef Alexandre Moreau in white uniform inside elegant restaurant"
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:brightness-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4TRI5myWEwEFE1e0-Y0LZMU58UGJQ9HjqHwYVggWmJjoXJfroNYIgtedrjvK8byibhmf5vK69lvU5CB1kSLtnZdENIyrFuinH0sANNuClu9dCFoZuBfeMo_FfRKtc_cBGBdR9QGeCPs3A0wxID5CUnboejMYmv_bODX3y0tFHMeI-KPmaYmSvcDyrJKxD8D0Qgbqgb-O-pxZv73IgjrJu9PsWW1r5hSrxCvC2qZB2ppgwLodmkf5n"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1E1914] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F5] text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C19A6B]" />
                <span>Chef Alexandre Moreau</span>
              </div>
            </div>
          </motion.div>
        </section>
        {/* END: About Us Section */}

        {/* BEGIN: Footer */}
        <footer
          className="pt-10 pb-8 border-t border-[#DFD6C7] mt-4"
          data-purpose="site-footer"
          id="contact"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
            
            {/* Column 1: Restaurant Info */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg tracking-wider text-[#241E18] uppercase font-semibold">
                {"L'Étoile Atelier"}
              </h4>
              <p className="text-xs text-[#6F6352] leading-relaxed">
                42 Rue de la Paix, 75002 Paris<br />
                reservations@letoile-dining.com<br />
                +33 (0) 1 42 68 55 00
              </p>
              {/* Social Media Icons in Circular Badges */}
              <div className="flex items-center space-x-2 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#302720] text-[#EFEBE4] flex items-center justify-center hover:bg-[#524438] hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Instagram className="w-4 h-4 transition-transform duration-300 hover:rotate-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#302720] text-[#EFEBE4] flex items-center justify-center hover:bg-[#524438] hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Facebook className="w-4 h-4 transition-transform duration-300 hover:rotate-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-[#302720] text-[#EFEBE4] flex items-center justify-center hover:bg-[#524438] hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Twitter className="w-4 h-4 transition-transform duration-300 hover:rotate-6" />
                </a>
              </div>
            </div>

            {/* Column 2: Hours */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg tracking-wider text-[#241E18] uppercase font-semibold">
                Service Hours
              </h4>
              <ul className="text-xs text-[#6F6352] space-y-1.5">
                <li className="flex justify-between border-b border-[#E3DBD0] pb-1 hover:text-[#2A241E] transition-colors duration-200">
                  <span>Wednesday – Friday:</span>
                  <span className="font-mono">18:30 – 23:30</span>
                </li>
                <li className="flex justify-between border-b border-[#E3DBD0] pb-1 hover:text-[#2A241E] transition-colors duration-200">
                  <span>Saturday &amp; Sunday:</span>
                  <span className="font-mono">12:00 – 15:30 / 18:30 – 00:00</span>
                </li>
                <li className="flex justify-between text-[#8E8272] hover:text-[#2A241E] transition-colors duration-200">
                  <span>Monday &amp; Tuesday:</span>
                  <span>Private Bookings Only</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Recognition */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg tracking-wider text-[#241E18] uppercase font-semibold">
                Recognition
              </h4>
              <ul className="text-xs text-[#6F6352] space-y-1.5">
                <li
                  onClick={() => setIsReviewsOpen(true)}
                  className="hover:translate-x-1 hover:text-[#2A241E] transition-all duration-300 cursor-pointer"
                >
                  Three Michelin Stars (2021–2024)
                </li>
                <li
                  onClick={() => setIsReviewsOpen(true)}
                  className="hover:translate-x-1 hover:text-[#2A241E] transition-all duration-300 cursor-pointer"
                >
                  {"World's 50 Best Restaurants #12"}
                </li>
                <li
                  onClick={() => setIsCellarOpen(true)}
                  className="hover:translate-x-1 hover:text-[#2A241E] transition-all duration-300 cursor-pointer"
                >
                  Grand Prix du Sommelier 2023
                </li>
                <li
                  onClick={() => setIsAtelierOpen(true)}
                  className="hover:translate-x-1 hover:text-[#2A241E] transition-all duration-300 cursor-pointer"
                >
                  Sustainable Gastronomy Clover Leaf
                </li>
              </ul>
            </div>

            {/* Column 4: Interactive Map Widget */}
            <div className="space-y-2">
              <h4 className="font-serif text-lg tracking-wider text-[#241E18] uppercase font-semibold">
                Location
              </h4>
              <div
                onClick={() => setIsLocationOpen(true)}
                className="rounded-2xl overflow-hidden border border-[#D5C9B7] bg-[#EAE3D5] shadow-sm p-1.5 group cursor-pointer hover:border-[#8C7A65] hover:shadow-md transition-all duration-500"
                role="button"
                tabIndex={0}
                aria-label="Open location map and directions"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIsLocationOpen(true);
                }}
              >
                {/* Stylized Map Container */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden">
                  <img
                    alt="Map view placeholder"
                    className="w-full h-full object-cover filter saturate-[0.6] contrast-[0.9] group-hover:scale-105 group-hover:saturate-[0.8] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXabAsX4z-4SupNRkFakwm9aAecBn719L_fbbbqgrfHplJZLMkUMf5dhUMr13D5y7dr-MXEvv9YGZo_6vd5aXC_WQ8JndFYQk8s0wMpBihkifNhos58j8SW7P_XwWwLijZjt8VeAl9N8yDq2wFD9R5YvyispPZGQC--dPdS5E3w6NY_-JQCWEOoAZ-m_tGnj2iUvdaC8HZTuboh35XeT4gSxSuPVT6V-aMDSELwAiXNvSvHuzNpz3H"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#E8E2D5]/40 backdrop-blur-[1px] group-hover:bg-transparent transition-colors duration-500" />
                  {/* Map Pin Point */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-7 h-7 rounded-full bg-[#1F1A14] text-[#E8DCC9] flex items-center justify-center shadow-lg group-hover:bg-[#C19A6B] group-hover:text-black transition-colors duration-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="bg-[#1F1A14] text-[#FAF8F5] text-[9px] px-2 py-0.5 rounded-md font-sans tracking-widest mt-1 shadow-sm">
                        {"L'ÉTOILE"}
                      </span>
                    </div>
                  </div>
                  {/* Google Map Badge aesthetic */}
                  <div className="absolute bottom-1.5 left-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[8px] font-semibold text-gray-700 shadow-xs">
                    Google Maps
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-6 border-t border-[#DFD6C7] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A6D5D]">
            <p>{"© 2024 L'Étoile Atelier Gastronomique. All Rights Reserved."}</p>
            <div className="flex space-x-6 mt-3 sm:mt-0">
              <button
                onClick={() => setInfoDialog({ title: 'Privacy Policy', text: "L'Étoile Atelier Gastronomique respects patron confidentiality. All personal guest credentials, dining notes, and reservation details are encrypted and strictly confidential." })}
                className="hover:text-[#2A241E] hover:underline transition-colors duration-200 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setInfoDialog({ title: 'Terms of Service', text: "Tasting reservations open 60 days in advance. Cancellations or party adjustments are honored up to 48 hours prior to service. Attire is Smart Elegant." })}
                className="hover:text-[#2A241E] hover:underline transition-colors duration-200 cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setInfoDialog({ title: 'Press & Editorial Inquiries', text: "For Michelin Guide, Le Figaro, or culinary publication photography and interviews, please direct correspondence to press@letoile-dining.com." })}
                className="hover:text-[#2A241E] hover:underline transition-colors duration-200 cursor-pointer"
              >
                Press Inquiries
              </button>
            </div>
          </div>
        </footer>
        {/* END: Footer */}

      </div>

      {/* MODALS */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserve={() => {
          setSelectedDish(null);
          setIsBookingOpen(true);
        }}
      />

      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <AtelierModal
        isOpen={isAtelierOpen}
        onClose={() => setIsAtelierOpen(false)}
        onOpenBooking={() => {
          setIsAtelierOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <CellarModal
        isOpen={isCellarOpen}
        onClose={() => setIsCellarOpen(false)}
        onOpenBooking={() => {
          setIsCellarOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenBooking={() => {
          setIsMenuOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <GalleryModal
        isOpen={galleryIndex !== null}
        initialIndex={galleryIndex ?? 0}
        onClose={() => setGalleryIndex(null)}
        onOpenBooking={() => {
          setGalleryIndex(null);
          setIsBookingOpen(true);
        }}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onOpenBooking={() => {
          setIsLocationOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Info Notice Modal */}
      {infoDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-[#F4EFE6] text-[#221E19] rounded-2xl border border-[#D8CEBC] shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl text-[#1E1914] mb-2">{infoDialog.title}</h3>
            <p className="text-xs text-[#5D5142] leading-relaxed mb-6">{infoDialog.text}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setInfoDialog(null)}
                className="px-5 py-2 rounded-full bg-[#1F1A14] text-white text-xs font-semibold tracking-wider hover:bg-[#383027] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
