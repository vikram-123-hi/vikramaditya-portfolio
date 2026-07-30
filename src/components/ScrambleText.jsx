import { useState, useEffect } from 'react';

const chars = '!@#$%^&*<>/?{}[]|~`0123456789';

const texts = [
  'vikramaditya',
  'विक्रमादित्य',
  'ବିକ୍ରମାଦିତ୍ୟ',
  '维克拉马迪蒂亚',
  'ヴィクラマーディティヤ',
  'Wikramaditja',
  'Vikramaditya',
  'فيكراماديتيا',
  'Викрамадитья',
  '비크라마디티아',
  'Βικραμαντίτια',
  'viKr4m@d1ty4',
  '01110110 01101001 01101011',
];

function glitchWord(word, intensity) {
  return word
    .split('')
    .map((ch) =>
      ch !== ' ' && Math.random() < intensity
        ? chars[Math.floor(Math.random() * chars.length)]
        : ch
    )
    .join('');
}

export default function ScrambleText() {
  const [display, setDisplay] = useState(texts[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % texts.length;
      const target = texts[nextIndex];
      let glitchCount = 0;

      const glitch = setInterval(() => {
        if (glitchCount < 4) {
          setDisplay(glitchWord(target, 0.4));
          glitchCount++;
        } else if (glitchCount < 6) {
          setDisplay(glitchWord(target, 0.2));
          glitchCount++;
        } else {
          setDisplay(target);
          setIndex(nextIndex);
          clearInterval(glitch);
        }
      }, 80);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return <span>{display}<span className="animate-pulse">_</span></span>;
}
