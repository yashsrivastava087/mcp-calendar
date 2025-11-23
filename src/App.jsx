import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Loadingscreen from './components/Loading';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen bg-slate-950">
      
      {/* Show Loading Screen if NOT loaded */}
      {!isLoaded && (
        <Loadingscreen onComplete={() => setIsLoaded(true)} />
      )}

      {/* Show Calendar (which defaults to Login) ONLY after loading */}
      {isLoaded && (
        <div className="w-full h-full animate-in fade-in duration-700">
          <Calendar />
        </div>
      )}
      
    </div>
  );
};

export default App;
