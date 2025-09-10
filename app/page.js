import React from "react";
import Hero from "./(pages)/landingpage/Hero";
import About from "./(pages)/landingpage/About";
const page = () => {
  return (
    <div className="relative">
      <Hero />
      <About />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
    </div>
  );
};
export default page;
