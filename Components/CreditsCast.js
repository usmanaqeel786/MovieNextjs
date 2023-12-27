import { shimmer, toBase64 } from "@/lib/helpers";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const CreditsCast = ({ data }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const [width, setwidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setwidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  const marqueeVariants = {
    animate: {
      x: [0, -width],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 300,
          ease: "linear",
        },
      },
    },
  };
  return (
    <motion.div
      ref={carousel}
      className="flex overflow-hidden select-none"
      // whileTap={{ cursor: "grabbing" }}
      // whileHover={{ cursor: "pointer" }}
    >
      <div className="absolute left-0 h-24 w-12 bg-gradient-to-r from-[#06202A] to-transparent z-50" />
      <div className="absolute right-0 h-24 w-12 bg-gradient-to-l from-[#06202A] to-transparent z-50" />
      <motion.div
        // drag={"x"}
        // dragConstraints={{ right: 0, left: -width }}
        variants={marqueeVariants}
        animate="animate"
        dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
        dragElastic={0}
        className="flex pb-4 transition "
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex m-2 shadow-md bg-gray-800 rounded-md flex-row space-x-0"
          >
            <Image
              src={
                !item.profile_path
                  ? "https://cdn-icons-png.flaticon.com/512/9783/9783994.png"
                  : BASE_URL + item.profile_path
              }
              quality={100}
              width={100}
              height={100}
              className="rounded select-none pointer-events-none"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(100, 100)
              )}`}
              objectFit="fill"
            />
            <div className="w-52 p-1">
              <p className="p-1 max-w-[300px] text-sm font-semibold text-gray-300">
                {item.name}
              </p>
              <p className="p-1 max-w-[130px] text-xs font-light truncate text-gray-400">
                {item.character}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CreditsCast;
