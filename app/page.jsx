"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  const parseValue = (value) => {
    // Extract numeric part and suffix
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    return { numericPart, suffix };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] relative z-10 -mt-20">
            {statsData.map((stat, index) => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true,
              });
              const { numericPart, suffix } = parseValue(stat.value);

              return (
                <div key={index} className="text-center" ref={ref}>
                  <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 font-sans tracking-tight">
                    {inView ? (
                      <CountUp
                        end={numericPart}
                        duration={2.5}
                        separator=","
                        suffix={suffix}
                        decimals={stat.value.includes(".") ? 1 : 0}
                      />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">
              Powerful Features
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Everything you need to master your wealth
            </h3>
            <p className="text-lg text-gray-500">
              Stop guessing where your money goes. Our AI-driven tools provide
              clarity, control, and confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                className="p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 rounded-[2rem] group"
                key={index}
              >
                <CardContent className="space-y-4 pt-4 px-0">
                  <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">
              Onboarding
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-500">
              Get up and running in minutes, not days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)] text-indigo-600">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">
              Social Proof
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by professionals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 rounded-[2rem]"
              >
                <CardContent className="pt-4 px-0">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://i.pinimg.com/736x/71/b3/e4/71b3e4159892bb319292ab3b76900930.jpg"
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-indigo-50"
                    />
                    <div className="ml-4">
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-indigo-600 font-medium tracking-wide">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Take Control?
          </h2>
          <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-lg md:text-xl">
            Join thousands of users who are already managing their finances
            smarter with Welth AI.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-50 hover:text-indigo-800 font-bold rounded-full shadow-[0_8px_30px_rgb(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgb(255,255,255,0.3)] transition-all px-12 py-6 text-lg"
            >
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
