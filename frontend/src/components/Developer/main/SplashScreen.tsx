'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCompass } from "react-icons/gi";
import { TfiMapAlt } from "react-icons/tfi";
import { MdTravelExplore } from "react-icons/md";
import { GiMountains } from "react-icons/gi";
import { Button } from '../../Shadcn/main/button'

const useLoading = (duration: number = 3000): boolean => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), duration)
        return () => clearTimeout(timer)
    }, [duration])

    return isLoading
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        className="text-[#EADED0] text-4xl md:text-6xl lg:text-8xl m-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: Math.random() * 0.5 }}
    >
        {children}
    </motion.div>
)

export default function SplashScreen() {
    const navigate = useNavigate()
    const isLoading = useLoading(3000)
    const [showWelcome, setShowWelcome] = useState(false)
    const [exitAnimation, setExitAnimation] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (!isLoading) {
            timer = setTimeout(() => setShowWelcome(true), 500)
        }
        return () => clearTimeout(timer)
    }, [isLoading])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (showWelcome) {
            timer = setTimeout(() => {
                setExitAnimation(true)
            }, 3000)
        }
        return () => clearTimeout(timer)
    }, [showWelcome])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (exitAnimation) {
            timer = setTimeout(() => navigate('/pre-login-homepage'), 1000)
        }
        return () => clearTimeout(timer)
    }, [exitAnimation, navigate])

    return (
        <div className="min-h-screen bg-[#112c1d] text-[#EADED0] flex items-center justify-center overflow-hidden">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loading"
                        className="flex flex-wrap justify-center items-center mt-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <IconWrapper><GiCompass size={52} /></IconWrapper>
                        <IconWrapper><GiMountains size={52} /></IconWrapper>
                        <IconWrapper><MdTravelExplore size={52} /></IconWrapper>
                        <IconWrapper><TfiMapAlt size={52} /></IconWrapper>

                        <motion.h1
                            className="w-full text-center text-3xl md:text-4xl lg:text-5xl font-bold mt-8"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Adventurer
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl mt-4"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Your gateway to unforgettable journeys
                        </motion.p>
                    </motion.div>
                )}

                {showWelcome && (
                    <motion.div
                        key="welcome"
                        className="text-center mt-20"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl font-bold mb-4">Welcome to Adventurer</h1>
                        <p className="text-2xl mb-6">Explore. Dream. Discover.</p>
                        <Button
                            variant="outline"
                            className="bg-[#112c1d] text-[#EADED0] border-[#EADED0] hover:bg-[#EADED0] hover:text-[#112c1d]"
                            onClick={() => setExitAnimation(true)}
                        >
                            Start Your Journey
                        </Button>
                    </motion.div>
                )}

                {exitAnimation && (
                    <motion.div
                        key="exit"
                        className="absolute inset-0 bg-[#112c1d]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                )}

            </AnimatePresence>
            {/* <motion.div
                className="relative bottom-0 w-full flex justify-center "
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <img
                    src="/assets/BrandLogos/Adventurer/Adventurer_yellow.png"
                    alt="Adventurer Logo"
                    className="w-[50%] h-auto"
                />
            </motion.div> */}

        </div>
    )
}

