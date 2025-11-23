import React, { useState, useEffect } from 'react';

const Loadingscreen = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fulltext = 'Calendar';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fulltext.substring(0, i));
      i++;

      if (i > fulltext.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-gray-100 flex flex-col items-center justify-center">
      {/* EXACT PREVIOUS STYLING RESTORED */}
      <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold">
        {text}
        <span className="text-indigo-500 ml-1">X</span>
      </div>

      <div className="w-[160px] sm:w-[180px] md:w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] sm:shadow-[0_0_15px_#6366f1] animate-loading-bar"></div>
      </div>

      {/* Required for the bar to actually move */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Loadingscreen;
