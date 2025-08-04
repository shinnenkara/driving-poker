"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, RefreshCw, Sparkles } from "lucide-react";

type SwipeResult = {
  type: "remembered" | "needs-study";
  message: string;
  xp: number;
};

interface SwipePopupProps {
  result: SwipeResult | null;
}

export function SwipePopup({ result }: SwipePopupProps) {
  if (!result) {
    return null;
  }

  const isRemembered = result.type === "remembered";

  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          y: -30,
          transition: { duration: 0.3 },
        }}
      >
        <div
          className={`${
            isRemembered ? "bg-[#00ADB5]" : "bg-red-500"
          } text-white px-6 py-4 rounded-2xl shadow-2xl border-2 ${
            isRemembered ? "border-[#00ADB5]" : "border-red-400"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{
                rotate: isRemembered ? [0, 360] : [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: isRemembered ? 0.5 : 0.4,
                ease: "easeInOut",
              }}
            >
              {isRemembered ? (
                <CheckCircle className="w-8 h-8" />
              ) : (
                <RefreshCw className="w-8 h-8" />
              )}
            </motion.div>

            <div className="text-center">
              <div className="font-bold text-lg">{result.message}</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span className="font-semibold">+{result.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
