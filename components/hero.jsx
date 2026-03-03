"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 10;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-white pointer-events-none" />
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 mx-auto">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span className="text-sm font-medium text-indigo-700 tracking-wide">
            Welth AI 2.0 is here
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tight pb-6 text-gray-900 leading-[1.1]">
          Manage Your Finances <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            with Intelligence
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          An elite AI-powered financial management platform that helps you
          track, analyze, and optimize your wealth with real-time actionable
          insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.4)] transition-all font-semibold text-white w-full sm:w-auto"
            >
              Get Started for Free
            </Button>
          </Link>
          <a href="#features">
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50 font-medium w-full sm:w-auto"
            >
              See How It Works
            </Button>
          </a>
        </div>

        <div className="hero-image-wrapper mt-20 relative px-4">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent z-10 bottom-0 top-[80%] pointer-events-none" />
          <div
            ref={imageRef}
            className="hero-image relative max-w-6xl mx-auto rounded-xl ring-1 ring-gray-200/50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-2 bg-white/50 backdrop-blur-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0" />
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border border-gray-100 relative z-10 transform transition-transform duration-700 group-hover:scale-[1.01]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
