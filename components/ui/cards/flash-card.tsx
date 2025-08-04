"use client";

import { useState } from "react";
import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  RefreshCw,
  RotateCcw,
} from "lucide-react";

interface FlashCardData {
  id: number;
  front: {
    statement: string;
    blanks: string[];
  };
  back: {
    statement: string;
    explanation: string;
  };
  category: string;
  difficulty: string;
  xpReward: number;
}

interface FlashCardProps {
  card: FlashCardData;
  onSwipe: (direction: "left" | "right") => void;
}

export function FlashCard({ card, onSwipe }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [canSwipe, setCanSwipe] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-15, 15]); // Reduced rotation range
  const opacity = useTransform(
    x,
    [-250, -150, 0, 150, 250],
    [0.7, 1, 1, 1, 0.7],
  ); // More gradual opacity change

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setCanSwipe(true);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 150;

    if (info.offset.x > threshold) {
      onSwipe("right");
      setTimeout(() => {
        x.set(0);
      }, 500);
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
      setTimeout(() => {
        x.set(0);
      }, 500);
    } else {
      x.set(0, {
        type: "spring",
        stiffness: 500,
        damping: 30,
      } as any);
    }
  };

  const swipeLeftOpacity = useTransform(
    x,
    [-300, -120, -80, 0],
    [1, 0.8, 0.3, 0],
  );
  const swipeRightOpacity = useTransform(
    x,
    [0, 80, 120, 300],
    [0, 0.3, 0.8, 1],
  );

  return (
    <div className="perspective-1000 w-full h-80 relative">
      {canSwipe && (
        <>
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-red-500 text-white px-3 py-2 rounded-full flex items-center gap-2"
            style={{ opacity: swipeLeftOpacity }}
          >
            <ArrowLeft className="w-4 h-4" />
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Study</span>
          </motion.div>

          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#00ADB5] text-white px-3 py-2 rounded-full flex items-center gap-2"
            style={{ opacity: swipeRightOpacity }}
          >
            <span className="text-sm font-medium">Got it</span>
            <CheckCircle className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </>
      )}

      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          x,
          rotate,
          opacity,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={!canSwipe ? { scale: 1.02 } : {}}
        whileTap={!canSwipe ? { scale: 0.98 } : {}}
        drag={canSwipe ? "x" : false}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onClick={!canSwipe ? handleFlip : undefined}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="w-full h-full bg-[#393E46] border-2 border-[#393E46] shadow-2xl">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <Badge
                  variant="secondary"
                  className="bg-[#00ADB5] text-white border-[#00ADB5]"
                >
                  {card.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-[#EEEEEE]/30 text-[#EEEEEE]"
                >
                  {card.difficulty}
                </Badge>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <p className="text-xl font-medium text-[#EEEEEE] text-center leading-relaxed">
                  {card.front.statement}
                </p>
              </div>

              <div className="flex items-center justify-between text-[#EEEEEE]/70">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm">Think about it...</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm">Click to flip</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="w-full h-full bg-[#393E46] border-2 border-[#00ADB5] shadow-2xl">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <Badge
                  variant="secondary"
                  className="bg-[#00ADB5] text-white border-[#00ADB5]"
                >
                  Answer
                </Badge>
                <Badge
                  variant="outline"
                  className="border-[#00ADB5] text-[#00ADB5]"
                >
                  +{card.xpReward} XP
                </Badge>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-4">
                <p className="text-xl font-medium text-[#EEEEEE] text-center leading-relaxed">
                  {card.back.statement}
                </p>
                <div className="bg-[#222831] rounded-lg p-4 border border-[#00ADB5]/20">
                  <p className="text-[#EEEEEE]/80 text-sm text-center italic">
                    {card.back.explanation}
                  </p>
                </div>
              </div>

              {canSwipe && (
                <div className="flex items-center justify-center text-[#EEEEEE]/70">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-red-400">
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm">Study more</span>
                    </div>
                    <div className="w-px h-4 bg-[#EEEEEE]/30"></div>
                    <div className="flex items-center gap-2 text-[#00ADB5]">
                      <span className="text-sm">Got it</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
