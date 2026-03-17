import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const countRef = useRef(0);

  useEffect(() => {
    if (isVisible) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentCount = Math.min(Math.floor((progress / duration) * end), end);
        
        setCount(currentCount);

        if (progress < duration) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end); // Ensure we end exactly at the target
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default CountUp;
