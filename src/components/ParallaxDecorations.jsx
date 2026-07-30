import { motion, useScroll, useTransform } from 'framer-motion';

const elements = [
  { symbol: '{   }', size: 'text-5xl', top: '15%', left: '5%', speed: 0.3 },
  { symbol: '[   ]', size: 'text-4xl', top: '40%', right: '8%', speed: 0.5 },
  { symbol: '$  _', size: 'text-3xl', top: '65%', left: '10%', speed: 0.2 },
  { symbol: '/* */', size: 'text-2xl', top: '80%', right: '5%', speed: 0.4 },
  { symbol: '//', size: 'text-4xl', top: '25%', left: '80%', speed: 0.35 },
];

export default function ParallaxDecorations() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -el.speed * 400]);
        return (
          <motion.div
            key={i}
            style={{
              y,
              position: 'absolute',
              top: el.top,
              left: el.left,
              right: el.right,
              textShadow: '0 0 20px rgba(0,255,65,0.08)',
            }}
            className={`${el.size} font-mono text-terminal/15 select-none`}
          >
            {el.symbol}
          </motion.div>
        );
      })}
    </div>
  );
}
