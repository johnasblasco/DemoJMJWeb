import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Core values data as provided by the user
const coreValuesData = [
  {
    id: "01",
    title: "Commitment",
    text: "Commitment is our pledge to our stakeholders in doing business with them. It is giving consistent high-grade quality products in a timely manner that are beneficial to all our stakeholders."
  },
  {
    id: "02",
    title: "Integrity",
    text: "We value our relationship with our stakeholders that is why we provide accurate, honest, relevant information."
  },
  {
    id: "03",
    title: "Quality",
    text: "We ensure our consumers that we use clean, fresh, and finest raw materials to all food products and that they are readily available to all distribution channels. (Retail, online, industrial)"
  },
  {
    id: "04",
    title: "Love",
    text: "We take responsibility in the development of our employees through proper training in the pursuit of providing better quality products, greater opportunities for self-enrichment, and stronger employee engagement."
  },
  {
    id: "05",
    title: "Resilience",
    text: "We exercise flexibility and adaptability to address business dynamics to efficiently enable us to fuel company growth, to continuously delight our consumers and to upgrade our employees' skills. Resilience is our weapon to weather the challenges that the company might face in the near future."
  }
];

const CoreValues: React.FC = () => {
  // Pagination state (Page 1 = items 0-2, Page 2 = items 3-4)
  const [page, setPage] = useState(1);
  const isPage1 = page === 1;

  // Derive visible values
  const currentValues = isPage1 ? coreValuesData.slice(0, 3) : coreValuesData.slice(3, 5);

  return (
    <section id="core-values" className="relative w-full bg-[#7A8F7C] text-[#F4EFEA] py-16 md:py-24 px-6 md:px-16 lg:px-24 font-sans overflow-hidden">
      
      {/* Heading & Pagination Controls Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-montserrat font-bold tracking-tight">
          Core Values.
        </h2>

        {/* Interactive Pagination Controls (Moved to top right) */}
        <div className="flex justify-start md:justify-end md:pb-4">
          <button
            onClick={() => setPage(isPage1 ? 2 : 1)}
            className="flex items-center gap-4 text-[#F4EFEA] hover:text-[#A65F45] transition-colors group cursor-pointer"
          >
            <span className="font-montserrat font-bold uppercase tracking-widest text-xs sm:text-sm">
              {isPage1 ? "Next Values" : "Previous Values"}
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#F4EFEA]/40 group-hover:border-[#A65F45] flex items-center justify-center transition-all bg-transparent">
              <span className={`text-xl md:text-2xl font-sans transform transition-transform duration-300 ${isPage1 ? "group-hover:translate-x-1" : "rotate-180 group-hover:-translate-x-1"}`}>
                →
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="w-full relative min-h-[450px] md:min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: isPage1 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isPage1 ? 30 : -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            // We use grid-cols-1 on mobile, and grid-cols-3 on larger screens
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16 w-full"
          >
            {currentValues.map((value) => (
              <div key={value.id} className="flex flex-col group cursor-default">
                {/* Thin Top Border Line (Brightens on Hover) */}
                <div className="w-full h-px bg-[#F4EFEA]/30 mb-6 transition-colors duration-300 group-hover:bg-[#F4EFEA]"></div>
                
                {/* Large Number Indicator */}
                <div className="text-xl md:text-2xl font-opensans text-[#F4EFEA]/60 mb-6 md:mb-10">
                  {value.id}
                </div>
                
                {/* Title with Interactive Arrow */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold mb-4 flex items-center gap-3">
                  {value.title} 
                  <span className="font-sans font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#A65F45]">
                    →
                  </span>
                </h3>
                
                {/* Paragraph Content */}
                <p className="text-sm sm:text-base font-opensans leading-relaxed text-[#F4EFEA]/90">
                  {value.text}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default CoreValues;
