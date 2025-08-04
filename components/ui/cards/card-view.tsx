"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, BookOpen } from "lucide-react";
import { Flashcard } from "@/components/ui/cards/flashcard";

// Updated flashcard data for driving license theory
const flashcardData = [
  {
    id: 1,
    category: "Road Signs",
    question: "What does this red octagonal sign mean?",
    questionImage: "/placeholder.svg?height=120&width=120",
    answer: "STOP",
    description:
      "You must come to a complete stop at the stop line, crosswalk, or intersection, whichever you encounter first. Look both ways and yield to pedestrians and cross traffic.",
    links: [
      { title: "Traffic Signs Guide", url: "#" },
      { title: "Right of Way Rules", url: "#" },
    ],
  },
  {
    id: 2,
    category: "Right of Way",
    question: "Who has the right of way at a four-way stop intersection?",
    answer: "The first vehicle to arrive",
    description:
      "At a four-way stop, the vehicle that arrives first has the right of way. If two vehicles arrive simultaneously, the vehicle on the right has the right of way.",
    links: [{ title: "Intersection Rules", url: "#" }],
  },
  {
    id: 3,
    category: "Speed Limits",
    question: "What is the typical speed limit in a residential area?",
    questionImage: "/placeholder.svg?height=100&width=120",
    answer: "25 mph (40 km/h)",
    description:
      "Residential areas typically have lower speed limits to ensure the safety of pedestrians, children, and cyclists who frequently use these roads.",
    answerImage: "/placeholder.svg?height=80&width=100",
  },
  {
    id: 4,
    category: "Parking",
    question: "How far from a fire hydrant must you park?",
    answer: "15 feet (4.5 meters)",
    description:
      "Parking too close to a fire hydrant can obstruct emergency vehicles' access to water supply, which could be critical during a fire emergency.",
    links: [
      { title: "Parking Regulations", url: "#" },
      { title: "Emergency Vehicle Access", url: "#" },
    ],
  },
  {
    id: 5,
    category: "Road Signs",
    question: "What does a yellow diamond-shaped sign typically indicate?",
    questionImage: "/placeholder.svg?height=120&width=120",
    answer: "Warning or Caution",
    description:
      "Yellow diamond signs warn drivers of potential hazards ahead, such as curves, intersections, pedestrian crossings, or changing road conditions.",
    answerImage: "/placeholder.svg?height=100&width=120",
  },
  {
    id: 6,
    category: "Traffic Lights",
    question: "What should you do when approaching a yellow traffic light?",
    answer: "Prepare to stop if safe to do so",
    description:
      "A yellow light means the signal is about to change to red. You should stop if you can do so safely, but if you're too close to stop safely, proceed through the intersection with caution.",
    links: [{ title: "Traffic Light Rules", url: "#" }],
  },
];

interface FeedbackPopupProps {
  type: "remembered" | "review" | null;
  onComplete: () => void;
}

function FeedbackPopup({ type, onComplete }: FeedbackPopupProps) {
  if (!type) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 1500);
        }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Card className="px-6 py-4 bg-white border-2 shadow-lg">
          <div className="flex items-center gap-3">
            {type === "remembered" ? (
              <>
                <Trophy className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-700">Great job!</p>
                  <p className="text-sm text-green-600">+20 XP</p>
                </div>
              </>
            ) : (
              <>
                <BookOpen className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-700">
                    Marked for review
                  </p>
                  <p className="text-sm text-orange-600">Keep practicing!</p>
                </div>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

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

export function CardView() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [feedback, setFeedback] = useState<"remembered" | "review" | null>(
    null,
  );
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = flashcardData[currentCardIndex];
  const progress = (currentCardIndex / flashcardData.length) * 100;

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "right") {
        setScore((prev) => prev + 20);
        setFeedback("remembered");
      } else {
        setReviewCount((prev) => prev + 1);
        setFeedback("review");
      }

      // Move to next card after animation
      setTimeout(() => {
        if (currentCardIndex < flashcardData.length - 1) {
          setCurrentCardIndex((prev) => prev + 1);
        } else {
          setIsComplete(true);
        }
      }, 300);
    },
    [currentCardIndex],
  );

  const handleFeedbackComplete = useCallback(() => {
    setFeedback(null);
  }, []);

  const resetApp = useCallback(() => {
    setCurrentCardIndex(0);
    setScore(0);
    setReviewCount(0);
    setFeedback(null);
    setIsComplete(false);
  }, []);

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="p-8 max-w-md mx-auto bg-white border-2 border-slate-200">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Session Complete!
            </h2>
            <div className="space-y-2 mb-6">
              <p className="text-lg text-slate-700">
                Final Score:{" "}
                <span className="font-semibold text-green-600">{score} XP</span>
              </p>
              <p className="text-slate-600">
                Cards for Review:{" "}
                <span className="font-semibold text-orange-600">
                  {reviewCount}
                </span>
              </p>
              <p className="text-slate-600">
                Cards Remembered:{" "}
                <span className="font-semibold text-green-600">
                  {flashcardData.length - reviewCount}
                </span>
              </p>
            </div>
            <Button onClick={resetApp} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800">Driving Theory</h1>
          <div className="text-right">
            <p className="text-sm text-slate-600">Score</p>
            <p className="text-xl font-semibold text-green-600">{score} XP</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>
              {currentCardIndex + 1} / {flashcardData.length}
            </span>
          </div>
          <motion.div
            className="h-2 bg-slate-200 rounded-full overflow-hidden"
            initial={false}
          >
            <motion.div
              className="h-full bg-slate-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -300 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Flashcard flashcard={currentCard} onSwipe={handleSwipe} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="w-full max-w-md mt-8">
        <div className="flex justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {Math.floor(score / 20)}
            </p>
            <p className="text-sm text-slate-600">Remembered</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{reviewCount}</p>
            <p className="text-sm text-slate-600">Review</p>
          </div>
        </div>
      </div>

      {/* Feedback Popup */}
      <FeedbackPopup type={feedback} onComplete={handleFeedbackComplete} />
    </div>
  );
}
