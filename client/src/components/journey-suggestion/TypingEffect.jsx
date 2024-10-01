import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text = '', speed = 50 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return; // Avoid processing if the text is null or undefined

    setCurrentIndex(0); // Reset the current index when text changes
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < text.length) {
        setCurrentIndex((prev) => prev + 1); // Move the index forward
        currentIdx++;
      } else {
        clearInterval(interval); // Clear the interval when the typing is complete
      }
    }, speed);

    return () => clearInterval(interval); // Clear the interval on unmount or text change
  }, [text, speed]);

  // Directly slice the text based on current index, no async concatenation
  const displayedText = text.slice(0, currentIndex);

  // Handle newlines and formatting
  const formattedText = displayedText
    .split('\n')
    .map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));

  return <p>{formattedText}</p>;
};

export default TypingEffect;
