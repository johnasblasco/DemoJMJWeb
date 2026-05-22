import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WhatWeDo from "../components/whatwedo";
import CoreValues from "../components/corevalues";
import CTA from "../components/cta";
import Footer from "../components/footer";

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(true);

  // Sync state with HTML document element class list
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Premium Navigation Header */}
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

      {/* Main Content Area */}
      <main className="w-full min-h-screen">
        <Hero />
        <WhatWeDo />
        <CoreValues />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
