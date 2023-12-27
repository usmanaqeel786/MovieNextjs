import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentPlaceholder } from "./ContentPlaceholder.js";

export const Accordion = ({ data, Content }) => {
  const [expanded, setExpanded] = useState(false);

  return data.map((item, i) => {
    const isOpen = i === expanded;
    return (
      <>
        <motion.header
          key={i}
          initial={false}
          onClick={() => setExpanded(isOpen ? false : i)}
          className={`flex w-full rounded-lg flex-col cursor-pointer hover:bg-amber-500 transition-all ${
            isOpen ? "bg-amber-500" : "bg-cyan-800"
          }`}
        >
          <p className="p-3 text-base font-semibold">{item.title}</p>
        </motion.header>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {<Content data={data} />}
            </motion.section>
          )}
        </AnimatePresence>
      </>
    );
  });
};

const accordionIds = [0, 1, 2, 3];
