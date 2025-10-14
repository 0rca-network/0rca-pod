import { motion } from 'motion/react';

export function Starfield() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      
      {/* Animated gradient orbs - Luma style using Motion */}
      <div className="absolute inset-0">
        {/* Large mint gradient orb - top left */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99, 242, 210, 0.2) 0%, rgba(99, 242, 210, 0.08) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          initial={{ x: -200, y: -200 }}
          animate={{
            x: [-200, -150, -230, -200],
            y: [-200, -240, -170, -200],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Large mint gradient orb - bottom right */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '900px',
            height: '900px',
            background: 'radial-gradient(circle, rgba(99, 242, 210, 0.18) 0%, rgba(99, 242, 210, 0.06) 40%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          initial={{ bottom: -300, right: -300 }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Medium lime accent orb - center left */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(190, 242, 100, 0.12) 0%, rgba(190, 242, 100, 0.04) 50%, transparent 70%)',
            filter: 'blur(70px)',
            left: '20%',
            top: '30%',
          }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Smaller accent orb - top right */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99, 242, 210, 0.15) 0%, transparent 60%)',
            filter: 'blur(60px)',
            top: '15%',
            right: '10%',
          }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional center orb for depth */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(99, 242, 210, 0.1) 0%, transparent 65%)',
            filter: 'blur(65px)',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle static stars with twinkle */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() < 0.2 ? 3 : 2;
          const baseOpacity = Math.random() * 0.4 + 0.3;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: size === 3 ? '0 0 4px rgba(255, 255, 255, 0.5)' : 'none',
              }}
              animate={{
                opacity: [baseOpacity, baseOpacity * 0.3, baseOpacity],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
