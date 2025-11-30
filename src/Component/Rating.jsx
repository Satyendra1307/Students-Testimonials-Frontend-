import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Rating({ userId, currentRating, editable = false }) {
  const [rating, setRating] = useState(currentRating || 0);

  const handleRating = (value) => {
    if (!editable) return; 
    setRating(value);
    
  };

  return (
    <div className="stars">
      {[1,2,3,4,5].map(num => (
        <FaStar
          key={num}
          size={25}
          onClick={() => handleRating(num)}
          color={rating >= num ? "gold" : "silver"}
          
        />
      ))}
    </div>
  );
}

export default Rating;
