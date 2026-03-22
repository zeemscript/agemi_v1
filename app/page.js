import React from "react";
import Hero from "./(pages)/landingpage/Hero";
import Features from "./(pages)/landingpage/Features";
import SecurityStats from "./(pages)/landingpage/SecurityStats";
import DashboardPreview from "./(pages)/landingpage/DashboardPreview";
import Footer from "./(pages)/landingpage/Footer";

const page = () => {
  return (
    <main className="relative bg-[#0B1120] overflow-x-hidden">
      {/* Background Grid - Global */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:60px_60px] opacity-10 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <Hero />
        <SecurityStats />
        <Features />
        <DashboardPreview />
        <Footer />
      </div>
    </main>
  );
};

export default page;
