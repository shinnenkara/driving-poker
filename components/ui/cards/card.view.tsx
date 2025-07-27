"use client"

import { useState } from "react"
import {FlashCard} from "@/components/ui/cards/flash-card";
import {SwipePopup} from "@/components/ui/cards/swipe-popup";


const sampleCard = {
    id: 1,
    front: {
        statement: "When approaching a _____ sign, you must come to a complete _____ before proceeding.",
        blanks: ["STOP", "stop"],
    },
    back: {
        statement: "When approaching a STOP sign, you must come to a complete stop before proceeding.",
        explanation: "A complete stop means your vehicle's wheels are not moving, even briefly.",
    },
    category: "Traffic Signs",
    difficulty: "Basic",
    xpReward: 20,
}

type SwipeResult = {
    type: "remembered" | "needs-study"
    message: string
    xp: number
}

function CardView() {
    const [swipeResult, setSwipeResult] = useState<SwipeResult | null>(null)

    const handleSwipe = (direction: "left" | "right") => {
        const result: SwipeResult =
            direction === "right"
                ? { type: "remembered", message: "Great job!", xp: 20 }
                : { type: "needs-study", message: "Marked for review", xp: 5 }

        setSwipeResult(result)

        setTimeout(() => setSwipeResult(null), 2500)
    }

    return (
        <div className="relative">
            <FlashCard card={sampleCard} onSwipe={handleSwipe} />
            <SwipePopup result={swipeResult} />
        </div>
    )
}

export { CardView };
