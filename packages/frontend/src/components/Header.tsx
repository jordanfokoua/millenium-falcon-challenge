import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <div className="text-center space-y-6">
      <motion.img
        src="/assets/images/spaceship.png"
        alt="Millennium Falcon"
        className="w-24 h-24 mx-auto"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900">Millennium Falcon Challenge</h1>
    </div>
  );
};
