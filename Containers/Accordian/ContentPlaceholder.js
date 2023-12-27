import * as React from "react";
import { motion } from "framer-motion";

export const ContentPlaceholder = ({ data }) => (
  <motion.div
    variants={{ collapsed: { scaleY: 0.8 }, open: { scale: 1 } }}
    transition={{ duration: 0.8 }}
    className="content-placeholder"
  >
    {data.map((words) => (
      <p>{words.content}</p>
    ))}
  </motion.div>
);
