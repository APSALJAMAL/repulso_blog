import React, { useEffect } from 'react';
import BlogLogo from '../assets/images/Repulsow.png';

const SplashScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the splash screen after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {/* Outer div for gradient border */}
        <div className="relative inline-block rounded-full p-[6px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {/* Inner div for the image */}
          <div className="rounded-full overflow-hidden">
            <img
              src={BlogLogo}
              alt="App Logo"
              className="w-60 h-60 object-cover"
            />
          </div>
        </div>
        {/* Added text with flexbox */}
        <div className="mt-4 text-lg pt-28 font-semibold text-gray-700 flex flex-col items-center">
          <span>from</span>
          <span className="text-xl font-extrabold">REPULSO</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
