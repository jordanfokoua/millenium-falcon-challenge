import { motion, useSpring, useTransform } from 'framer-motion';

import { useEffect } from 'react';

interface ResultDisplayProps {
  odds: number;
  onRestart: () => void;
}

const getColorForOdds = (odds: number) => {
  if (odds < 30) return 'text-red-600';
  if (odds < 70) return 'text-yellow-600';
  return 'text-green-600';
};

const getBgColorForOdds = (odds: number) => {
  if (odds < 30) return 'bg-red-50';
  if (odds < 70) return 'bg-yellow-50';
  return 'bg-green-50';
};

export const ResultDisplay = ({ odds, onRestart }: ResultDisplayProps) => {
  // Animation setup
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Transform the spring value to the actual odds percentage
  const animatedOdds = useTransform(spring, value => value.toFixed(2));

  // Update spring when odds change
  useEffect(() => {
    spring.set(odds);
  }, [odds, spring]);

  return (
    <motion.div 
      className={`mt-6 text-center p-6 rounded-xl ${getBgColorForOdds(odds)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-2">Success Probability</h3>
      <motion.div 
        className={`text-4xl font-bold ${getColorForOdds(odds)}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 1
        }}
      >
        <motion.span>{animatedOdds}</motion.span>%
      </motion.div>
      <div className="mt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getColorForOdds(odds).replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: `${odds}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      <p className="text-gray-600 mt-4">
        {odds < 30 
          ? "Low chance of success - The Empire's forces are strong"
          : odds < 70 
          ? "Moderate chance of success - The Force is with you"
          : "High chance of success - May the Force be with you"}
      </p>
      <div className="mt-6">
        <button
          onClick={onRestart}
          className="px-6 py-2 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
}; 