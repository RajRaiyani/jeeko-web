"use client";
import { Building, Hammer, Trophy, Star, Target, Rocket } from "lucide-react";
import { useEffect, useRef, type ReactElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  details: string;
  icon: ReactElement;
  step: string;
}

export default function Journey() {
  const containerRef = useRef<HTMLElement>(null);

  const journeyMilestones: JourneyMilestone[] = [
    {
      year: "2000",
      title: "Foundation & Vision",
      description:
        "Patel Timbers Group was established with a vision to transform the construction landscape in India.",
      details:
        "Started with traditional timber trading and construction materials.",
      icon: <Building className="w-6 h-6" />,
      step: "01",
    },
    {
      year: "2005",
      title: "Expansion & Growth",
      description:
        "Expanded operations to include residential construction and commercial projects.",
      details: "Completed our first major residential complex with 50+ units.",
      icon: <Hammer className="w-6 h-6" />,
      step: "02",
    },
    {
      year: "2010",
      title: "Quality Excellence",
      description:
        "Achieved ISO certification and established quality standards in construction.",
      details: "Launched premium residential projects with modern amenities.",
      icon: <Trophy className="w-6 h-6" />,
      step: "03",
    },
    {
      year: "2014",
      title: "Innovation & Technology",
      description:
        "Introduced modern construction techniques and sustainable building practices.",
      details: "Pioneered eco-friendly construction methods in the region.",
      icon: <Target className="w-6 h-6" />,
      step: "04",
    },
    {
      year: "2019",
      title: "Market Leadership",
      description:
        "Became a leading construction group with multiple successful projects.",
      details: "Completed 1000+ residential units and 50+ commercial projects.",
      icon: <Star className="w-6 h-6" />,
      step: "05",
    },
    {
      year: "2024",
      title: "Future Ready",
      description:
        "Embracing digital transformation and smart construction technologies.",
      details:
        "Launching next-generation smart homes and sustainable communities.",
      icon: <Rocket className="w-6 h-6" />,
      step: "06",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate header
    const headerTl = gsap.timeline();
    headerTl.fromTo(
      ".journey-header",
      {
        autoAlpha: 0,
        y: 50,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    );

    // Animate timeline line progressively with ScrollTrigger - INCREASED SPEED
    gsap.fromTo(
      ".timeline-line",
      {
        scaleY: 0,
        transformOrigin: "top center",
      },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 97%",
          end: "bottom 20%",
          scrub: 0.01,
        },
      }
    );

    // Animate timeline dots and cards for desktop - UPDATED WITH FASTER SPEEDS & NO REVERSE ANIMATION
    const desktopItems = containerRef.current?.querySelectorAll(
      ".desktop-timeline-item"
    ) as NodeListOf<Element> | undefined;
    desktopItems?.forEach((item) => {
      const dot = item.querySelector(".timeline-dot") as Element | null;
      const line = item.querySelector(
        ".desktop-connecting-line"
      ) as Element | null;
      const card = item.querySelector(
        ".desktop-timeline-card"
      ) as Element | null;
      const yearDisplay = item.querySelector(".year-display") as Element | null;

      const sequenceTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Animate dot - FASTER
      if (dot) {
        sequenceTl.fromTo(
          dot,
          {
            scale: 0,
            autoAlpha: 0,
            rotation: 180,
          },
          {
            scale: 1,
            autoAlpha: 1,
            rotation: 0,
            duration: 0.3, // Reduced from 0.6
            ease: "back.out(2)",
          }
        );
      }

      // Animate connecting line - FASTER
      if (line) {
        sequenceTl.fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 0.3, // Reduced from 0.6
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (card) {
        const yearBadge = card.querySelector(".year-badge") as Element | null;
        const cardContent = card.querySelector(
          ".card-content"
        ) as Element | null;

        sequenceTl.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 40,
            scale: 0.95,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4, // Reduced from 0.8
            ease: "power2.out",
          },
          "-=0.2"
        );

        if (yearBadge) {
          sequenceTl.fromTo(
            yearBadge,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 0.2, // Reduced from 0.4
              ease: "back.out(1.7)",
            },
            "-=0.4"
          );
        }

        if (cardContent) {
          sequenceTl.fromTo(
            cardContent,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      }

      // Animate year display - FASTER
      if (yearDisplay) {
        sequenceTl.fromTo(
          yearDisplay,
          {
            autoAlpha: 0,
            scale: 0.5,
            rotation: 10,
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
      }
    });

    const mobileCards = containerRef.current?.querySelectorAll(
      ".mobile-card-item"
    ) as NodeListOf<Element> | undefined;
    mobileCards?.forEach((card, index) => {
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const mobileStepNumber = card.querySelector(
        ".mobile-step-number"
      ) as Element | null;
      const mobileYearText = card.querySelector(
        ".mobile-year-text"
      ) as Element | null;
      const mobileCardContent = card.querySelector(
        ".mobile-card-content"
      ) as Element | null;

      // Animate the entire card with stagger effect
      mobileTl.fromTo(
        card,
        {
          autoAlpha: 0,
          y: 80,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.8,
          rotationY: index % 2 === 0 ? -15 : 15,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      if (mobileStepNumber) {
        mobileTl.fromTo(
          mobileStepNumber,
          {
            scale: 0,
            rotation: 180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.8"
        );
      }

      if (mobileYearText) {
        mobileTl.fromTo(
          mobileYearText,
          {
            autoAlpha: 0,
            x: -30,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      if (mobileCardContent) {
        mobileTl.fromTo(
          mobileCardContent,
          {
            autoAlpha: 0,
            y: 30,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white w-full py-20 overflow-hidden"
    >
      <div className="container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="journey-header text-center mb-24 opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 tracking-tight">
            OUR <span className="text-red-700">JOURNEY</span>
          </h2>
          <div className="w-32 h-2 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            From humble beginnings to industry leadership - discover the
            milestones that shaped
            <span className="text-red-600 font-semibold">
              {" "}
              Patel Timbers Group{" "}
            </span>
            into a construction powerhouse
          </p>
        </div>

        {/* Desktop Modern Timeline */}
        <div className="hidden lg:block timeline-container overflow-hidden">
          <div className="relative overflow-hidden">
            <div className="timeline-line absolute left-1/2 transform -translate-x-0.5 top-0 w-1 h-full bg-red-600"></div>
            <div className="space-y-32 overflow-hidden">
              {journeyMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className="desktop-timeline-item relative overflow-hidden rounded-sm"
                >
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 top-12 w-6 h-6 bg-red-600 rounded-full border-4 border-white z-20"></div>
                  <div
                    className={`desktop-connecting-line absolute left-1/2 top-15 w-43 h-0.5 border-t-2 border-dotted border-gray-200 z-10 ${
                      index % 2 === 0 ? "-translate-x-43" : ""
                    }`}
                    style={{ borderStyle: "dotted", borderWidth: "2px 0 0 0" }}
                  ></div>
                  <div
                    className={`flex items-center overflow-hidden ${
                      index % 2 === 0 ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "pr-20" : "pl-20"
                      }`}
                    >
                      <div className="group relative">
                        <div
                          className={`desktop-timeline-card bg-gray-50 text-black rounded-sm p-8 relative overflow-hidden transition-all duration-700 transform group-hover:-translate-y-2 ${
                            index % 2 === 0 ? "border-l-4" : "border-r-4"
                          } border-red-600 opacity-0`}
                        >
                          <div
                            className={`year-badge ${
                              index % 2 === 0 ? "text-left" : "text-left"
                            } mb-6`}
                          >
                            <div className="inline-block bg-red-200 text-black px-6 py-2 text-xl font-bold rounded-sm">
                              <span className="block">{milestone.year}</span>
                            </div>
                          </div>
                          <div className="card-content text-left">
                            <h3 className="text-2xl font-bold mb-4 text-black">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {milestone.description}
                            </p>
                            <p className="text-gray-600 text-sm font-light italic">
                              {milestone.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "pl-20" : "pr-20"
                      } flex items-center justify-center`}
                    >
                      <div className="relative">
                        <div className="year-display text-8xl font-black text-gray-200 select-none opacity-0">
                          {milestone.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEW MOBILE DESIGN - Cards in Grid (UNCHANGED) */}
        <div className="lg:hidden px-4">
          <div className="space-y-8">
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="mobile-card-item opacity-0">
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 pl-8 shadow-lg hover:shadow-xl transition-all duration-500">
                    {/* Year and Icon Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="mobile-year-text">
                        <span className="text-3xl font-black text-red-600">
                          {milestone.year}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        {milestone.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mobile-card-content">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                        {milestone.description}
                      </p>
                      <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                        <p className="text-gray-600 text-xs italic">
                          {milestone.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
