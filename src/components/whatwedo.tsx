import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import consumerImg from '../assets/img/consumer.jpg';
import farmersImg from '../assets/img/farmers.png';
import factoryImg from '../assets/factory.png';

const WhatWeDo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // State for interactive Mission list
  const [missionPage, setMissionPage] = useState(1);

  // Track scroll progress across the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer 2 (Farmers/Vision) wipes in from 0 to 0.5, then stays on screen
  const yWindow2 = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "0%"]);
  const yInner2 = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "0%", "0%"]);

  // Layer 3 (Factory/Mission) stays hidden from 0 to 0.5, then wipes in from 0.5 to 1
  const yWindow3 = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "100%", "0%"]);
  const yInner3 = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "-100%", "0%"]);

  // Subtle Zoom for the backgrounds to give them depth without revealing black bars
  const scaleBg1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const scaleBg2 = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scaleBg3 = useTransform(scrollYProgress, [0.5, 1], [1, 1.15]);

  return (
    <div
      id="whatwedo"
      ref={containerRef}
      className="w-full h-[300vh] relative bg-black select-none font-sans"
    >
      {/* STICKY CONTAINER: Stays on screen for the whole 300vh */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">

        {/* LAYER 1: Consumer Image & Quotes */}
        <div className="absolute inset-0 w-full h-full z-0 flex flex-col justify-end md:justify-between pl-6 pr-6 pt-24 pb-32 sm:pb-24 sm:pl-16 sm:pr-8 md:pl-24 md:pr-20 md:pt-20 md:pb-8 text-[#F4EFEA]">
          {/* Background */}
          <motion.div style={{ scale: scaleBg1 }} className="absolute inset-0 z-0 h-full w-full origin-center">
            <img src={consumerImg} alt="Consumer Background" className="w-full h-full object-cover brightness-[0.35] contrast-[1.05]" />
          </motion.div>

          {/* Top Quote */}
          <div className="relative z-10 w-full max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-opensans tracking-wide mb-8 md:mb-0">
            We manufacture processed fruits and vegetables with precision and consistency. Our process blends industrial discipline with culinary intuition serving restaurants, institutions, and modern Filipino kitchens with reliable quality at scale.
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 w-full font-montserrat font-bold text-6xl sm:text-8xl md:text-[7rem] lg:text-[9rem] tracking-tight uppercase leading-[0.95]">
            WHAT WE <br />
            DO BEST. <span className="font-sans font-normal text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] align-middle ml-2">→</span>
          </div>
        </div>

        {/* LAYER 2: Farmers Image & Quotes (Wiping Overlay) */}
        <motion.div
          style={{ y: yWindow2 }}
          className="absolute inset-0 w-full h-full z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Inverse shifting container to keep elements pinned to the viewport */}
          <motion.div
            style={{ y: yInner2 }}
            className="absolute inset-0 w-full h-[100dvh] flex flex-col justify-end md:justify-between pl-6 pr-6 pt-24 pb-32 sm:pb-24 sm:pl-16 sm:pr-8 md:pl-24 md:pr-20 md:pt-20 md:pb-8 text-[#F4EFEA]"
          >
            {/* Background */}
            <motion.div style={{ scale: scaleBg2 }} className="absolute inset-0 z-0 h-full w-full origin-center">
              <img src={farmersImg} alt="Farmers Background" className="w-full h-full object-cover brightness-[0.35] contrast-[1.05]" />
            </motion.div>

            {/* Top Quote */}
            <div className="relative z-10 w-full max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-opensans tracking-wide mb-8 md:mb-0">
              To be a world-class and innovative company recognized for delivering high-quality food products that are the preferred choice of consumers every day, everywhere. We aim to enrich lives through excellence, continuous improvement, and a commitment to customer satisfaction and sustainable growth.
            </div>

            {/* Bottom Quote */}
            <div className="relative z-10 w-full font-montserrat font-bold text-6xl sm:text-8xl md:text-[7rem] lg:text-[9rem] tracking-tight uppercase leading-[0.95]">
              VISION
            </div>
          </motion.div>
        </motion.div>

        {/* LAYER 3: Factory Image & Quotes (Wiping Overlay) */}
        <motion.div
          style={{ y: yWindow3 }}
          className="absolute inset-0 w-full h-full z-20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Inverse shifting container to keep elements pinned to the viewport */}
          <motion.div
            style={{ y: yInner3 }}
            className="absolute inset-0 w-full h-[100dvh] flex flex-col justify-end md:justify-between pl-6 pr-6 pt-24 pb-32 sm:pb-24 sm:pl-16 sm:pr-8 md:pl-24 md:pr-20 md:pt-20 md:pb-8 text-[#F4EFEA]"
          >
            {/* Background */}
            <motion.div style={{ scale: scaleBg3 }} className="absolute inset-0 z-0 h-full w-full origin-center">
              <img src={factoryImg} alt="Factory Background" className="w-full h-full object-cover brightness-[0.35] contrast-[1.05]" />
            </motion.div>

            {/* Top Quote Block (Interactive List) */}
            <div className="relative z-10 w-full max-w-2xl font-opensans tracking-wide flex flex-col pointer-events-auto mb-8 md:mb-0">
              <p className="text-sm sm:text-base md:text-lg mb-4 font-semibold uppercase tracking-widest text-[#A65F45] drop-shadow-md">
                JMJ is committed to our stakeholders by:
              </p>

              <div className="min-h-[220px] sm:min-h-[200px] flex flex-col justify-start">
                <motion.div
                  key={missionPage}
                  initial={{ opacity: 0, x: missionPage === 1 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed drop-shadow-sm"
                >
                  {missionPage === 1 ? (
                    <>
                      <div>
                        <strong className="block mb-1 text-white">Investors:</strong>
                        <ol className="list-decimal pl-5 space-y-1 text-white/90 marker:text-white/50">
                          <li>Ensuring transparent, well-documented, government-compliant systems and reports.</li>
                          <li>Maintaining strong relationship through open communication.</li>
                          <li>Sustaining aggressiveness in terms of company growth.</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="block mb-1 text-white">Consumers:</strong>
                        <ol className="list-decimal pl-5 space-y-1 text-white/90 marker:text-white/50">
                          <li>Guaranteeing the use of quality - clean, fresh and finest raw materials for our food products.</li>
                          <li>Producing flavorful food products that are readily available and has value for their money.</li>
                        </ol>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <strong className="block mb-1 text-white">Employees:</strong>
                        <ol className="list-decimal pl-5 space-y-1 text-white/90 marker:text-white/50">
                          <li>Training and equipping with proper skills and knowledge.</li>
                          <li>Adhering to standardized processes.</li>
                          <li>Maintaining fair employee-employer relationship.</li>
                          <li>Providing proper tools and equipment.</li>
                          <li>Supporting employee innovation and creative ideas.</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="block mb-1 text-white">Community:</strong>
                        <ol className="list-decimal pl-5 space-y-1 text-white/90 marker:text-white/50">
                          <li>Sourcing locally-grown materials.</li>
                          <li>Providing livelihood for local residents within the production facility.</li>
                          <li>Supporting zero-waste management and environmental sustainability initiative.</li>
                        </ol>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => setMissionPage(1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${missionPage === 1 ? 'border-[#A65F45] text-[#A65F45] bg-[#A65F45]/20' : 'border-white/30 text-white/50 hover:border-white hover:text-white cursor-pointer'
                    }`}
                >
                  ←
                </button>
                <div className="flex gap-2">
                  <div className={`w-2 h-2 rounded-full transition-all ${missionPage === 1 ? 'bg-[#A65F45]' : 'bg-white/30'}`} />
                  <div className={`w-2 h-2 rounded-full transition-all ${missionPage === 2 ? 'bg-[#A65F45]' : 'bg-white/30'}`} />
                </div>
                <button
                  onClick={() => setMissionPage(2)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${missionPage === 2 ? 'border-[#A65F45] text-[#A65F45] bg-[#A65F45]/20' : 'border-white/30 text-white/50 hover:border-white hover:text-white cursor-pointer'
                    }`}
                >
                  →
                </button>
              </div>

            </div>

            {/* Bottom Quote */}
            <div className="relative z-10 w-full font-montserrat font-bold text-6xl sm:text-8xl md:text-[7rem] lg:text-[9rem] tracking-tight uppercase leading-[0.95]">
              MISSION
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default WhatWeDo;
