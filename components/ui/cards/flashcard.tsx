"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { CardImageDialog } from "@/components/ui/cards/card-image-dialog";

interface FlashcardData {
  id: number;
  category: string;
  question: string;
  questionImage?: string;
  answer: string;
  description?: string;
  answerImage?: string;
  links?: { title: string; url: string }[];
}

interface FlashcardProps {
  flashcard: FlashcardData;
  onSwipe: (direction: "left" | "right") => void;
}

export function Flashcard({ flashcard, onSwipe }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.5, 0.8, 1, 0.8, 0.5],
  );

  // Dynamic overlay colors based on drag direction
  const overlayOpacity = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    [0.3, 0, 0, 0, 0.3],
  );
  const greenOverlay = useTransform(x, [0, 200], [0, 0.3]);
  const redOverlay = useTransform(x, [-200, 0], [0.3, 0]);

  const handleClick = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  }, [isFlipped]);

  const handleDragEnd = useCallback(
    (event: any, info: any) => {
      // Get actual card width dynamically
      const cardElement = event.target.closest("[data-card]");
      const cardWidth = cardElement ? cardElement.offsetWidth : 320;
      const threshold = cardWidth * 0.5;

      if (Math.abs(info.offset.x) > threshold) {
        const direction = info.offset.x > 0 ? "right" : "left";
        onSwipe(direction);
      } else {
        x.set(0);
      }
    },
    [onSwipe, x],
  );

  return (
    <motion.div
      className="relative w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-96 sm:h-[28rem] md:h-[32rem] cursor-pointer perspective-1000"
      style={{ x, rotate, opacity }}
      onClick={handleClick}
      drag={isFlipped ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: isFlipped ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      data-card="true"
    >
      {/* Dynamic drag feedback overlays */}
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-lg pointer-events-none z-10"
        style={{ opacity: greenOverlay }}
      />
      <motion.div
        className="absolute inset-0 bg-red-500 rounded-lg pointer-events-none z-10"
        style={{ opacity: redOverlay }}
      />

      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Question Side */}
        <Card className="absolute inset-0 w-full h-full backface-hidden bg-slate-50 border-2 border-slate-200 flex flex-col p-6">
          <div className="flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge
                variant="secondary"
                className="bg-slate-200 text-slate-700"
              >
                {flashcard.category}
              </Badge>
            </div>

            {/* Question */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                {flashcard.question}
              </h3>

              {/* Question Image */}
              {flashcard.questionImage && (
                <CardImageDialog
                  image={{
                    src: flashcard.questionImage,
                    alt: "Question illustration",
                  }}
                />
              )}
            </div>

            {!isFlipped && (
              <p className="text-sm text-slate-500 text-center mt-4">
                Click to reveal answer
              </p>
            )}
          </div>
        </Card>

        {/* Answer Side */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-100 border-2 border-slate-300 flex flex-col p-6">
          <div className="flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge
                variant="secondary"
                className="bg-slate-200 text-slate-700"
              >
                {flashcard.category}
              </Badge>
            </div>

            {/* Answer */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {flashcard.answer}
              </h3>

              {/* Answer Image */}
              {flashcard.answerImage && (
                <CardImageDialog
                  image={{
                    src: flashcard.answerImage,
                    alt: "Answer illustration",
                  }}
                />
              )}
            </div>

            {/* Description */}
            {flashcard.description && (
              <>
                <Separator className="my-4" />
                <div className="mb-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {flashcard.description}
                  </p>
                </div>
              </>
            )}

            {/* Useful Links */}
            {flashcard.links && flashcard.links.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Useful Links:
                  </h4>
                  <ul className="space-y-1">
                    {flashcard.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Swipe Instructions */}
            <div className="mt-auto">
              <div className="flex justify-center gap-4 text-sm text-slate-500">
                <span>← Needs Review</span>
                <span>Remembered →</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Drag indicators */}
      {isFlipped && (
        <>
          <motion.div
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-red-500 font-bold text-xl"
            style={{ opacity: redOverlay }}
          >
            REVIEW
          </motion.div>
          <motion.div
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-green-500 font-bold text-xl"
            style={{ opacity: greenOverlay }}
          >
            CORRECT
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
