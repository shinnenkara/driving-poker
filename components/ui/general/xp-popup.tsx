"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface XPPopupProps {
    show: boolean
    amount: number
}

export function XPPopup({ show, amount }: XPPopupProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="absolute top-4 right-4 z-50"
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
                        y: -20,
                        transition: { duration: 0.2 },
                    }}
                >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg border-2 border-yellow-300/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                            <span className="font-bold text-sm">+{amount} XP</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
