import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7b191c] rounded-full blur-[150px] mix-blend-normal"
      />
      <motion.div
        animate={{
          x: [0, -150, 0, 150, 0],
          y: [0, -100, 0, -50, 0],
          scale: [1, 0.8, 1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7b191c] rounded-full blur-[180px] mix-blend-normal"
      />
      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.3, 0.9, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7b191c] opacity-50 rounded-full blur-[200px] mix-blend-normal"
      />
    </div>
  );
}
