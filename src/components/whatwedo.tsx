import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import consumerImg from '../assets/img/consumer.jpg';
import farmersImg from '../assets/img/farmers.png';
import factoryImg from '../assets/factory.png';

// ─── Data ────────────────────────────────────────────────────────────────────

const missionPages = [
  {
    label: 'Investors · Consumers',
    sections: [
      {
        title: 'Investors',
        items: [
          'Ensuring transparent, well-documented, government-compliant systems and reports.',
          'Maintaining strong relationships through open communication.',
          'Sustaining aggressiveness in terms of company growth.',
        ],
      },
      {
        title: 'Consumers',
        items: [
          'Guaranteeing the use of quality — clean, fresh, and finest raw materials.',
          'Producing flavorful products that are readily available and deliver value for money.',
        ],
      },
    ],
  },
  {
    label: 'Employees · Community',
    sections: [
      {
        title: 'Employees',
        items: [
          'Training and equipping with proper skills and knowledge.',
          'Adhering to standardized processes and maintaining fair employment.',
          'Providing proper tools, equipment, and supporting employee innovation.',
        ],
      },
      {
        title: 'Community',
        items: [
          'Sourcing locally-grown raw materials.',
          'Providing livelihood for local residents near the production facility.',
          'Supporting zero-waste management and environmental sustainability.',
        ],
      },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Small pill tag for section labels */
const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#a65f45] border border-[#a65f45]/30 rounded-full px-3 py-1 w-fit">
    <span className="w-1.5 h-1.5 rounded-full bg-[#a65f45] opacity-80 inline-block" />
    {children}
  </span>
);

/** Reusable bottom headline */
const PanelHeadline = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-montserrat font-black text-[clamp(3rem,8vw,8rem)] tracking-[-0.03em] uppercase leading-[0.88] text-[#f4efea]">
    {children}
  </h2>
);

/** Thin decorative rule */
const Rule = () => (
  <div className="w-8 h-px bg-[#f4efea]/20 my-3" />
);

// ─── Main Component ───────────────────────────────────────────────────────────

const WhatWeDo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [missionPage, setMissionPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Layer 2 (Vision) wipes in over the first half of the scroll
  const yWindow2 = useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '0%', '0%']);
  const yInner2 = useTransform(scrollYProgress, [0, 0.5, 1], ['-100%', '0%', '0%']);

  // Layer 3 (Mission) wipes in over the second half
  const yWindow3 = useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '100%', '0%']);
  const yInner3 = useTransform(scrollYProgress, [0, 0.5, 1], ['-100%', '-100%', '0%']);

  // Subtle parallax zoom on each background
  const scaleBg1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.12]);
  const scaleBg2 = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scaleBg3 = useTransform(scrollYProgress, [0.5, 1], [1, 1.12]);

  const navigate = (nextPage: number) => {
    setDirection(nextPage > missionPage ? 1 : -1);
    setMissionPage(nextPage);
  };

  const pageVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24 }),
  };

  return (
    <div
      id="whatwedo"
      ref={containerRef}
      className="w-full h-[300vh] relative bg-black select-none font-sans"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">

        {/* ═══════════════════════════════════════════════════════
            LAYER 1 — What We Do Best  (Consumer)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-0 flex flex-col justify-between px-8 pt-10 pb-10 sm:px-16 md:px-24 md:pt-16 md:pb-12 text-[#f4efea]">
          {/* Background */}
          <motion.div
            style={{ scale: scaleBg1 }}
            className="absolute inset-0 z-0 origin-center"
          >
            <img
              src={consumerImg}
              alt="Consumer background"
              className="w-full h-full object-cover brightness-[0.28] contrast-[1.08]"
            />
          </motion.div>

          {/* Bottom-left gradient for text legibility */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top: tag + body copy */}
          <div className="relative z-10 flex flex-col gap-3 max-w-lg">
            <SectionTag>01 — What we do</SectionTag>
            <Rule />
            <p className="font-opensans text-sm sm:text-base leading-[1.75] text-[#f4efea]/75 tracking-wide">
              We manufacture processed fruits and vegetables with precision and consistency.
              Our process blends industrial discipline with culinary intuition — serving restaurants,
              institutions, and modern Filipino kitchens with reliable quality at scale.
            </p>
          </div>

          {/* Bottom: headline */}
          <div className="relative z-10">
            <PanelHeadline>
              What we<br />
              do best.{' '}
              <span className="font-normal text-[0.85em] opacity-60 align-middle ml-2">→</span>
            </PanelHeadline>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            LAYER 2 — Vision  (Farmers)
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          style={{ y: yWindow2 }}
          className="absolute inset-0 z-10 overflow-hidden"
        >
          <motion.div
            style={{ y: yInner2 }}
            className="absolute inset-0 flex flex-col justify-between px-8 pt-10 pb-10 sm:px-16 md:px-24 md:pt-16 md:pb-12 text-[#f4efea]"
          >
            {/* Background */}
            <motion.div
              style={{ scale: scaleBg2 }}
              className="absolute inset-0 z-0 origin-center"
            >
              <img
                src={farmersImg}
                alt="Farmers background"
                className="w-full h-full object-cover brightness-[0.28] contrast-[1.08]"
              />
            </motion.div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Top: tag + body copy */}
            <div className="relative z-10 flex flex-col gap-3 max-w-lg">
              <SectionTag>02 — Vision</SectionTag>
              <Rule />
              <p className="font-opensans text-sm sm:text-base leading-[1.75] text-[#f4efea]/75 tracking-wide">
                To be a world-class and innovative company recognized for delivering high-quality
                food products — the preferred choice of consumers, every day, everywhere. We enrich
                lives through excellence, continuous improvement, and a commitment to sustainable growth.
              </p>
            </div>

            {/* Bottom: headline */}
            <div className="relative z-10">
              <PanelHeadline>Vision</PanelHeadline>
            </div>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            LAYER 3 — Mission  (Factory)
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          style={{ y: yWindow3 }}
          className="absolute inset-0 z-20 overflow-hidden"
        >
          <motion.div
            style={{ y: yInner3 }}
            className="absolute inset-0 flex flex-col justify-between px-8 pt-10 pb-10 sm:px-16 md:px-24 md:pt-16 md:pb-12 text-[#f4efea]"
          >
            {/* Background */}
            <motion.div
              style={{ scale: scaleBg3 }}
              className="absolute inset-0 z-0 origin-center"
            >
              <img
                src={factoryImg}
                alt="Factory background"
                className="w-full h-full object-cover brightness-[0.28] contrast-[1.08]"
              />
            </motion.div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Top: Mission interactive block */}
            <div className="relative z-10 flex flex-col max-w-xl pointer-events-auto">
              <SectionTag>03 — Mission</SectionTag>
              <Rule />

              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#a65f45] mb-4 mt-1">
                JMJ is committed to our stakeholders by:
              </p>

              {/* Animated page content */}
              <div className="min-h-[200px] sm:min-h-[180px] relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={missionPage}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex flex-col gap-5"
                  >
                    {missionPages[missionPage].sections.map((section) => (
                      <div key={section.title}>
                        {/* Section heading with accent rule */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f4efea]/90">
                            {section.title}
                          </span>
                          <div className="flex-1 h-px bg-[#f4efea]/10" />
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {section.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 text-xs sm:text-sm leading-[1.6] text-[#f4efea]/65"
                            >
                              <span className="text-[#a65f45]/70 mt-px shrink-0 font-mono text-[10px]">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-3 mt-5">
                {/* Prev */}
                <button
                  onClick={() => navigate(missionPage - 1)}
                  disabled={missionPage === 0}
                  aria-label="Previous page"
                  className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition-all
                    ${missionPage === 0
                      ? 'border-[#f4efea]/10 text-[#f4efea]/20 cursor-not-allowed'
                      : 'border-[#f4efea]/25 text-[#f4efea]/55 hover:border-[#f4efea]/70 hover:text-[#f4efea] cursor-pointer'
                    }`}
                >
                  ←
                </button>

                {/* Dots */}
                <div className="flex gap-1.5 items-center">
                  {missionPages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(i)}
                      aria-label={`Go to page ${i + 1}`}
                      className={`rounded-full transition-all duration-300 cursor-pointer
                        ${i === missionPage
                          ? 'w-4 h-1.5 bg-[#a65f45]'
                          : 'w-1.5 h-1.5 bg-[#f4efea]/25 hover:bg-[#f4efea]/50'
                        }`}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => navigate(missionPage + 1)}
                  disabled={missionPage === missionPages.length - 1}
                  aria-label="Next page"
                  className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition-all
                    ${missionPage === missionPages.length - 1
                      ? 'border-[#f4efea]/10 text-[#f4efea]/20 cursor-not-allowed'
                      : 'border-[#f4efea]/25 text-[#f4efea]/55 hover:border-[#f4efea]/70 hover:text-[#f4efea] cursor-pointer'
                    }`}
                >
                  →
                </button>

                {/* Page label */}
                <span className="text-[10px] tracking-[0.1em] text-[#f4efea]/25 uppercase ml-1 hidden sm:inline">
                  {missionPages[missionPage].label}
                </span>
              </div>
            </div>

            {/* Bottom: headline */}
            <div className="relative z-10">
              <PanelHeadline>Mission</PanelHeadline>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default WhatWeDo;