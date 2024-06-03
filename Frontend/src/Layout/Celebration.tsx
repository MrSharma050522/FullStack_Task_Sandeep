import React from "react";
import Confetti from "react-confetti";

const Celebration: React.FC = () => {
  return <Confetti width={window.innerWidth} height={window.innerHeight} />;
};

export default Celebration;
