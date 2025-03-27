import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const GameCoverCarousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (games.length === 0) return null;

  const currentGame = games[currentIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <div className="relative w-full h-[40rem] overflow-hidden select-none">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

      {/* Game Cover Navigation */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img 
            src={currentGame.coverImage || currentGame.image || "/api/placeholder/1200/800"} 
            alt={currentGame.title} 
            className="w-full h-full object-cover brightness-75"
          />
        </motion.div>
      </AnimatePresence>

      {/* Game Details */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
        <motion.div
          key={`details-${currentIndex}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">Featured Game</span>
          </div>
          <h2 className="text-4xl font-bold mb-2">{currentGame.title}</h2>
          <p className="text-lg mb-4 max-w-xl">{currentGame.description}</p>
          <div className="flex space-x-4">
            <Link 
              to="/games"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute z-30 top-1/2 left-4 transform -translate-y-1/2">
        <button 
          onClick={handlePrev}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="absolute z-30 top-1/2 right-4 transform -translate-y-1/2">
        <button 
          onClick={handleNext}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameCoverCarousel;